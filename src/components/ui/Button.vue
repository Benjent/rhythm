<script setup>
const props = defineProps({
    color: {
        type: String,
        default: "primary",
    },
})
</script>

<template>
    <button class="button" :class="{ [`button--${color}`]: color }">
        <slot />
    </button>
</template>

<style lang="scss" scoped>
@import "@/assets/styles/basics/colors.scss";
@import "@/assets/styles/basics/fonts.scss";

.button {
    border-radius: 5px;
    padding: 12px 16px;
    border-width: 2px;
    cursor: pointer;
    transition: all .2s;
    font-family: $logoFont;
    font-size: 2rem;
    
    &--primary {
        color: white;
        background: $primary;
        border-color: $primary;

        
        &:hover {
            background: $primaryLight;
            border-color: $primaryLight;
        }
    }

    &--ghost {
        color: $primary;
        background: transparent;
        border-color: transparent;

        &:hover {
            background: rgba(255,255,255,0.2);
            border-color: rgba(255,255,255,0.2);
        }
    }
}
</style>
