const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const blogRoutes = require('./routes/blogRoutes');
const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (including uploaded files)
app.use('/uploads', express.static(path.join(__dirname, 'public/uploads')));

// Use routes
app.use('/blogs', blogRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
