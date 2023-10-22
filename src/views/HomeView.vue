<script setup>
import { ref } from "vue";
import { getLocaltionsByName } from "../services/mapboxApi";

const searchQuery = ref("");
const queryTimeout = ref(null);
const searchResults = ref(null);

const DELAY_SEARCH_TIME = 400;

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);

  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value === "") {
      searchResults.value = null;
      return;
    }
    const data = await getLocaltionsByName(searchQuery.value);
    searchResults.value = data;
    return;
  }, 400);
};
</script>

<template>
  <main class="container text-white pt-6">
    <div class="pt-4 mb-8 relative">
      <input
        autofocus
        @input="getSearchResults"
        v-model="searchQuery"
        type="text"
        placeholder="Search for a city or state"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
      />
      <ul
        v-if="searchResults"
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
      >
        <li
          v-for="searchResult in searchResults"
          :key="searchResult.id"
          class="py-2 cursor-pointer"
        >
          {{ searchResult.place_name }}
        </li>
      </ul>
    </div>
  </main>
</template>
