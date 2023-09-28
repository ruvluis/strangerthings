import React, { useState } from 'react';

const COHORT_NAME = '2209-FTB-ET-WEB-FT'; 
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

const PostForm = ({ authToken }) => { 
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    willDeliver: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handlePostItem = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}` // Use authToken prop
        },
        body: JSON.stringify({
          post: {
            title: formData.title,
            description: formData.description,
            price: formData.price,
            location: formData.location,
            willDeliver: formData.willDeliver,
          },
        }),
      });

      const data = await response.json();

      if (data.success) {
        console.log('Post created:', data.data.post);
      } else {
        console.error('Post creation failed:', data.error.message);
      }
    } catch (error) {
      console.error('An error occurred during post creation:', error);
    }
  };

  return (
    <div>
      <h2>Create Post</h2>
      <form onSubmit={handlePostItem}>
        {/* ... (Post-related input fields) */}
        <div>
          <button type="submit">Create Post</button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;

