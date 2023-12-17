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
.button {
    border-radius: 5px;
    padding: 12px 16px;
    border-width: 2px;
    cursor: pointer;
    
    &--primary {
        color: white;
        background: #830d7d;
        border-color: #830d7d;

        
        &:hover {
            background: #9b0450;
            border-color: #9b0450;
        }
    }

    &--ghost {
        color: #830d7d;
        background: transparent;
        border-color: transparent;

        &:hover {
            background: rgba(255,255,255,0.2);
            border-color: rgba(255,255,255,0.2);
        }
    }
}
</style>
