const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

const jobRoutes = require('./routes/jobs'); // 👈 Import job route

const app = express();

app.use(cors({
  origin: 'https://jobmanagement03.netlify.app', // ✅ your frontend domain
  credentials: true,
}));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  next();
});

app.use(express.json()); // 👈 Required for req.body to work
app.use('/api/jobs', jobRoutes); // 👈 Mount the route
app.use('/logos', express.static(path.join(__dirname, 'public/logos')));

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(5000, () => console.log('Server running on port 5000'));
  })
  .catch(err => console.error(err));
