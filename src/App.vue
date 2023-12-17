<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
    <header class="content">
        <nav class="content__fullWidth">
            <RouterLink to="/">Accueil</RouterLink>
            <RouterLink to="/guide">Guide</RouterLink>
            <RouterLink to="/beat-introduction">Beat intro</RouterLink>
            <RouterLink to="/notation">Notation</RouterLink>
            <RouterLink to="/time-signature">Signature rythmique</RouterLink>
        </nav>
    </header>

    <RouterView />
</template>

<style lang="scss" scoped>
@import "./assets/styles/modules/content.scss";

</style>
