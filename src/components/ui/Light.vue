<script setup>
const props = defineProps({
    on: {
        type: Boolean,
        default: false,
    },
})
</script>

<template>
    <div class="light" :class="{'light--on': on }" />
</template>

<style lang="scss" scoped>
.light {
    height: 20px;
    width: 20px;
    border-radius: 50%;
    background: #361010;

    &--on {
        background: radial-gradient(closest-side, #ffa6c8, #9b0450, #830d7d);
    }
}
</style>
