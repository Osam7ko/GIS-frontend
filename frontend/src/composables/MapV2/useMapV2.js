import leaflet from 'leaflet';
import 'leaflet.fullscreen';

export function useMap(onMoveEnd) {
  const map = leaflet.map('map', {
    zoomControl: false,
    fullscreenControl: true,
    fullscreenControlOptions: {
      position: 'topright',
      title: 'Show me the fullscreen !',
    }
  }).setView([24.7136, 46.6753], 10);

  const baseMaps = {
    "Standard mapbox": leaflet.tileLayer(
      `https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/256/{z}/{x}/{y}?access_token=${process.env.VUE_APP_API_KEY}`,
      { maxZoom: 18 }),
    "Satellite mapbox": leaflet.tileLayer(
      `https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v12/tiles/256/{z}/{x}/{y}?access_token=${process.env.VUE_APP_API_KEY}`,
      { maxZoom: 18 }),
    "Standard leaflet": leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenStreetMap contributors'
    }),
    "Satellite google Maps": leaflet.tileLayer("https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}", {
      subdomains: ["mt0", "mt1", "mt2", "mt3"],
      attribution: '&copy; Google Maps'
    }),
    "Terrain OpenTopoMap": leaflet.tileLayer("https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; OpenTopoMap'
    }),
  };

  baseMaps["Standard mapbox"].addTo(map);
  leaflet.control.layers(baseMaps).addTo(map);

  if (onMoveEnd) {
    map.on('moveend', onMoveEnd);
  }

  return map;
}
