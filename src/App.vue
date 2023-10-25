<template>
  <div class="flex flex-col font-Roboto bg-weather-primary">
    <navigation></navigation>
    <main class="container min-h-screen pb-12">
      <router-view></router-view>
    </main>
    <Footer />
  </div>
</template>

<script setup>
import Navigation from "./components/Navigation.vue";
import Footer from "./components/Footer.vue";
</script>
