<template>
    <div class="map-wrapper">
        <div ref="mapContainer" class="mapbox-map"></div>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import mapboxgl from 'mapbox-gl'


mapboxgl.accessToken = 'pk.eyJ1Ijoib3NhbWE5a2EiLCJhIjoiY204bTZpcGliMTl5azJqc2UzOTFnZmV4bCJ9.wCrx7Dn_S44odhnsF1OImA'

const mapContainer = ref(null)
let userInteracting = false
const spinEnabled = true

onMounted(() => {
    const map = new mapboxgl.Map({
    container: mapContainer.value,
    style: 'mapbox://styles/mapbox/streets-v9',
    projection: 'globe',
    zoom: 2,
    center: [30, 15]
    })

    map.addControl(new mapboxgl.NavigationControl())
    

    map.on('style.load', () => {
    map.setFog({})
    })

    
    const secondsPerRevolution = 240
    const maxSpinZoom = 40
    const slowSpinZoom = 3

    function spinGlobe() {
    const zoom = map.getZoom()
    if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
        let distancePerSecond = 360 / secondsPerRevolution
        if (zoom > slowSpinZoom) {
        const zoomDif = (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom)
        distancePerSecond *= zoomDif
        }
        const center = map.getCenter()
        center.lng -= distancePerSecond
        map.easeTo({ center, duration: 1000, easing: n => n })
    }
    }

    map.on('mousedown', () => userInteracting = true)
    map.on('dragstart', () => userInteracting = true)
    map.on('moveend', () => spinGlobe())

    spinGlobe()
})
</script>

<style scoped>
.map-wrapper {
    position: relative;
    width: 100%;
    height: 100vh;
    overflow: hidden;
}
.mapbox-map {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 100%;
}

</style>

