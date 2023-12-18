<script setup>
import { onUnmounted, ref } from 'vue'
import Button from "@/components/ui/Button.vue"
import Actions from "@/components/layout/Actions.vue"
import Light from "@/components/ui/Light.vue"
import SoundGrid from "@/components/ui/SoundGrid.vue"

const divisions = 4
const beatDuration = 1000 * (4 / divisions) // TODO this is another name for bpm somehow
const beat = ref(0)
const isPlaying = ref(false)

const runTime = () => {
    if (!isPlaying.value) return
    if (beat.value === divisions) {
        beat.value = 0
    }
    beat.value++
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

onUnmounted(() => stop())
</script>

<template>
    <main class="content l">
        <p>Voici un battement. Cliquez sur "Play" pour le lancer et "Stop" pour l'arrêter.</p>
        <Actions>
            <Button @click="isPlaying ? stop() : play()">{{ isPlaying ? "Stop" : "Play" }}</Button>
        </Actions>
        <section class="content__breakout l__soundGrid">
            <SoundGrid :beat="beat" :divisions="divisions" />
        </section>
        <p>
            Sur une grille de 4 emplacements, on peut le voir se déplacer.
            <br />
            Pour le moment, le battement est réglé sur 1 seconde. Il se déplace donc d'1 seconde à la fois, du 1er au 4ème emplacement.
            <br />
            Lorsqu'il arrive au 4ème emplacement, il revient au 1er et forme donc une boucle de 4 secondes.
        </p>
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
