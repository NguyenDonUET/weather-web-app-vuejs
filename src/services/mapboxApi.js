import axios from "axios";
export const mapboxApi = axios.create({
  baseURL: "https://api.mapbox.com/geocoding/v5",
  headers: {
    Accept: "application/json",
  },
});

export const getLocaltionsByName = async (searchQuery) => {
  const res = await mapboxApi.get(
    `/mapbox.places/${searchQuery}.json?access_token=${
      import.meta.env.VITE_API_KEY
    }`
  );
  return res.data.features;
};
