<script setup>
import Light from "@/components/ui/Light.vue"
import GridItem from "@/components/layout/GridItem.vue"
import { computed } from "vue";

const props = defineProps({
    divisions: {
        type: Number,
        default: 64,
    },
    beat: {
        type: Number,
        required: true,
    },
})

// TODO below should be a utils
const lightSpan = computed(() => {
    return Math.ceil(props.divisions / 4)
})
</script>

<template>
    <div class="soundGrid" :style="`grid-template-columns: repeat(${divisions}, 1fr)`">
        <GridItem :span="lightSpan">
            <Light :on="beat === 1" />
        </GridItem>
        <GridItem :span="lightSpan">
            <Light :on="beat === 2" />
        </GridItem>
        <GridItem :span="lightSpan">
            <Light :on="beat === 3" />
        </GridItem>
        <GridItem :span="lightSpan">
            <Light :on="beat === 4" />
        </GridItem>
        <slot />
    </div>
</template>

<style lang="scss">
.soundGrid {
    display: grid;
    grid-template-columns: repeat(64, 1fr);
    grid-auto-rows: minmax(30px, auto);
    gap: 20px;
    justify-content: center;
    align-items: center;
}
</style>
