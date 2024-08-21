// In routes/blogRoutes.js
const express = require('express');
const router = express.Router();
const blogController = require('../controllers/blogController');

// Route to display the form for creating a new blog
router.get('/new-blog', blogController.showNewBlogForm);

// Route to handle new blog submission
router.post('/submit-blog', blogController.submitBlog);

// Route to display a specific blog by ID
router.get('/blog/:id', blogController.showBlog);

// Route to update a specific blog by ID
 

router.patch('/update-blog/:id', blogController.updateBlog);

// Route to display saved blogs with pagination
router.delete('/delete-blog/:id', blogController.deleteBlog);



// Route to display saved blogs with pagination
router.get('/getAllBlogs', blogController.getBlogs);



// In routes/blogRoutes.js
router.get('/test', (req, res) => {
    res.send('Test route is working!');
});

module.exports = router;
