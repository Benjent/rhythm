<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
    <main class="content">
        <p>Ce projet est en cours de construction. Il sera développé de temps à autre sur la première moitié de 2024.</p>
        <RouterLink :to="{ name: 'guide' }" class="link">Commencer le guide</RouterLink>
    </main>
</template>

<style lang="scss" scoped>
@import "../assets/styles/basics/colors.scss";
@import "../assets/styles/modules/content.scss";
@import "../assets/styles/modules/link.scss";
</style>
