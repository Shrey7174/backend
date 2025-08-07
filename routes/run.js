// routes/run.js
const express = require('express');
const axios = require('axios');


const router = express.Router();


router.post('/', async (req, res) => {
  const { actorId, input, apiKey } = req.body;

  if (!actorId || !input || !apiKey) {
    return res.status(400).json({ error: '❌ Missing actorId, input, or API key in request body.' });
  }

  try {
    const url = `https://api.apify.com/v2/acts/${actorId}/runs?token=${apiKey}`;
    const runResponse = await axios.post(url, input);

    if (!runResponse?.data) {
      throw new Error('Empty response from Apify run endpoint');
    }

    res.json(runResponse.data);

  } catch (error) {
    console.error('❌ Error running actor:', error?.response?.data || error.message);
    res.status(500).json({
      error: '❌ Failed to run actor. Check API key, actorId, or input payload.',
      details: error?.response?.data || error.message,
    });
  }
});

module.exports = router;
