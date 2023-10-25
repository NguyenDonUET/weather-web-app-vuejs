<template>
  <div class="text-center pt-16 h-full">
    <h1 class="text-4xl text-cyan-600">{{ errorMsg }}</h1>
  </div>
</template>

<script setup>
defineProps({
  errorMsg: {
    type: String,
    required: true,
  },
});
</script>
