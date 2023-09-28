import React, { useState } from 'react';

const COHORT_NAME = '2209-FTB-ET-WEB-FT'; 
const BASE_URL = `https://strangers-things.herokuapp.com/api/${COHORT_NAME}`;

const LoginForm = () => {
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

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
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
        // Login successful
        const token = data.data.token; // Extract the JWT token
        console.log('Login successful. Token:', token);
        // Store the token in your app's state or local storage for future authenticated requests.
      } else {
        // Login failed
        console.error('Login failed:', data.error.message);
        // Handle login failure, e.g., display an error message to the user.
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
      // Handle network or other errors here.
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        {/* ... (Username and password input fields) */}
        <div>
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
