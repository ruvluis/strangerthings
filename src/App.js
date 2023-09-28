import React, { useState } from 'react';
import logo from './logo.svg';
import LoginForm from './components/LoginForm';
import MessageForm from './components/MessageForm';
import PostForm from './components/PostForm';
import PostsView from './components/PostsView';
import RegistrationForm from './components/RegistrationForm';
import './App.css';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [authToken, setAuthToken] = useState(''); // Replace with your actual auth token
  const [postId, setPostId] = useState(''); // Replace with the desired post ID

  const handleLogin = (token) => {
    setAuthToken(token);
    setLoggedIn(true);
  };

  const handleLogout = () => {
    setAuthToken('');
    setLoggedIn(false);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>

        {loggedIn ? (
          <div>
            <MessageForm authToken={authToken} />
            <PostForm authToken={authToken} />
            <PostsView authToken={authToken} setPostId={setPostId} />
            <RegistrationForm onLogout={handleLogout} />
          </div>
        ) : (
          <LoginForm onLogin={handleLogin} />
        )}
      </header>
    </div>
  );
}

export default App;



