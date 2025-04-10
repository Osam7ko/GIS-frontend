const express = require('express');
const axios = require('axios');
const router = express.Router();
const url = require('url');

// Route for Mapbox Geocoding
router.get('/mapbox/:query', async (req, res) => {
  const query = req.params.query;
  const { proximity, language, limit } = req.query;

  try {
    const response = await axios.get('https://api.mapbox.com/search/geocode/v6/forward', {
      params: {
        q: query,
        access_token: process.env.API_KEY,
        ...url.parse(req.url, true).query, // Proximity, language, limit, etc.
      },
    });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('Mapbox search error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

// Route for Nominatim Geocoding
router.get('/nominatim/:query', async (req, res) => {
  const query = req.params.query;

  try {
    const response = await axios.get('https://nominatim.openstreetmap.org/search', {
      params: {
        q: query,
        format: 'json',
        addressdetails: 1,
        limit: 10,
      },
    });

    // Format the response to match the structure used in your application
    const formattedData = response.data.map((place) => ({
      text: place.display_name,
      geometry: {
        coordinates: [parseFloat(place.lon), parseFloat(place.lat)],
      },
      source: 'nominatim',
    }));

    res.status(200).json({ features: formattedData });
  } catch (error) {
    console.error('Nominatim search error:', error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
