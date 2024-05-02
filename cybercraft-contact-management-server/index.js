const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch(err => console.log("MongoDB connection error: ", err));

// Routes
const contactRoutes = require('./routes/contactRoutes');
app.use('/api', contactRoutes);

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
