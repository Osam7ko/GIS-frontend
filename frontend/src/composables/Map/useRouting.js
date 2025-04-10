import L from "leaflet";
import "leaflet-routing-machine"
import axiosServer from "@/services/axiosServer.js";
import markerUserIcon from '@/assets/marker-user.svg';
import markerBlue from '@/assets/map-marker-blue.svg';

export function useRouting(map) {
  let routingControl = null;
  const routeLayer = L.layerGroup(); //  Group to store both route and markers

  const startIcon = L.icon({
    iconUrl: markerUserIcon,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  const endIcon = L.icon({
    iconUrl: markerBlue,
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32]
  });

  const drawRoute = async ({ start, end }) => {
    if (!map.value) {
      console.error("Map is not initialized yet");
      return;
    }
  
    try {
      const startResponse = await axiosServer.get(
      `/nominatim/${start}`
      );
      const endResponse = await axiosServer.get(
      `/nominatim/${end}`
      );
  
      if (map) {
          const startCoords = [
              startResponse.data.features[0].geometry.coordinates[1],
              startResponse.data.features[0].geometry.coordinates[0],
          ];
          const endCoords = [
              endResponse.data.features[0].geometry.coordinates[1],
              endResponse.data.features[0].geometry.coordinates[0],
          ];
  
      routeLayer.clearLayers();
  
      if (routingControl) {
          map.value.removeControl(routingControl);
      }
  
      if (!L.Marker.prototype._customZoomPatched) {
          L.Marker.prototype._animateZoom = function (opt) {
              if (!this._map) return;
              const pos = this._map._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center).round();
              this._setPos(pos);
          };
          L.Marker.prototype._customZoomPatched = true; // Prevent running multiple times
      }
  
      const startMarker = L.marker(startCoords, { icon: startIcon }).bindPopup("Start Point");
      const endMarker = L.marker(endCoords, { icon: endIcon }).bindPopup("Destination Point");
  
      routeLayer.addLayer(startMarker);
      routeLayer.addLayer(endMarker);
  
      routingControl = L.Routing.control({
          waypoints: [
          L.latLng(startCoords),
          L.latLng(endCoords)
          ],
          createMarker: () => null,
          lineOptions: {
          styles: [{ color: "#007bff", weight: 6, opacity: 0.8 }]
          },
          routeWhileDragging: true,
          showAlternatives: false,
          addWaypoints: false,
          fitSelectedRoutes: true
      }).addTo(map.value);
  
      routeLayer.addTo(map.value);
      } else {
      alert("Could not find location for route.");
      console.log("Start Response:", startResponse.data);
      console.log("End Response:", endResponse.data);
      }
  } catch (error) {
      console.error("Error drawing route:", error);
  }
  };
  return{drawRoute};
}