const db = require('../config/db');

// Function to insert a new blog post
const createBlog = async (title, content, author) => {
    const query = 'INSERT INTO blogs (title, content, author_id) VALUES (?, ?, ?)';

    try {
        // Execute the query and wait for the result
        const [result] = await db.query(query, [title, content, author]);
        
        // Return the result with the new blog ID
        return { id: result.insertId };
    } catch (error) {
        // Throw the error to be handled by the caller
        throw error;
    }
};


// Function to get a blog post by ID
const findById = async (id) => {
    const query = 'SELECT * FROM blogs WHERE id = ?';

    try {
        const [results] = await db.query(query, [id]);

        if (results.length > 0) {
            return results[0]; // Return the blog post if found
        } else {
            throw new Error('Blog not found'); // Throw an error if not found
        }
    } catch (error) {
        throw error; // Re-throw the error to be handled by the caller
    }
};

const getAllBlogs = async () => {
    try {
        // Ensure the offset and limit are numbers
       
        // Format the query string directly with LIMIT and OFFSET
        const query = `SELECT * FROM blogs `;
        const [rows] = await db.execute(query);
        return rows;
    } catch (error) {
        throw new Error('Error fetching blogs: ' + error.message);
    }
};

const updateBlog = async (id, title, content) => {
    try {
        // SQL query to update the blog's title and content
        const query = `UPDATE blogs SET title = ?, content = ? WHERE id = ?`;
        
        // Execute the query with the provided parameters
        const [result] = await db.execute(query, [title, content, id]);
        
        // Return the result of the query
        return result;
    } catch (error) {
        // Throw an error if something goes wrong during the update
        throw new Error('Error updating blog: ' + error.message);
    }
};
const deleteBlogById = async (id) => {
    try {
        const query = 'DELETE FROM blogs WHERE id = ?';
        const [result] = await db.execute(query, [id]);
        return result;
    } catch (error) {
        throw new Error('Error deleting blog: ' + error.message);
    }
}; 
module.exports = {
    createBlog,
    findById,
    getAllBlogs,
    updateBlog,
    deleteBlogById

};
