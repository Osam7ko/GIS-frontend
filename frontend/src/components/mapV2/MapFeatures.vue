<template>
    <div>
        <!-- Source Switcher -->
        <div class="source-switch">
          <label>
            <input type="radio" value="mapbox" v-model="searchSource" /> Mapbox
          </label>
          <label>
            <input type="radio" value="nominatim" v-model="searchSource" /> Nominatim
          </label>
        </div>
        <div class="search-area">
            <!-- Search Box -->
            <div class="search-wrapper">
                <i class="fas fa-search search-icon"></i>
                <input type="text" placeholder="Start your search" 
                class="search-input" 
                v-model="searchQuery"
                @input="search"
                @focus="$emit('toggleSearchResults')"
                />
            </div>

            <!-- Search Result -->
            <div >
                <div class="search-results" 
                v-if="searchQuery && searchData?.length && searchResults">
                    <!-- Spinner -->
                    <loadingSpinner v-if="!searchData"/>
                    <div v-else>
                        <div class="search-result-item" 
                            v-for="(result, index) in searchData"
                            :key="index"
                            @click="selectResult(result)"
                            >
                            <i class="fas fa-map-marker-alt search-icon-result"></i>
                            <div class="search-text">
                                <p class="name">{{ truncate(result.properties?.name_preferred || result.text || result.name)}}</p>
                                <p class="address">{{ result.properties?.place_formatted || result.place_name || result.text }}</p>
                            </div>
                            <p>{{ result.name }}</p>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
        <!-- Geo Location Floating Button -->
        <div
            class="geo-button-floating"
            @click="$emit('getGeoLocation')"
            :class="{ 'geo-button-active': coords }"
        >
            <i
            class="fas fa-location-arrow geo-icon"
            :class="{ 'geo-icon-active': coords, 'geo-icon-pulse': fetchCoords }"
            ></i>
        </div>

        <!-- Save Favorite Button -->
        <div v-if="searchQuery && selectedResult ">
          <div class="save-fav-btn"  @click="saveToFavorites">
              <i class="fas fa-heart"></i> Save to places
          </div>
        </div>
    </div>
</template>

<script>
import {ref} from 'vue';
import axiosServer from "@/services/axiosServer.js";
import loadingSpinner from '@/components/mapV2/LoadingSpinner.vue';
import Swal from 'sweetalert2';


export default
{
    props: ["coords","fetchCoords","searchResults","locations","addLocation"],
    components: {loadingSpinner},
    setup(props, {emit})
    {
        const searchQuery = ref(null);
        const searchData = ref(null);
        const queryTimeout = ref(null);
        const selectedResult = ref(null);
        const searchSource = ref("mapbox");

        const truncate = (text, maxLength = 50) => {
          if (!text) return "";
          return text.length > maxLength ? text.slice(0, maxLength) + "..." : text;
        };
        const search = async () => {
            clearTimeout(queryTimeout.value);
            searchData.value = null;
            
            
            queryTimeout.value = setTimeout( async () => {
                if(searchQuery.value !== ""){
                    const params = {
                        proximity: props.coords ? `${props.coords.lng},${props.coords.lat}` : undefined,
                        language: 'en',
                        limit: 10,
                    };
                    try{
                      const getData = await axiosServer.get(
                          `/${searchSource.value}/${searchQuery.value}`,{params});
                      searchData.value = getData.data.features;
                      console.log("Search results from:", searchSource.value, getData.data.features);
                    } catch(error){
                      console.error("Search error:", error.message);
                    }
                    // console.log(searchData.value);
                }
            }, 750);
        };
        const selectResult = (result) => {
            selectedResult.value = result;
            emit("plotResult", result.geometry);
            };
        
        const removeResult = () => {
            selectedResult.value = null;
            emit("removeResult");
            };

        const saveToFavorites = async () => {
          if (!selectedResult.value) return;
            const coordinates = selectedResult.value.geometry.coordinates;
            const name =
                    selectedResult.value.properties?.name_preferred ||
                    selectedResult.value.text ||
                    selectedResult.value.place_name ||
                    "Unnamed";
            try {
                await props.addLocation({
                  name,
                  longitude: coordinates[0],
                  latitude: coordinates[1]
                });
                emit("locationAdded");
                Swal.fire({
                  icon: "success",
                  title: "Location Saved!",
                  text: `${name} was added to your favorites.`,
                  timer: 1500,
                  showConfirmButton: false,
                });
              } catch (error) {
                Swal.fire({
                  icon: "error",
                  title: "Failed to Save",
                  text: "Please try again later."
                });
              }
            };

        return{searchQuery,searchData,search,
              selectedResult,selectResult,removeResult,
              saveToFavorites,searchSource,truncate,
            };
    }
}
</script>

<style>
/* === Wrapper for search and geo === */
.search-area {
  position: absolute;
  max-width: 300px;
}

/* === Search Input === */
.search-wrapper {
  position: absolute;
  margin: 40px 0 0 10px;
  height: 40px;
  width: 280px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 9;
  background-color: white;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  
}

.search-input {
    width: 100%;
    font-size: 14px;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
    outline: none;
    padding: 33px;
    color: #333;
    border: 1px solid transparent;
    border-radius: 10px;
}

/* Search Icon inside input */
.search-icon {
  position: absolute;
  top: 0;
  left: 10px;
  height: 100%;
  display: flex;
  align-items: center;
  color: #475569;
}

/* === Geo Button (Floating over input) === */
.geo-button-floating {
  position: absolute;
  margin-left: 300px;
  margin-top: 42px;
  height: 36px;
  width: 36px;
  background-color: white;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: background-color 0.3s ease;
  z-index: 10;
}

.geo-button-active {
  background-color: #475569;
}

.geo-icon {
  font-size: 16px;
  color: #475569;
}

.geo-icon-active {
  color: white;
}

.geo-icon-pulse {
  animation: geoPulse 1s infinite ease-in-out;
}

@keyframes geoPulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.6;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

/* === Search Results === */
.search-results {
    position: absolute;
    margin: 90px 0 0 50px;
    height: 300px;
    width: 280px;
    display: flex;
    flex-direction: column;
    /* align-items: center;
    justify-content: space-between; */
    z-index: 1000;
    background-color: white;
    border-radius: 10px;
    overflow: auto;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
.search-result-item {
  display: flex;
  align-items: flex-start;
  gap: 8px;
  padding: 10px 16px;
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
  text-align: left;
}

.search-result-item:hover {
  background-color: #475569;
  color: white;
}
.search-text {
  display: flex;
  flex-direction: column;
  text-align: left;
}

.search-text .name {
  font-weight: bold;
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 220px;
  display: inline-block;
}

.search-text .address {
  font-size: 13px;
  color: #666;
  max-width: 220px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
}

.save-fav-btn {
  position: absolute;
  top: 140px;
  left: 10px;
  background: #475569;
  color: white;
  padding: 8px 14px;
  border-radius: 8px;
  cursor: pointer;
  z-index: 999;
  font-size: 14px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.source-switch {
  position: absolute;
  gap: 10px;
  margin-left: 10px;
  padding-top: 10px;
  font-size: 14px;
  z-index: 9;
}



</style>