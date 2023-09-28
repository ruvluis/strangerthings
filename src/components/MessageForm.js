import React, { useState } from 'react';

const COHORT_NAME = '2209-FTB-ET-WEB-FT'; 
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

const MessageForm = ({ authToken }) => { // Accept authToken as a prop
  const [formData, setFormData] = useState({
    content: '',
  });

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
      const response = await fetch(`${BASE_URL}/messages`, {
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
      <h2>Send Message</h2>
      <form onSubmit={handleSendMessage}>
        {/* ... (Message content input field) */}
        <div>
          <button type="submit">Send Message</button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;


