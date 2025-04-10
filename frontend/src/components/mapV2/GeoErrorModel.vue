<template>
    <div class="geo-error-overlay">
        <div class="geo-error-box">
            <h1 class="geo-error-title">Error: {{ this.geoErrorMsg }}</h1>
            <p class="geo-error-text">
                To take advantage of this application’s features, please ensure location services are enabled
            </p>
            <button @click="$emit('closeGeoError')" class="geo-error-close">
                Close
            </button>
        </div>
    </div>
</template>
  

<script>
export default{
    props: ["geoErrorMsg"],
};
</script>

<style>
.geo-error-box {
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.9); 
  width: 80%;
  max-width: 450px;
  padding: 16px 24px;
  border-radius: 8px;
  z-index: 1000;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
}

.geo-error-title {
  font-size: 1.125rem; /* text-lg */
  margin-bottom: 0.25rem;
}

.geo-error-text {
  font-size: 0.875rem; /* text-sm */
  margin-bottom: 1rem;
}

.geo-error-close {
  align-self: flex-start;
  padding: 8px 16px; /* py-2 px-4 */
  background-color: #ef4444; /* bg-red-500 */
  color: white;
  font-size: 0.875rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}

.geo-error-close:hover {
  background-color: #dc2626; /* hover darker red */
}

</style>