# app-location-frontend
this is the frontend for the Location App using Vue.js

# Location App

Vue.js application that provides an interactive GIS map using Leaflet and Mapbox.

##  Features
-  Leaflet map with custom tile layers (Mapbox, OpenStreetMap, Google)
-  User geolocation and plotting
-  Search via Nominatim and Mapbox APIs
-  Favorite locations saved per user (via API)
-  Route planner with leaflet-routing-machine

##  Run Locally
```bash
npm install
npm run serve
```

###  Env
Create a `.env` file:
```
VUE_APP_API_KEY=your_mapbox_api_key
VUE_APP_API_BASE=your_localhost
VUE_APP_API_AUTH=your_auth
VUE_APP_API_SERVER=server_for_api_call
```

##  Build
```bash
npm run build
```
```