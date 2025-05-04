<template>
  <!-- Header -->
  <HeaderNav />
  <h1 class="title">MapV2 Using Leaflet and Mapbox</h1>
  <div class="btns">
    <!-- Reset btn -->
    <div class="reset-btn" @click="resetAll">Reset</div>

    <!-- screenshot -->
    <!-- <div class="screenshot-btn" @click="captureMap">Screenshot</div> -->
  </div>

  <!-- Map Container -->
  <div class="MapStyle2">
    <!-- Geo Error -->
    <GeoErrorModel
      @closeGeoError="closeGeoError"
      v-if="geoError"
      :geoErrorMsg="geoErrorMsg"
    />
    <!-- Map Features -->
    <MapFeatures
      :fetchCoords="fetchCoords"
      :coords="coords"
      :locations="locations"
      @locationAdded="fetchLocations"
      :addLocation="addLocation"
      @getGeoLocation="getGeoLocation"
      @plotResult="plotResult"
      @toggleSearchResults="toggleSearchResults"
      :searchResults="searchResults"
    />
    <div id="map" class="map-container2">
      <div class="expand">
        <i class="fa-solid fa-expand"></i>
      </div>
      <!-- Route Planner -->
      <div class="sub2">
        <div class="planner">
          <RoutePlanner @routeSelected="drawRouteRef" />
        </div>
      </div>
    </div>
    <!-- Location List -->
    <LocationList
      :locations="locations"
      @select="plotResultFromFavorite"
      @delete="deleteLocations"
    />
  </div>
</template>

<script>
import HeaderNav from "@/components/layout/HeaderNav.vue";
import GeoErrorModel from "@/components/mapV2/GeoErrorModel.vue";
import LocationList from "@/components/mapV2/LocationList.vue";
import MapFeatures from "@/components/mapV2/MapFeatures.vue";
import { useLocation } from "@/composables/MapV2/useLocation";
import { onMounted, ref } from "vue";
import "leaflet.fullscreen";
import RoutePlanner from "@/components/mapV1/RoutePlanner.vue";
import { useRouting } from "@/composables/MapV2/useRoutingV2";
import { useMap } from "@/composables/MapV2/useMapV2";
import { useGeo } from "@/composables/MapV2/useGeo";
// import html2canvas from "html2canvas";

export default {
  name: "MapV2View",
  components: {
    HeaderNav,
    GeoErrorModel,
    MapFeatures,
    LocationList,
    RoutePlanner,
  },
  setup() {
    const map = ref(null);
    const drawRouteRef = ref(null);
    const clearRouteRef = ref(null);
    // The function from useLocation
    const { addLocation, locations, fetchLocations, deleteLocation } =
      useLocation();
    // The function from useGeo
    const resultMarker = ref(null);
    const {
      coords,
      fetchCoords,
      geoMarker,
      geoError,
      geoErrorMsg,
      getGeoLocation,
      closeGeoError,
      plotResult,
      plotResultFromFavorite,
    } = useGeo(map, resultMarker);
    onMounted(() => {
      map.value = useMap(closeSearchResults);
      const routing = useRouting(map);
      drawRouteRef.value = routing.drawRoute;
      clearRouteRef.value = routing.clearRoute;
      fetchLocations();
      getGeoLocation();
    });
    const searchResults = ref(null);
    const toggleSearchResults = () => {
      searchResults.value = !searchResults.value;
    };
    const closeSearchResults = () => {
      searchResults.value = null;
    };

    const deleteLocations = async (id) => {
      await deleteLocation(id);
      await fetchLocations();
    };
    // Reset
    const resetAll = () => {
      // remove route
      if (clearRouteRef.value) clearRouteRef.value();

      // remove markers
      if (resultMarker.value && map.value.hasLayer(resultMarker.value)) {
        map.value.removeLayer(resultMarker.value);
        resultMarker.value = null;
      }
      map.value.setView([24.7136, 46.6753], 10);
      closeSearchResults();
    };
    // Screenshot
    // const captureMap = async () => {
    //   const mapElement = document.getElementById("map");
    //   if (!mapElement) return;

    //   try {
    //     const canvas = await html2canvas(mapElement, {
    //       useCORS: true,
    //       allowTaint: true,
    //       backgroundColor: "#ffffff",
    //       scale: window.devicePixelRatio || 2,
    //       scrollY: 0,
    //       scrollX: 0,
    //       windowWidth: document.body.scrollWidth,
    //       windowHeight: document.body.scrollHeight,
    //     });

    //     const link = document.createElement("a");
    //     link.download = `map-screenshot-${Date.now()}.png`;
    //     link.href = canvas.toDataURL("image/png");
    //     link.click();
    //   } catch (error) {
    //     console.error("Error while Screenshot", error);
    //   }
    // };

    return {
      coords,
      fetchCoords,
      geoMarker,
      closeGeoError,
      geoErrorMsg,
      geoError,
      getGeoLocation,
      plotResult,
      closeSearchResults,
      toggleSearchResults,
      searchResults,
      deleteLocations,
      plotResultFromFavorite,
      locations,
      addLocation,
      drawRouteRef,
      resetAll,
      // captureMap,
    };
  },
};
</script>

