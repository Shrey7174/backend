// index.js
const cors = require('cors');
const express = require('express');
const actorsRoute = require('./routes/actors');
const schemaRoute = require('./routes/schema');
const runRoute = require('./routes/run');

const app = express();
const PORT = process.env.PORT || 5002;


app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());


app.use('/api/actors', actorsRoute);
app.use('/api/schema', schemaRoute);
app.use('/api/run', runRoute);


app.get('/', (req, res) => {
  res.json({ message: '🚀 Apify Backend is running!' });
});


app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
