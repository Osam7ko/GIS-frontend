<template>
    <div class="home-view">
        <HeaderNav />

        <div class="content-wrapper">
        <div class="hero-section">
            <h1 v-if="username">Hi {{ username }}, Welcome to Repository Page</h1>
            <h1 v-else>Repository Page</h1>
            <p class="subtitle">
            You can from here check the Backend and the Frontend
            </p>
            <div class="cta-buttons">
            <a
                href="https://github.com/Osam7ko/app-location-frontend"
                class="btn btn-primary"
                >Frontend</a
            >
            <a
                href="https://github.com/Osam7ko/app-location-backend"
                class="btn btn-secondary"
                >Backend</a
            >
            </div>
        </div>
        </div>
    </div>
</template>

<script>
import HeaderNav from '@/components/layout/HeaderNav.vue'

export default {
  name: "GithubView",
  components: {
    HeaderNav,
  },
}
</script>

<style>
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
</style>
