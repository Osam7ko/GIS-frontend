<template>
    <HeaderNav/>
    <h2 class="title">Map V1 Using leaflet</h2>
    <div class="MapStyle1">
        
        <!--  Search Bar -->
        <SearchBar @locationFound="goToLocation" />

        <!-- Button Group -->
        <div class="button-container">
            <!--  Route Planner -->
            <RoutePlanner @routeSelected="drawRoute" />
            <!--  Locate User Button -->
            <button class="location-btn" @click="locateUser">Locate Me</button>
        </div>
        
        <div id="map" class="map-container1"><div class="expand"><i class="fa-solid fa-expand"></i></div></div>
    </div>
</template>

<script>
import HeaderNav from '@/components/layout/HeaderNav.vue';
import { useMap } from "@/composables/Map/useMap";
import {useHelpers} from '@/composables/Map/useHelpers';
import { useRouting } from "@/composables/Map/useRouting";
import RoutePlanner from '@/components/mapV1/RoutePlanner.vue';
import SearchBar from '@/components/mapV1/SearchBar.vue';

export default {
    name: 'MapView',
    components: {
        HeaderNav,
        RoutePlanner,
        SearchBar,
    },
    setup() {
        const { map } = useMap();
        const { locateUser , goToLocation, toggleInstructions} = useHelpers(map);
        const { drawRoute } = useRouting(map);
        
        return {
            map,
            locateUser,
            drawRoute,
            goToLocation,
            toggleInstructions
        };
    },
}
</script>

<style>
/*  Map Styles */
.map-container1 {
  width: 100%;
  height: 70vh;
  min-height: 900px;
  border-radius: 12px;
  margin: 20px 0;
  box-shadow: 0 4px 20px rgba(0,0,0,0.1);
}

.MapStyle1 {
    display: flex;
    flex-direction: column;
    max-width: 95%;
    height: calc(100vh - 120px);
    margin: 1rem auto;
    padding: 20px;
    position: relative;
    text-align: center;
    font-family: 'Inter', system-ui, -apple-system, sans-serif;
    border-radius: 16px;
}
  

.MapStyle1 input{
    background: #f3f3f3;
    color: #333;
    border: 1px solid transparent;
    border-radius: 10px;
    padding: 10px;
}
.MapStyle1 button {
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

/* Button Container */
.button-container {
  position: absolute;
  top: 80px;
  left: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  z-index: 999;
  padding: 15px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

/* Professional Button Styles */
.location-btn {
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 500;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  gap: 8px;
  position: absolute;
}

.location-btn {
  background: linear-gradient(135deg, #28a745, #218838);
  color: white;
}



.location-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}

.location-btn:active {
  transform: translateY(0);
}

/* Title/Label Styling */
.title {
  margin: 20px 0;
  font-size: 2rem;
  font-weight: 600;
  color: #ffffff;
  text-align: center;
}

/* Mobile Responsiveness */
@media (max-width: 768px) {
  .map-container1 {
    height: 60vh;
    min-height: 400px;
  }
  
  .button-container {
    flex-direction: column;
    gap: 10px;
  }
  
  .location-btn, .toggle-btn {
    width: 100%;
    justify-content: center;
  }
  
  .title {
    font-size: 1.5rem;
  }
}

.MapStyle1 h1 {
    font-size: 3.2em;
    line-height: 1.1;
}

.MapStyle1 .card {
    padding: 2em;
}

.title{
    margin-bottom: 20px;
    margin-top: 20px;
}

.expand{
    position: absolute;
    right:6px;
    margin-bottom: 20px;
    top: -2px;
    border-radius: 10px;
    margin-top: 1rem;
    max-height: 300px;
    overflow-y: auto;
    padding: 8px 14px;
    z-index: 1100;
    font-size: 12px;
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.leaflet-routing-container {
  width: 300px !important;          
  max-height: 400px !important;     
  overflow-y: auto;                 
  background-color: #f0f9ff6c;        
  font-size: 14px;                  
  color: #1f2937;                  
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  padding: 10px;
}

.leaflet-routing-container a {
  color: #007bff;
  text-decoration: none;
}

.leaflet-routing-container a:hover {
  text-decoration: underline;
}
</style>
