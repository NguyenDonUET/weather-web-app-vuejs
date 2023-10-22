<template>
  <div class="flex flex-col min-h-screen font-Roboto bg-weather-primary">
    <navigation></navigation>
    <router-view></router-view>
  </div>
</template>

<script setup>
import Navigation from "./components/Navigation.vue";
</script>

<style lang="scss" scoped></style>
