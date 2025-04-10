import {ref,onMounted} from "vue";
import L from "leaflet";

L.Icon.Default.mergeOptions({
    iconUrl: "/leaflet/marker-icon.png",
    iconRetinaUrl: "/leaflet/marker-icon-2x.png",
    shadowUrl: "/leaflet/marker-shadow.png"
})

export function useMap() {
    const map = ref(null);
    const baseMaps = ref({});

    onMounted(() => {
        map.value = L.map("map", {
            zoomControl: false,
            fullscreenControl: true,
                fullscreenControlOptions: {
                    position: 'topright',
                    title: 'Show me the fullscreen !', // change the title of the button, default Full Screen
                    
                }
        }).setView([24.7136, 46.6753], 10);
    
        baseMaps.value = {
            "Standard": L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; OpenStreetMap contributors'
            }),
            "Satellite": L.tileLayer("https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
            subdomains: ["mt0", "mt1", "mt2", "mt3"],
            attribution: '&copy; Google Maps'
            }),
            "Terrain": L.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
            attribution: '&copy; OpenTopoMap'
            }),
            "Dark Mode": L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
            attribution: '&copy; CartoDB'
            }),
        };

        
    
        baseMaps.value["Standard"].addTo(map.value);
        L.control.layers(baseMaps.value).addTo(map.value);
        });
    
    return { map };
}



