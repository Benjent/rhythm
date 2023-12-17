<script setup>
import { ref } from 'vue'
import * as Tone from 'tone'
import Actions from "@/components/layout/Actions.vue"
import GridItem from "@/components/layout/GridItem.vue"
import Button from "@/components/ui/Button.vue"
import Light from "@/components/ui/Light.vue"
import SoundGrid from "@/components/ui/SoundGrid.vue"
import Tile from "@/components/ui/Tile.vue"

const drums = new Tone.MembraneSynth().toDestination()

const beat = ref(0)
const isPlaying = ref(false)

// TODO ugly code, we cant run infinite setTimeouts and runTime method should not be responsible for the isPlaying check
const soundGrid = ref([false, false, false, false])

const hitKick = () => {
    drums.triggerAttackRelease("C1", 1000)
}

const runTime = () => {
    if (!isPlaying.value) return
    if (beat.value === 64) {
        beat.value = 0
    }
    beat.value++

    if (soundGrid.value[beat.value - 1]) {
        hitKick()
    }
    setTimeout(runTime, 50)
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
</script>

<template>
    <div class="divisionIntroduction">
        <p>Allons un peu plus loin.</p>
        <Actions>
            <Button @click="isPlaying ? stop() : play()">{{ isPlaying ? "Stop" : "Play" }}</Button>
        </Actions>
        <SoundGrid :beat="beat" :divisions="64">
            <GridItem v-for="(value) in 64" :key="`light_${value}`" :span="1">
                <Light :on="beat === value" />
            </GridItem>
            <GridItem v-for="(value, index) in 64" :key="value" :span="1">
                <Tile :id="value" :active="beat === value" :on="soundGrid[index]" @change="toggleTile" />
            </GridItem>
        </SoundGrid>
    </div>
</template>

<style lang="scss" scoped>
.soundGridIntroduction {

}
</style>
