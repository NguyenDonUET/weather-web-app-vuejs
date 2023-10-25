<template>
  <main class="text-white pt-6">
    <div class="pt-4 mb-8 relative">
      <input
        :disabled="isLoading"
        @keydown="handleKeyDown"
        autofocus
        @input="getSearchResults"
        v-model="searchQuery"
        type="search"
        placeholder="Search for a city or state"
        class="py-2 px-1 w-full bg-transparent border-b focus:border-weather-secondary focus:outline-none focus:shadow-[0px_1px_0_0_#004E71]"
      />
      <p v-if="searchError">Sorry, something went wrong, please try again.</p>

      <p v-else-if="searchResults && searchResults.length === 0">
        No results match your query, try a different term.
      </p>
      <ul
        v-else-if="searchResults"
        class="absolute bg-weather-secondary text-white w-full shadow-md py-2 px-1 top-[66px]"
      >
        <li
          v-for="(searchResult, index) in searchResults"
          :key="searchResult.id"
          class="py-2 cursor-pointer p-2 hover:bg-weather-primary"
          :class="{ active: index === selectedItemIndex }"
          @click="previewCity(searchResult)"
        >
          {{ searchResult.place_name }}
        </li>
      </ul>
    </div>
    <div class="flex flex-col gap-4">
      <Suspense @pending="pending" @resolve="resolve">
        <CityList #default></CityList>
        <template #fallback>
          <ShowError v-if="errorMsg" :error-msg="errorMsg" />
          <Loading v-else />
        </template>
      </Suspense>
    </div>
  </main>
</template>
<script setup>
import { onErrorCaptured, ref } from "vue";
import { getLocaltionsByName } from "../services/mapboxApi";
import { useRouter } from "vue-router";
import CityList from "../components/CityList.vue";
import Loading from "../components/Loading.vue";
import ShowError from "../components/ShowError.vue";

const router = useRouter();
const searchQuery = ref("");
const queryTimeout = ref(null);
const searchResults = ref(null);
const searchError = ref(false);

const DELAY_SEARCH_TIME = 200;

const getSearchResults = () => {
  clearTimeout(queryTimeout.value);
  selectedItemIndex.value = -1;
  queryTimeout.value = setTimeout(async () => {
    if (searchQuery.value === "") {
      searchResults.value = null;
      return;
    }
    try {
      const data = await getLocaltionsByName(searchQuery.value);
      searchResults.value = data;
      searchError.value = false;
    } catch (error) {
      searchError.value = true;
      console.log(error.message);
    }
  }, DELAY_SEARCH_TIME);
};

const previewCity = (searchResult) => {
  const [city] = searchResult.place_name.split(",");
  router.push({
    name: "CityView",
    params: { city: city },
    query: {
      lat: searchResult.geometry.coordinates[1],
      lng: searchResult.geometry.coordinates[0],
      preview: true,
    },
  });
};
const errorMsg = ref(null);
onErrorCaptured((err) => {
  errorMsg.value = "Sorry, something went wrong";
  console.log(err.message);
});

const isLoading = ref(true);

const pending = () => {
  isLoading.value = false;
};
const resolve = () => {
  isLoading.value = false;
};

const selectedItemIndex = ref(-1);

const handleKeyDown = (e) => {
  if (
    e.key === "ArrowDown" &&
    selectedItemIndex.value < searchResults.value.length - 1
  ) {
    selectedItemIndex.value = selectedItemIndex.value + 1;
  } else if (e.key === "ArrowUp" && selectedItemIndex.value > 0) {
    selectedItemIndex.value = selectedItemIndex.value - 1;
  } else if (e.key === "Enter" && selectedItemIndex.value >= 0) {
    previewCity(searchResults.value[selectedItemIndex.value]);
  }
};
</script>
