<template>
  <div class="home-view">
    <HeaderNav />
    <GlComponents class="gl-container" />
    
    <div class="content-wrapper">
      <div class="hero-section">
        <h1 v-if="username">Hi {{ username }}, Welcome to Mapping Platform</h1>
        <h1 v-else>Home Page</h1>
        <p class="subtitle">
          Explore powerful mapping features with intuitive interface
        </p>
        <div class="cta-buttons">
          <router-link to="/map" class="btn btn-primary">Try Map V1</router-link>
          <router-link to="/mapV2" class="btn btn-secondary">Try Map V2</router-link>
        </div>
      </div>

      <div class="features-section">
        <h2>Key Features</h2>
        <div class="features-grid">
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-map-marked-alt"></i>
            </div>
            <h3>Interactive Maps</h3>
            <p>Explore locations with our dynamic mapping interface</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-route"></i>
            </div>
            <h3>Route Planning</h3>
            <p>Plan and visualize optimal routes between locations</p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-bookmark"></i>
            </div>
            <h3>Saved Locations</h3>
            <p>Save and manage your favorite places</p>
          </div>
        </div>
      </div>

      <div class="version-comparison">
        <h2>Map Version Comparison</h2>
        <div class="feature-showcases">
          <div class="feature-card" id="Map1">
            <FetureShowCases
              title="Map V1"
              description="The V1 map was built using <strong>Leaflet</strong> for the GIS foundation,<br>
                          with <strong>leaflet-routing-machine</strong>
                          to provide live routing between locations,<br>
                          and <strong>Nominatim API</strong> 
                          to support geocoding and location search.<br>
                          It also features <strong>user location detection</strong> 
                          and the ability to find and navigate to any place interactively."
              :images="[
                '/fetureImg/v1-1.png',
                '/fetureImg/v1-2.png',
                '/fetureImg/v1-3.png',
              ]"
              route="/Map"
            />
          </div>
          
          <div class="feature-card" id="Map2">
            <FetureShowCases
              title="Map V2"
              description="The V2 map integrates <strong>Mapbox</strong> as the core GIS engine with 
                          <strong>Leaflet</strong> controls for interaction.<br>
                          It supports location search using both <strong>Nominatim</strong> 
                          and <strong>Mapbox APIs</strong> for flexible geocoding.<br>
                          Users can <strong>save favorite locations</strong> 
                          to a personal database, with improved interface and visual enhancements."
              :images="[
                '/fetureImg/v2-1.png',
                '/fetureImg/v2-2.png',
                '/fetureImg/v2-3.png',
              ]"
              route="/mapV2"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderNav from '@/components/layout/HeaderNav.vue'
import GlComponents from '@/components/Home/GlComponents.vue'
import FetureShowCases from '@/components/Home/FetureShowCases.vue'
import {fetchCurrentUser } from '@/services/authService.js';

export default {
  name: "HomeView",
  components: {
    HeaderNav,
    GlComponents,
    FetureShowCases
  },
  data() {
    return {
      username: ""
    };
  },
  async mounted() {
    try {
      // Calling the user from BK
      const user = await fetchCurrentUser();
      this.username = user.username; 
      console.log("Current user:", user); 
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  }

};
</script>

<style scoped>
.home-view {
  position: relative;
  height: 320vh;
  overflow: hidden;
}

.content-wrapper {
  position: relative;
  z-index: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.gl-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.hero-section {
  text-align: center;
  padding: 4rem 2rem;
  margin-bottom: 3rem;
  background: rgba(26, 26, 46, 0.7);
  border-radius: 16px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.hero-section h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #f8f9fa;
  font-weight: 600;
}

.subtitle {
  font-size: 1.2rem;
  color: #adb5bd;
  margin-bottom: 2rem;
}

.cta-buttons {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.btn {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  text-decoration: none;
  transition: all 0.3s ease;
}

.btn-primary {
  background-color: #4cc9f0;
  color: #1a1a2e;
}

.btn-primary:hover {
  background-color: #3aa8d8;
  transform: translateY(-2px);
}

.btn-secondary {
  background-color: transparent;
  color: #4cc9f0;
  border: 1px solid #4cc9f0;
}

.btn-secondary:hover {
  background-color: rgba(76, 201, 240, 0.1);
  transform: translateY(-2px);
}

.features-section {
  margin-top: 4rem;
}

.features-section h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #f8f9fa;
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.feature-card {
  background: rgba(26, 26, 46, 0.7);
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  transition: transform 0.3s ease;
  border: 1px solid rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
}

.feature-card:hover {
  transform: translateY(-5px);
  background: rgba(26, 26, 46, 0.9);
}

.feature-icon {
  font-size: 2.5rem;
  color: #4cc9f0;
  margin-bottom: 1rem;
}

.feature-card h3 {
  color: #f8f9fa;
  margin-bottom: 0.5rem;
}

.feature-card p {
  color: #adb5bd;
  line-height: 1.6;
}

.version-comparison {
  margin-top: 4rem;
}

.version-comparison h2 {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #f8f9fa;
}

.feature-showcases {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

@media (max-width: 768px) {
  .hero-section {
    padding: 2rem 1rem;
  }
  
  .hero-section h1 {
    font-size: 2rem;
  }
  
  .cta-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .btn {
    width: 100%;
    max-width: 300px;
  }
}
</style>
