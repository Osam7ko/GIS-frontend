<template>
  <div class="route-container">
    <div class="input-group">
      <input type="text" v-model="startLocation" placeholder="start point" @input="fetchStartSuggestions" />
      <ul v-if="startSuggestions.length" class="autocomplete-dropdown">
        <li v-for="place in startSuggestions" :key="place.name" @click="selectStartLocation(place)">
          {{ place.name }}
        </li>
      </ul>
    </div>

    <div class="input-group">
      <input type="text" v-model="endLocation" placeholder="end point" />
      <ul v-if="endSuggestions.length" class="autocomplete-dropdown">
        <li v-for="place in endSuggestions" :key="place.name" @click="selectEndLocation(place)">
          {{ place.name }}
        </li>
      </ul>
    </div>

    <button @click="findRoute">Find a road</button>
  </div>
</template>

<script setup>
import { ref, defineEmits, watch } from "vue";
import axiosServer from "@/services/axiosServer.js";

const startLocation = ref("");
const endLocation = ref("");
const startSuggestions = ref([]);
const endSuggestions = ref([]);
const emit = defineEmits(["routeSelected"]);
const queryTimeout = ref(null);

const fetchStartSuggestions = async () => {
  if (startLocation.value.length < 3) {
    startSuggestions.value = [];
    return;
  }

  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    try {
      const response = await axiosServer.get(`/nominatim/${startLocation.value}`);
      startSuggestions.value = response.data.features.map((place) => ({
        name: place.text,
        lat: place.geometry.coordinates[1],
        lon: place.geometry.coordinates[0],
      }));
    } catch (error) {
      console.error("Error fetching start location suggestions:", error);
    }
  }, 750);
};

const fetchEndSuggestions = async () => {
  if (endLocation.value.length < 3) {
    endSuggestions.value = [];
    return;
  }

  clearTimeout(queryTimeout.value);
  queryTimeout.value = setTimeout(async () => {
    try {
      const response = await axiosServer.get(`/nominatim/${endLocation.value}`);
      endSuggestions.value = response.data.features.map((place) => ({
        name: place.text,
        lat: place.geometry.coordinates[1],
        lon: place.geometry.coordinates[0],
      }));
    } catch (error) {
      console.error("Error fetching end location suggestions:", error);
    }
  }, 750);
};

const selectStartLocation = (place) => {
  startLocation.value = place.name;
  startSuggestions.value = [];
};

const selectEndLocation = (place) => {
  endLocation.value = place.name;
  endSuggestions.value = [];
};

const findRoute = () => {
  if (!startLocation.value || !endLocation.value) return;
  emit("routeSelected", {
    start: startLocation.value,
    end: endLocation.value,
  });
};

watch(startLocation, fetchStartSuggestions);
watch(endLocation, fetchEndSuggestions);
</script>

<style scoped>
.input-group {
  position: relative;
  width: 220px;
  width: 100%;
  height: 100%;
}
.input-group input {
  background-color: white;
  font-size: 14px;
  padding-left: 10px;
}

.route-container {
  margin-top: 10px;
  position: relative;
  display: flex;
  gap: 10px;
  justify-content: center;
  margin-bottom: 10px;
  z-index: 999;
  max-width: 800px;
  max-height: 300px;
}
.route-container button {
  background-color: #475569;
  color: white;
  width: 45%;
}

.autocomplete-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: rgb(255, 255, 255);
  border: 1px solid #ccc;
  border-radius: 6px;
  max-height: 180px;
  overflow-y: auto;
  z-index: 1000;
  list-style: none;
  padding: 0;
  margin-top: 5px;
}

.autocomplete-dropdown li {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #eee;
}

.autocomplete-dropdown li:hover {
  background-color: #007bff;
  color: white;
}
@media (max-width: 768px) {
  .route-container{
    margin-top: 10px;
    position: absolute;
    display: flex;
    margin-left: 600px;
    gap: 10px;
    justify-content: center;
    margin-bottom: 10px;
    z-index: 999;
  }
}
</style>
