<script setup>
import { onUnmounted, ref } from 'vue'
import * as Tone from 'tone'
import Button from "@/components/ui/Button.vue"
import Light from "@/components/ui/Light.vue"
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

onUnmounted(() => stop())
</script>

<template>
    <div class="divisionIntroduction">
        <Button @click="isPlaying ? stop() : play()">{{ isPlaying ? "Stop" : "Play" }}</Button>
        <p>Voici encore notre battement.</p>
        <p>Il sert de guide.</p>
        <p>En dessous du battement, il y a des tuiles. Cliquez sur une d'entre elles pour créer un rythme. Le rythme est joué chaque fois que le battement tombe dessus.</p>
        <div class="trackpad">
            <Light :on="beat === 1" />
            <Light :on="beat === 2" />
            <Light :on="beat === 3" />
            <Light :on="beat === 4" />
            <Tile id="1" :active="beat === 1" :on="soundGrid[1-1]" @change="toggleTile" />
            <Tile id="2" :active="beat === 2" :on="soundGrid[2-1]" @change="toggleTile" />
            <Tile id="3" :active="beat === 3" :on="soundGrid[3-1]" @change="toggleTile" />
            <Tile id="4" :active="beat === 4" :on="soundGrid[4-1]" @change="toggleTile" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.divisionIntroduction {
    & .trackpad {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 20px;
        justify-content: center;
        align-items: center;

        .tile, .light {
            align-self: center;
            justify-self: center;
        }
    }

}
</style>
