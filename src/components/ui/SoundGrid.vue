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
            <Light :on="beat > 0 && beat <= lightSpan * 1" />
        </GridItem>
        <GridItem :span="lightSpan">
            <Light :on="beat > lightSpan * 1 && beat <= lightSpan * 2" />
        </GridItem>
        <GridItem :span="lightSpan">
            <Light :on="beat > lightSpan * 2 && beat <= lightSpan * 3" />
        </GridItem>
        <GridItem :span="lightSpan">
            <Light :on="beat > lightSpan * 3 && beat <= lightSpan * 4" />
        </GridItem>
        <slot />
    </div>
</template>

<style lang="scss">
.soundGrid {
    display: grid;
    grid-template-columns: repeat(64, 1fr);
    grid-template-rows: repeat(3, 1fr);
    gap: 8px;
    justify-content: center;
    align-items: center;
}
</style>
