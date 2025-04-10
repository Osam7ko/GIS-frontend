import L from "leaflet";
import markerUserIcon from '@/assets/marker-user.svg';
import markerBlue from '@/assets/map-marker-blue.svg';

export function useHelpers(map){

    let userMarker = null;

    const toggleInstructions = () => {
        const container = document.querySelector(".leaflet-routing-container");
        if (container) {
        container.style.display = container.style.display === "" ? "block" : "none";
        }
    };

    const goToLocation = ({ lat, lon }) => {
        if (map.value) {
            map.value.setView([lat, lon], 12);
            L.marker([lat, lon],{
              icon: L.icon({
                  iconUrl: markerBlue,
                  iconSize: [25, 41],
                  iconAnchor: [12, 41]
              })
          }).addTo(map.value)
        }
        // Zoom problem
        if (!L.Marker.prototype._customZoomPatched) {
          L.Marker.prototype._animateZoom = function (opt) {
              if (!this._map) return;
              const pos = this._map._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center).round();
              this._setPos(pos);
          };
          L.Marker.prototype._customZoomPatched = true; // Prevent running multiple times
      }
    };
    

    const locateUser = () => {
        if (!map.value) return;
    
        if ("geolocation" in navigator) {
          navigator.geolocation.watchPosition(
            (position) => {
              const { latitude, longitude } = position.coords;
              if (!L.Marker.prototype._customZoomPatched) {
                L.Marker.prototype._animateZoom = function (opt) {
                    if (!this._map) return;
                    const pos = this._map._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center).round();
                    this._setPos(pos);
                };
                L.Marker.prototype._customZoomPatched = true; // Prevent running multiple times
            }
              if (userMarker) {
                userMarker.setLatLng([latitude, longitude]);
              } else {
                userMarker = L.marker([latitude, longitude], {
                    icon: L.icon({
                        iconUrl: markerUserIcon,
                        iconSize: [25, 41],
                        iconAnchor: [12, 41]
                    })
                }).addTo(map.value)
                
              }
    
              map.value.setView([latitude, longitude], 14);
            },
            (error) => {
              alert("Unable to retrieve your location: " + error.message);
            }
          );
        } else {
          alert("your device does not support geolocation");
        }
      };

    return {locateUser,toggleInstructions,goToLocation};
}