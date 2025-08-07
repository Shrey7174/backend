// routes/actors.js
const express = require('express');
const axios = require('axios');


const router = express.Router();


router.post('/', async (req, res) => {
  const { apiKey } = req.body;

  if (!apiKey) {
    return res.status(400).json({ error: '❌ Missing API key in request body.' });
  }

  try {
    const response = await axios.get(`https://api.apify.com/v2/acts?token=${apiKey}`);

    if (!response.data || !Array.isArray(response.data.data?.items)) {
      return res.status(200).json({ data: { items: [] } });
    }

    res.json(response.data);
  } catch (error) {
    console.error('❌ Error fetching user actors:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch user actors from Apify.' });
  }
});

router.get('/public', async (req, res) => {
  try {
    const response = await axios.get('https://api.apify.com/v2/acts/public');

    if (!response.data || !Array.isArray(response.data.data?.items)) {
      return res.status(200).json({ data: { items: [] } });
    }

    res.json(response.data);
  } catch (error) {
    console.error('❌ Error fetching public actors:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch public actors from Apify.' });
  }
});

module.exports = router;
