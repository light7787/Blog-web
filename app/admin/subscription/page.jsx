"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Page = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlog = async () => {
    try {
      const response = await axios.get('/api/email');
      console.log(response.data);
      setBlogs(response.data.data); // Update to access the 'data' array within the response
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  }

  useEffect(() => {
    fetchBlog();
  }, []);

  return (
    <div>
      {blogs.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog) => (
              <tr key={blog._id}>
                <td>{blog._id}</td>
                <td>{blog.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>No blogs available</div>
      )}
    </div>
  );
}

export default Page;
