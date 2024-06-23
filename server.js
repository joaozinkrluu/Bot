const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

// Import Routes
const authRoutes = require('./routes/auth');
const botRoutes = require('./routes/bots');

// Use Routes
app.use('/api/auth', authRoutes);
app.use('/api/bots', botRoutes);

// Index Route
app.get('/', (req, res) => {
    res.render('index');
});

// Start Server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
