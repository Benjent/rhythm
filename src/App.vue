<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
    <header>
        <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

        <div class="wrapper">
        <nav>
            <RouterLink to="/">Accueil</RouterLink>
            <RouterLink to="/notation">Notation</RouterLink>
            <RouterLink to="/time-signature">Signature rythmique</RouterLink>
        </nav>
        </div>
    </header>

  <RouterView />
</template>

<style scoped>

</style>
