<script setup>
// TODO rename SoundGridItem and use a beat value (like blanche, ronde), not a number
const props = defineProps({
    span: {
        type: Number,
        default: 1,
    },
})
</script>

<template>
    <div class="soundGridItem" :style="`grid-column: span ${span};`">
        <slot />
    </div>
</template>

<style lang="scss" scoped>
.soundGridItem {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
}
</style>
