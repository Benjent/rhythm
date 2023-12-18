<script setup>
import { onUnmounted, ref } from 'vue'
import * as Tone from 'tone'
import Actions from "@/components/layout/Actions.vue"
import GridItem from "@/components/layout/GridItem.vue"
import Button from "@/components/ui/Button.vue"
import Light from "@/components/ui/Light.vue"
import SoundGrid from "@/components/ui/SoundGrid.vue"
import Tile from "@/components/ui/Tile.vue"

const drums = new Tone.MembraneSynth().toDestination()

const divisions = 16
const beatDuration = 1000 * (4 / divisions) // TODO this is another name for bpm somehow
const beat = ref(0)
const isPlaying = ref(false)

// TODO ugly code, we cant run infinite setTimeouts and runTime method should not be responsible for the isPlaying check
const soundGrid = ref([false, false, false, false])

const hitKick = () => {
    drums.triggerAttackRelease("C1", beatDuration)
}

const runTime = () => {
    if (!isPlaying.value) return
    if (beat.value === divisions) {
        beat.value = 0
    }
    beat.value++

    if (soundGrid.value[beat.value - 1]) {
        hitKick()
    }
    setTimeout(runTime, beatDuration)
}

const play = () => {
    isPlaying.value = true
    runTime()
}

const stop = () => {
    isPlaying.value = false
    beat.value = 0
}

const toggleTile = ({ checked, id }) => {
    const index = Number.parseInt(id, 10) - 1
    soundGrid.value[index] = checked
}

onUnmounted(() => stop())
</script>

<template>
    <main class="content">
        <p>Voici toujours notre battement, cette fois-ci divisé par groupes de 4. Il dure toujours 1 seconde et chaque division dure 0.25 secondes.</p>
        <Actions>
            <Button @click="isPlaying ? stop() : play()">{{ isPlaying ? "Stop" : "Play" }}</Button>
        </Actions>
        <SoundGrid :beat="beat" :divisions="divisions" :rows="2" class="content__breakout">
            <GridItem v-for="(value, index) in divisions" :key="value" :span="1">
                <Tile :id="value" :active="beat === value" :on="soundGrid[index]" @change="toggleTile" />
            </GridItem>
        </SoundGrid>
        <p>
            Ici, chaque tuile représente le quart d'un battement. On nomme la durée de ce quart une double croche. Ici, une tuile vaut une double croche.
            <br />
            Deux tuiles valent donc deux double croches, qui valent au total une croche.
            <br />
            Quatre tuiles valent donc deux croches, qui valent au total une noire.
        </p>
    </main>
</template>

<style lang="scss" scoped>
@import "../../assets/styles/modules/content.scss";
</style>
