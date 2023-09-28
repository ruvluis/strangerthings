import React, { useState, useEffect } from 'react';

const COHORT_NAME = '2209-FTB-ET-WEB-FT';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

const PostView = ({ postId, authToken }) => { // Accept authToken as a prop
  const [post, setPost] = useState({});
  const [formData, setFormData] = useState({
    content: '',
  });

  const fetchPostDetails = async () => {
    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}`);
      const data = await response.json();
      if (data.success) {
        setPost(data.data.post);
      } else {
        console.error('Failed to fetch post details:', data.error.message);
      }
    } catch (error) {
      console.error('An error occurred while fetching post details:', error);
    }
  };

  useEffect(() => {
    fetchPostDetails();
  }, [postId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/posts/${postId}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}` // Use authToken prop
        },
        body: JSON.stringify({
          message: {
            content: formData.content,
          },
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log('Message sent:', data.data.message);
      } else {
        console.error('Message send failed:', data.error.message);
      }
    } catch (error) {
      console.error('An error occurred during message send:', error);
    }
  };

  return (
    <div>
      {/* Display post details here */}
      <h2>{post.title}</h2>
      <p>{post.description}</p>

      {/* Message creation form */}
      <h3>Send Message</h3>
      <form onSubmit={handleSendMessage}>
        <div>
          <label htmlFor="content">Message Content:</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <button type="submit">Send Message</button>
        </div>
      </form>
    </div>
  );
};

export default PostView;