<style>
.MapStyle2 {
  display: flex;
  flex-direction: column;
  max-width: 95%;
  height: calc(100vh - 120px);
  margin: 1rem auto;
  font-family: "Inter", system-ui, -apple-system, sans-serif;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
  background: #f8f9fa;
  border: 1px solid rgba(0, 0, 0, 0.05);
}

h2 {
  color: #fafafa;
  margin: 1rem 0;
  font-size: 1.5rem;
  font-weight: 600;
  text-align: center;
}

.MapStyle2 button {
  border-radius: 8px;
  border: none;
  padding: 0.6rem 1.2rem;
  font-size: 0.9rem;
  font-weight: 500;
  font-family: inherit;
  cursor: pointer;
  transition: all 0.2s ease;
  background-color: #4cc9f0;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.MapStyle2 button:hover {
  background-color: #3aa8d8;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.MapStyle2 button:active {
  transform: translateY(0);
}

.map-container2 {
  flex: 1;
  width: 100%;
  height: 100%;
  border-radius: 8px;
  position: relative;
  z-index: 1;
  overflow: hidden;
}

.expand {
  position: absolute;
  right: 14px;
  top: -2px;
  border-radius: 8px;
  padding: 8px;
  z-index: 1100;
  font-size: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  /* box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); */
  color: #2c3e50;
  transition: all 0.2s ease;
}

.expand:hover {
  background: #f1f1f1;
  transform: scale(1.05);
}

.planner {
  position: relative;
  width: 100%;
}

.sub2 {
  position: fixed;
  /* bottom: 60px; increased bottom to avoid overlap with search results */
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  justify-content: center;
  width: 90%;
  max-width: 700px;
  /* background: rgba(28, 28, 28, 0.5); */
  padding: 2px 10px;
  border-radius: 12px;
  /* box-shadow: 0 4px 12px rgba(0,0,0,0.3); */
  z-index: 1100;
}

/* Mobile adjustments */
@media (max-width: 1400px) {
  .sub2 {
    bottom: 40px; /* reduce bottom on mobile */
    width: 100%;
  }
}

@media (max-width: 480px) {
  .sub2 {
    bottom: 40px;
    width: 97%;
    /* display: flex; ensure visible */
  }
}
.leaflet-marker-icon {
  image-rendering: auto;
  transform-origin: center bottom;
}

.planner input,
.planner button {
  border-radius: 8px;
  border: 1px solid #e0e0e0;
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.planner input:focus {
  outline: none;
  border-color: #4cc9f0;
  box-shadow: 0 0 0 2px rgba(76, 201, 240, 0.2);
}

.planner button {
  background-color: #4cc9f0;
  color: white;
  border: none;
}

.planner button:hover {
  background-color: #3aa8d8;
}
.reset-btn {
  background: white;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 14px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-weight: bold;
  color: #2c3e50;
  transition: 0.2s ease;
}
.reset-btn:hover {
  background: #f1f1f1;
  transform: scale(1.05);
}
.btns {
  position: static;
  display: flex;
  flex-direction: row;
  gap: 20px;
  margin-left: 37px;
}
.screenshot-btn {
  background: white;
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 14px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  font-weight: bold;
  color: #2c3e50;
  transition: 0.2s ease;
}
.screenshot-btn:hover {
  background: #f1f1f1;
  transform: scale(1.05);
}

/* Responsive adjustments */
@media (max-width: 1200px) {
  .MapStyle2 {
    width: 95%;
    height: calc(100vh - 100px);
    border-radius: 0;
    background: none;
  }

  h2 {
    font-size: 1.2rem;
    margin: 0.5rem 0;
  }
  .map-container2 {
    height: 60vh;
    min-height: 500px;
    margin: 5px 0;
  }
  .leaflet-routing-container {
    width: 140px;
    height: 160px;
  }
}

@media (max-width: 300px) {
  .sub2 {
    width: 100%;
  }
  .planner {
    background-color: #2c3e50;
  }
  .leaflet-routing-container {
    width: 100px;
    height: 100px;
  }
}

/* .leaflet-control-layers {
  background: none;
} */
.leaflet-touch .leaflet-control-layers-toggle {
  width: 30px;
  height: 30px;
}
.leaflet-control-zoom-fullscreen leaflet-fullscreen-icon {
  width: 43px !important;
  height: 43px !important;
  background-size: contain !important;
}
.leaflet-draw-toolbar,
.leaflet-draw-toolbar a {
  box-shadow: none !important;
}
.leaflet-control-fullscreen img {
  pointer-events: none;
}
.leaflet-touch .leaflet-bar a {
  width: 30px;
}
.leaflet-bar a {
  background-color: transparent !important;
  box-shadow: none !important;
}
.leaflet-routing-container {
  max-width: 300px !important;
  max-height: 400px !important;
  overflow-y: auto;
  background-color: #f0f9ff6c;
  font-size: 14px;
  color: #1f2937;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 10px;
}
.leaflet-routing-container h2 {
  color: #1f293a;
}

.leaflet-routing-container a {
  color: #007bff;
  text-decoration: none;
}

.leaflet-routing-container a:hover {
  text-decoration: underline;
}
</style>
