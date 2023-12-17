<script setup>
import { ref } from 'vue'
import * as Tone from 'tone'
import GridItem from "@/components/layout/GridItem.vue"
import Button from "@/components/ui/Button.vue"
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
    if (beat.value === 4) {
        beat.value = 0
    }
    beat.value++

    if (soundGrid.value[beat.value - 1]) {
        hitKick()
    }
    setTimeout(runTime, 1000)
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
        <Button @click="isPlaying ? stop() : play()">{{ isPlaying ? "Stop" : "Play" }}</Button>
        <p>Allons un peu plus loin.</p>
        <SoundGrid :beat="beat">
            <GridItem :span="16">
                <Tile id="1" :active="beat === 1" :on="soundGrid[1-1]" @change="toggleTile" />
            </GridItem>
            <GridItem :span="16">
                <Tile id="2" :active="beat === 2" :on="soundGrid[2-1]" @change="toggleTile" />
            </GridItem>
            <GridItem :span="16">
                <Tile id="3" :active="beat === 3" :on="soundGrid[3-1]" @change="toggleTile" />
            </GridItem>
            <GridItem :span="16">
                <Tile id="4" :active="beat === 4" :on="soundGrid[4-1]" @change="toggleTile" />
            </GridItem>
        </SoundGrid>
    </div>
</template>

<style lang="scss" scoped>
.soundGridIntroduction {

}
</style>
