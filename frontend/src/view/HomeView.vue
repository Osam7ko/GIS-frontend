<template>
  <div class="home-view">
    <HeaderNav />
    <GlComponents class="gl-container" />

    <div class="content-wrapper">
      <div class="hero-section">
        <h1 v-if="username">Hi {{ username }}, Welcome to Mapping Platform</h1>
        <h1 v-else>Mapping Platform</h1>
        <p class="subtitle">
          Explore powerful mapping features with intuitive interface
        </p>
        <div class="cta-buttons">
          <!-- <router-link to="/mapv1" class="btn btn-primary">Try Map V1</router-link> -->
          <router-link to="/mapv2" class="btn btn-secondary"
            >Try Map V2</router-link
          >
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
            <p>
              Navigate locations with an intuitive and responsive map experience
            </p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-route"></i>
            </div>
            <h3>Route Planning</h3>
            <p>
              Generate and display the most efficient paths between selected
              destinations
            </p>
          </div>
          <div class="feature-card">
            <div class="feature-icon">
              <i class="fas fa-bookmark"></i>
            </div>
            <h3>Saved Locations</h3>
            <p>
              Save and manage your places, and take a screenshot of your drow in
              the map!
            </p>
          </div>
        </div>
      </div>

      <div class="version-comparison">
        <!-- <h2>Map Version Comparison</h2> -->
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
              :images="assetUrls.featureImagesV1"
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
              to a personal database, with improved interface and visual enhancements.<br>
              Now also supports <strong>drawing shapes</strong> (polygons, polylines, markers) 
              on the map and <strong>downloading</strong> the map view as an image snapshot."
              :images="assetUrls.featureImagesV2"
              route="/mapv2"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeaderNav from "@/components/layout/HeaderNav.vue";
import GlComponents from "@/components/Home/GlComponents.vue";
import FetureShowCases from "@/components/Home/FetureShowCases.vue";
import { fetchCurrentUser } from "@/services/authService.js";
import { assetUrls } from "@/services/assetUrls";

export default {
  name: "HomeView",
  components: {
    HeaderNav,
    GlComponents,
    FetureShowCases,
  },
  data() {
    return {
      username: "",
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
  },
  setup() {
    return {
      assetUrls,
    };
  },
};
</script>

<style scoped>
.home-view {
  position: relative;
  min-height: 100vh;
  overflow-x: hidden;
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
  overflow: hidden;
}

@media (max-width: 768px) {
  .gl-container {
    /* Ensure content remains readable on mobile */
    filter: brightness(0.7);
  }

  /* Adjust content spacing for mobile */
  .content-wrapper {
    padding-top: 1rem;
  }
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
  .home-view {
    height: auto;
  }
  .hero-section {
    padding: 1.5rem 1rem;
    margin-bottom: 1.5rem;
  }

  .hero-section h1 {
    font-size: 1.8rem;
    line-height: 1.3;
  }

  .subtitle {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  .cta-buttons {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }

  .btn {
    width: 100%;
    max-width: none;
    padding: 0.75rem;
  }

  .features-grid {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .feature-card {
    padding: 1.25rem;
  }

  .feature-icon {
    font-size: 2rem;
  }

  .version-comparison {
    margin-top: 2rem;
  }

  .version-comparison h2,
  .features-section h2 {
    font-size: 1.5rem;
    margin-bottom: 1.5rem;
  }
}

@media (max-width: 480px) {
  .content-wrapper {
    padding: 0.75rem;
  }

  .hero-section h1 {
    font-size: 1.5rem;
  }

  .feature-card {
    padding: 1rem;
  }

  .feature-icon {
    font-size: 1.75rem;
  }
}
</style>
