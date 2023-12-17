<script setup>
import { onUnmounted, ref } from 'vue'
import * as Tone from 'tone'
import Button from "@/components/ui/Button.vue"
import Tile from "@/components/ui/Tile.vue"
import SoundGrid from "@/components/ui/SoundGrid.vue"
import Actions from "@/components/layout/Actions.vue"
import GridItem from "@/components/layout/GridItem.vue"

const drums = new Tone.MembraneSynth().toDestination()

const divisions = 4
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
        <p>Voici encore notre battement. Il dure encore 1 seconde.</p>
        <p>Il sert de guide.</p>
        <p>En dessous du battement, il y a des tuiles. Cliquez sur une d'entre elles pour créer un rythme. Le rythme est joué chaque fois que le battement tombe dessus.</p>
        <Actions>
            <Button @click="isPlaying ? stop() : play()">{{ isPlaying ? "Stop" : "Play" }}</Button>
        </Actions>
        <SoundGrid :beat="beat" :divisions="divisions" :rows="2" class="content__breakout">
            <GridItem :span="1">
                <Tile id="1" :active="beat === 1" :on="soundGrid[1-1]" @change="toggleTile" />
            </GridItem>
            <GridItem :span="1">
                <Tile id="2" :active="beat === 2" :on="soundGrid[2-1]" @change="toggleTile" />
            </GridItem>
            <GridItem :span="1">
                <Tile id="3" :active="beat === 3" :on="soundGrid[3-1]" @change="toggleTile" />
            </GridItem>
            <GridItem :span="1">
                <Tile id="4" :active="beat === 4" :on="soundGrid[4-1]" @change="toggleTile" />
            </GridItem>
        </SoundGrid>
        <p>Chaque tuile représente un battement. On nomme la durée d'un battement une noire. Ici, une tuile vaut une noire.</p>
    </main>
</template>

<style lang="scss" scoped>
@import "../../assets/styles/basics/colors.scss";
@import "../../assets/styles/modules/content.scss";

.l {
    &__soundGrid {
        // background: $background-inner;
        // padding: 1rem;
    }
}
</style>
