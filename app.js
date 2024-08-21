const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv = require('dotenv');
const blogRoutes = require('./routes/blogRoutes');
const errorHandler = require('./middlewares/errorHandler');

// Initialize environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // To handle JSON payloads


// Centralized routes
app.use('/blogs', blogRoutes);
// Add more routes for different parts of your website
// e.g., app.use('/users', userRoutes);
// e.g., app.use('/products', productRoutes);

// Error handling middleware
app.use(errorHandler);

// Start the Express server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
