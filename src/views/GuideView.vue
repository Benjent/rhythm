<script setup>
import { ref } from "vue"
import { useRoute, useRouter } from 'vue-router'
import Actions from '@/components/layout/Actions.vue'
import Button from '@/components/ui/Button.vue'
import BeatIntroduction from '@/components/steps/BeatIntroduction.vue'
import DivisionIntroduction from '@/components/steps/DivisionIntroduction.vue'
import SoundGridIntroduction from '@/components/steps/SoundGridIntroduction.vue'

const route = useRoute()
const router = useRouter()
const step = ref(+route.query.step || 0)

const steps = [BeatIntroduction, DivisionIntroduction, SoundGridIntroduction]

const goToStep = (index) => {
    router.push({ to: "guide", query: { step: index } })
}

const goToNextStep = () => {
    if (step.value + 1 >= steps.length) return
    step.value++

    goToStep(step.value)
}

const goToPreviousStep = () => {
    if (step.value - 1 < 0) return
    step.value--

    goToStep(step.value)
}
</script>

<template>
    <component :is="steps[step]" />
    <Actions>
        <Button color="ghost" @click="goToPreviousStep">Précédent</Button>
        <Button @click="goToNextStep">Suivant</Button>
    </Actions>
</template>
