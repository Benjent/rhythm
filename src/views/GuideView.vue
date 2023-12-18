<script setup>
import { ref } from "vue"
import { useRoute, useRouter } from 'vue-router'
import Actions from '@/components/layout/Actions.vue'
import Button from '@/components/ui/Button.vue'
import BeatIntroduction from '@/components/steps/BeatIntroduction.vue'
import DivisionIntroduction from '@/components/steps/DivisionIntroduction.vue'
import QuaverIntroduction from '@/components/steps/QuaverIntroduction.vue'
import SemiQuaverIntroduction from '@/components/steps/SemiQuaverIntroduction.vue'
import SoundGridIntroduction from '@/components/steps/SoundGridIntroduction.vue'

const route = useRoute()
const router = useRouter()
const step = ref(+route.query.step || 0)

const steps = [
    BeatIntroduction,
    DivisionIntroduction,
    QuaverIntroduction,
    SemiQuaverIntroduction,
    SoundGridIntroduction,
]

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
    <div class="journey">
        <component :is="steps[step]" class="journey__step" />
        <Actions class="journey__footer">
            <Button color="ghost" @click="goToPreviousStep">Précédent</Button>
            <Button @click="goToNextStep">Suivant</Button>
        </Actions>
    </div>
</template>


<style lang="scss" scoped>
@import "../assets/styles/modules/journey.scss";
</style>
