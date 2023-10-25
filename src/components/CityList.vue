<template>
  <div v-for="city in savedCities" :key="city.id">
    <CityCard :city="city" @click="goToCityView(city)" />
  </div>

  <p v-if="savedCities.length === 0">
    No locations added. To start tracking a location, search in the field above.
  </p>
</template>

<script setup>
import { ref } from "vue";
import { getWeatherData } from "../services/openWeatherApi";
import CityCard from "../components/CityCard.vue";
import { useRouter } from "vue-router";

const router = useRouter();
const goToCityView = (city) => {
  router.push({
    name: "CityView",
    params: { city: city.city },
    query: { id: city.id, lat: city.coords.lat, lng: city.coords.lng },
  });
};

const savedCities = ref([]);

const getCities = async () => {
  if (!localStorage.getItem(import.meta.env.VITE_LOCAL_CITIES_KEY)) return;

  savedCities.value = JSON.parse(
    localStorage.getItem(import.meta.env.VITE_LOCAL_CITIES_KEY)
  );
  let requests = [];
  savedCities.value.forEach((city) => {
    requests.push(getWeatherData(city.coords.lat, city.coords.lng));
  });
  const weatherData = await Promise.all(requests);
  weatherData.forEach((value, index) => {
    // them thuoc tinh weather vao tung element
    savedCities.value[index].weather = value;
  });
  //   console.log("🚀 ~ savedCities:", savedCities.value);
};

await getCities();
</script>

<style lang="scss" scoped></style>
