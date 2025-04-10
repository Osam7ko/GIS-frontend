<script setup>
import { ref, defineEmits, watch } from "vue";
import axios from "axios";

const searchQuery = ref("");
const suggestions = ref([]); // Stores autocomplete suggestions
const emit = defineEmits(["locationFound"]);

const fetchSuggestions = async () => {
  if (searchQuery.value.length < 3) {
    suggestions.value = [];
    return;
  }

  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery.value}`
    );
    suggestions.value = response.data.map((place) => ({
      name: place.display_name,
      lat: place.lat,
      lon: place.lon,
    }));
  } catch (error) {
    console.error("Error fetching suggestions:", error);
  }
};

const selectLocation = (place) => {
  searchQuery.value = place.name;
  suggestions.value = []; // Hide suggestions after selection
  emit("locationFound", { lat: place.lat, lon: place.lon, name: place.name });
};

const searchLocation = async () => {
  if (!searchQuery.value) return;

  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=${searchQuery.value}`
    );

    if (response.data.length > 0) {
      const { lat, lon, display_name } = response.data[0];
      emit("locationFound", { lat, lon, name: display_name });
    } else {
      alert("No location found");
    }
  } catch (error) {
    console.error("Error fetching location:", error);
  }
};

// Call fetchSuggestions whenever searchQuery changes
watch( fetchSuggestions);
</script>

<template>
  <div class="search-container">
    <input
      type="text"
      v-model="searchQuery"
      placeholder="Search for a location..."
    />
    <button @click="searchLocation">Search</button>

    <!-- Autocomplete suggestions dropdown -->
    <ul v-if="suggestions.length" class="autocomplete-dropdown">
      <li v-for="place in suggestions" :key="place.name" @click="selectLocation(place)">
        {{ place.name }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
.search-container {
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: initial;
  gap: 10px;
  margin-left: 750px;
}

.search-container input {
  padding: 10px;
  font-size: 16px;
  width: 400px;
  background-color: white;
}

.search-container button {
  padding: 10px 15px;
  font-size: 16px;
  cursor: pointer;
  font-weight: 400;
  background-color: #475569;
}

.search-container button:hover {
  background-color: rgb(202, 202, 202);
}

/* Autocomplete dropdown */
.autocomplete-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  background: white;
  border: 1px solid #ccc;
  border-radius: 5px;
  max-height: 200px;
  overflow-y: auto;
  z-index: 1000;
  list-style: none;
  padding: 0;
  margin: 5px 0;
}

.autocomplete-dropdown li {
  padding: 10px;
  cursor: pointer;
}

.autocomplete-dropdown li:hover {
  background-color: black;
}
</style>
