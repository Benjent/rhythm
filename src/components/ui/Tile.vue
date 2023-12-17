<script setup>
import { ref, watch  } from 'vue';

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
    on: {
        type: Boolean,
        default: false,
    },
    active: {
        type: Boolean,
        default: false,
    },
})

const emit = defineEmits({
    change: {
        type: "change",
        default: () => {},
    },
})

const checked = ref(false)

watch(checked, (newChecked) => {
    emit("change", { checked: newChecked, id: props.id })
})
</script>

<template>
    <label class="tile" :class="{'tile--on': checked, 'tile--active': active }">
        <input class="tile__input" type="checkbox" v-model="checked" />
    </label>
</template>

<style lang="scss" scoped>
.tile {
    height: 100px;
    width: 100px;
    border-radius: 3px;
    background: #393243;
    cursor: pointer;

    &--on {
        background: #aa98b4;
    }

    &--on#{&}--active {
        box-shadow: 0 0 20px 4px rgba(255,255,255,0.8);
        background: #efebf1;
    }

    &__input {
        display: none;
    }
}
</style>
