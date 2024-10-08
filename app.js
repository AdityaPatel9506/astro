const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import the CORS package
const blogRoutes = require('./routes/blogRoutes');
const panchangRoutes = require('./routes/panchangRoutes');
const matchingRoutes  = require('./routes/kundaliRoutes');

const app = express();

// Use CORS middleware
app.use(cors());

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (including uploaded files)
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Use routes
app.use('/blogs', blogRoutes);
app.use('/panchang', panchangRoutes);
app.use('/kundali', matchingRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
