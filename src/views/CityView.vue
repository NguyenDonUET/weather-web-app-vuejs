<template>
  <Suspense>
    <AsyncCityView #default></AsyncCityView>
    <template #fallback>
      <ShowError v-if="errorMsg" :error-msg="errorMsg" />
      <Loading v-else />
    </template>
  </Suspense>
</template>

<script setup>
import { ref, onErrorCaptured } from "vue";
import AsyncCityView from "../components/AsyncCityView.vue";
import Loading from "../components/Loading.vue";
import ShowError from "../components/ShowError.vue";

const errorMsg = ref(null);
onErrorCaptured((err, instance, info) => {
  console.log("🚀 ~ err:", err.message);
  errorMsg.value = "Sorry, something went wrong";
});
</script>
