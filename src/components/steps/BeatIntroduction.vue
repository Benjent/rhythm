<script setup>
import { onMounted, ref } from 'vue'
import Light from "@/components/ui/Light.vue"

const beat = ref(1)

const runTime = () => {
    if (beat.value === 4) {
        beat.value = 0
    }
    beat.value++
    setTimeout(runTime, 1000)
}

onMounted(() => {
    runTime()
})
</script>

<template>
    <div class="beatIntroduction">
        <p>Voici un battement.</p>
        <div style="display: flex; gap: 20px;">
            <Light :on="beat === 1" />
            <Light :on="beat === 2" />
            <Light :on="beat === 3" />
            <Light :on="beat === 4" />
        </div>
        <p>Sur une grille de 4 emplacements, on peut le voir se déplacer.</p>
        <p>Il se déplace une seconde à la fois, du 1er au 4ème emplacement.</p>
        <p>Lorsqu'il arrive au 4ème emplacement, il revient au 1er.</p>
    </div>
</template>

<style scoped>
</style>
