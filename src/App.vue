<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
    <header class="content app__header">
        <nav class="content__fullWidth l__nav">
            <RouterLink class="link l__nav__logo" to="/">Rhythm</RouterLink>
            <RouterLink class="link" to="/guide">Guide</RouterLink>
            <RouterLink class="link" to="/beat-introduction">Beat intro</RouterLink>
            <RouterLink class="link" to="/notation">Notation</RouterLink>
            <RouterLink class="link" to="/time-signature">Signature rythmique</RouterLink>
        </nav>
    </header>

    <section class="app__body">
        <RouterView />
    </section>
</template>

<style lang="scss">
@import "./assets/styles/basics/reset.scss";
@import "./assets/styles/basics/fonts.scss";
@import "./assets/styles/basics/colors.scss";
@import "./assets/styles/modules/app.scss";
@import "./assets/styles/modules/content.scss";
@import "./assets/styles/modules/link.scss";

body {
    min-height: 100vh;
    font-family: Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
    font-family: $mainFont;
    font-size: 26px;
    background: $background;
    color: white;
}

.l__nav {
    display: flex;
    gap: 2rem;
    font-size: 1.2rem;

    &__logo {
        font-family: $logoFont;
    }
}

</style>
