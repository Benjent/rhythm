<script setup>
import { onMounted, ref } from "vue"
import Vex from "vexflow"
import { getDurationFromValue } from "@/utils/vex-flow"

const props = defineProps({
    value: Number,
})

const canvas = ref(null)

const renderNote = () => {
    const { Formatter, Renderer, Stave, StaveNote, Voice } = Vex.Flow

    const renderer = new Renderer(canvas.value, Renderer.Backends.SVG)
    renderer.resize(51, 80)

    const context = renderer.getContext()

    const stave = new Stave(0, -10, 50)
    stave.setContext(context).draw()

    const notes = [
        new StaveNote({ keys: ["G/4"], duration: getDurationFromValue(props.value) }),
    ]

    const voice = new Voice({ num_beats: 1, beat_value: props.value })
    voice.addTickables(notes)

    new Formatter().joinVoices([voice]).format([voice], 0)

    voice.draw(context, stave)
}


onMounted(() => {
    renderNote()
})
</script>

<template>
    <div ref="canvas" />
</template>

<style scoped>
</style>
