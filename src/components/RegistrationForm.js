import React, { useState } from 'react';

const COHORT_NAME = '2209-FTB-ET-WEB-FT';
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/users/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user: {
            username: formData.username,
            password: formData.password,
          },
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Registration successful
        const token = data.data.token; // Extract the JWT token
        console.log('Registration successful. Token:', token);
        // Store the token in your app's state or local storage for future authenticated requests.
      } else {
        // Registration failed
        console.error('Registration failed:', data.error.message);
        // Handle registration failure, e.g., display an error message to the user.
      }
    } catch (error) {
      console.error('An error occurred during registration:', error);
      // Handle network or other errors here.
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegistration}>
        {/* ... (Username and password input fields) */}
        <div>
          <button type="submit">Register</button>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;

