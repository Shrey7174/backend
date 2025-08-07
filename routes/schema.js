// routes/schema.js

const express = require('express');
const axios = require('axios');


const router = express.Router();


router.post('/', async (req, res) => {
  const { apiKey, actorId } = req.body;

  if (!actorId) {
    return res.status(400).json({ error: '❌ Actor ID is required in request body.' });
  }

  try {
    let response;

   
    const privateActorUrl = `https://api.apify.com/v2/acts/${actorId}?token=${apiKey}`;

    try {
      response = await axios.get(privateActorUrl);
    } catch (err) {
    
      const publicActorUrl = `https://api.apify.com/v2/acts/public/${actorId}`;
      response = await axios.get(publicActorUrl);
    }

    const actorData = response?.data?.data || {};
    const inputSchema = actorData.input || {};
    const title = actorData.title || '';
    const description = actorData.description || '';

    res.json({
      inputSchema,
      title,
      description,
    });

  } catch (error) {
    console.error('❌ Failed to fetch actor schema:', error?.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch schema from Apify.' });
  }
});

module.exports = router;
