<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <main class="content">
        <p>Ce projet est en cours de construction. Il sera développé de temps à autres sur la première moitié de 2024.</p>
        <RouterLink :to="{ name: 'guide' }">Commencer le guide</RouterLink>
    </main>
</template>

<style lang="scss" scoped>
@import "../assets/styles/modules/content.scss";

.l {
    &__soundGrid {
        // background: $background-inner;
        // padding: 1rem;
    }
}
</style>
