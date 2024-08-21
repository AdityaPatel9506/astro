const Blog = require('../models/blogModel');

// Show the form for creating a new blog
exports.showNewBlogForm = (req, res) => {
    res.render('newBlog'); // Ensure you have a view named 'newBlog'
};

exports.getBlogs = async(req,res) =>{
    try {
        console.log("get blogs called");
     
        
        // Fetch the blog post by ID
        const blog = await Blog.getAllBlogs();

        // Check if the blog post was found
        if (blog) {
            // Render the 'showBlog' view with the blog data
            res.send({ blog });
        } else {
            // Respond with a 404 status if the blog post is not found
            res.status(404).send('Blog not found');
        }
    } catch (error) {
        // Respond with a 400 status and the error message if an exception occurs
        res.status(400).send('Error fetching blog: ' + error.message);
    }
}


// Handle new blog submission
exports.submitBlog = async (req, res) => {
    const { title, content, author_id } = req.body;

    try {
        // Call createBlog and await the result
        const result = await Blog.createBlog(title, content, author_id);
        
        // Respond with a success message and the new blog ID
        res.status(201).json({
            message: 'Blog created successfully',
            id: result.id
        });
    } catch (err) {
        // Handle errors and send a response with a 400 status code
        res.status(400).send('Error saving blog: ' + err.message);
    }
};

// Display a specific blog by ID
exports.showBlog = async (req, res) => {
    try {
        // Extract the blog ID from the request parameters
        const blogId = req.params.id;
        
        // Fetch the blog post by ID
        const blog = await Blog.findById(blogId);

        // Check if the blog post was found
        if (blog) {
            // Render the 'showBlog' view with the blog data
            res.send({ blog });
        } else {
            // Respond with a 404 status if the blog post is not found
            res.status(404).send('Blog not found');
        }
    } catch (error) {
        // Respond with a 400 status and the error message if an exception occurs
        res.status(400).send('Error fetching blog: ' + error.message);
    }
};

// Controller function to update a blog's title and content

exports.updateBlog = async (req, res) => {
    try {
  
        const blogId = req.params.id;

        // Get the title and content from the request body
        const { title, content } = req.body;

        // Check if both title and content are provided
        if (!title || !content) {
            return res.status(400).json({ message: 'Title and content are required' });
        }

        // Call the model method to update the blog
        const result = await Blog.updateBlog(blogId, title, content);

        // Check if the blog was found and updated
        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        // Respond with a success message
        res.status(200).json({
            message: 'Blog updated successfully',
            updatedBlog: {
                id: blogId,
                title: title,
                content: content
            }
        });
    } catch (error) {
        // Handle any errors that occur during the update
        res.status(500).json({ message: 'Error updating blog: ' + error.message });
    }
};

exports.deleteBlog = async (req, res) => {
    try {
        const blogId = req.params.id; // Get the blog ID from the URL parameters

        // Call the delete method from the Blog model
        const result = await Blog.deleteBlogById(blogId);

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting blog: ' + error.message });
    }
};