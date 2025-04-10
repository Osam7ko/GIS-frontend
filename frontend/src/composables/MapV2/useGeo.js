import { ref } from "vue";
import leaflet from "leaflet";

export function useGeo(map, resultMarker) {
  const coords = ref(null);
  const fetchCoords = ref(false);
  const geoMarker = ref(null);
  const geoError = ref(null);
  const geoErrorMsg = ref(null);

  const plotMarker = (coords, customMarker, zoom = 13) => {
    const marker = leaflet
      .marker([coords.coordinates[1], coords.coordinates[0]], {
        icon: customMarker,
      })
      .addTo(map.value);
    map.value.flyTo([coords.coordinates[1], coords.coordinates[0]], zoom);
    return marker;
  };

  const plotResult = (coords) => {
    if (resultMarker.value && map.value.hasLayer(resultMarker.value)) {
      map.value.removeLayer(resultMarker.value);
    }
    const customMarker = leaflet.icon({
      iconUrl: require("@/assets/map-marker-blue.svg"),
      iconSize: [35, 35],
    });
    resultMarker.value = plotMarker(coords, customMarker, 12);
  };

  const plotResultFromFavorite = (location) => {
    const coordsObj = {
      coordinates: [location.longitude, location.latitude],
    };
    if (resultMarker.value && map.value.hasLayer(resultMarker.value)) {
      map.value.removeLayer(resultMarker.value);
    }
    const customMarker = leaflet.icon({
      iconUrl: require("@/assets/marker-star.svg"),
      iconSize: [35, 35],
    });
    resultMarker.value = plotMarker(coordsObj, customMarker, 13);
  };

  const plotGeolocation = (coords) => {
    if (!leaflet.Marker.prototype._customZoomPatched) {
      leaflet.Marker.prototype._animateZoom = function (opt) {
        if (!this._map) return;
        const pos = this._map
          ._latLngToNewLayerPoint(this._latlng, opt.zoom, opt.center)
          .round();
        this._setPos(pos);
      };
      leaflet.Marker.prototype._customZoomPatched = true;
    }

    if (geoMarker.value && map.value.hasLayer(geoMarker.value)) {
      map.value.removeLayer(geoMarker.value);
      geoMarker.value = null;
    }

    const customMarker = leaflet.icon({
      iconUrl: require("@/assets/marker-user.svg"),
      iconSize: [35, 35],
    });

    geoMarker.value = leaflet
      .marker([coords.lat, coords.lng], { icon: customMarker })
      .addTo(map.value);

    map.value.flyTo([coords.lat, coords.lng], 13);
  };

  const getGeoLocation = () => {
    if (!coords.value) {
      if (sessionStorage.getItem("coords")) {
        coords.value = JSON.parse(sessionStorage.getItem("coords"));
        plotGeolocation(coords.value);
        return;
      }
      fetchCoords.value = true;
      navigator.geolocation.getCurrentPosition(setCoords, getLocError);
      return;
    }

    if (geoMarker.value && map.value.hasLayer(geoMarker.value)) {
      map.value.removeLayer(geoMarker.value);
    }

    coords.value = null;
    geoMarker.value = null;
    sessionStorage.removeItem("coords");
  };

  const setCoords = (pos) => {
    fetchCoords.value = null;
    const sessionCoords = {
      lat: pos.coords.latitude,
      lng: pos.coords.longitude,
    };
    sessionStorage.setItem("coords", JSON.stringify(sessionCoords));
    coords.value = sessionCoords;
    plotGeolocation(sessionCoords);
  };

  const getLocError = (err) => {
    fetchCoords.value = null;
    geoError.value = true;
    geoErrorMsg.value = err.message;
  };

  const closeGeoError = () => {
    geoError.value = null;
    geoErrorMsg.value = null;
  };

  return {
    coords,
    fetchCoords,
    geoMarker,
    geoError,
    geoErrorMsg,
    getGeoLocation,
    closeGeoError,
    plotResult,
    plotResultFromFavorite,
  };
}
