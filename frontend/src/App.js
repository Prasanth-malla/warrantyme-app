import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/editor" element={<Editor />} />
      </Routes>
    </Router>
  );
}

const Home = () => {
  return (
    <div>
      <h1>Welcome to Letter Editor</h1>
      <a href="https://warrantyme-backend.vercel.app/auth/google">Sign In with Google</a>
    </div>
  );
};

const Callback = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get('token');
    const accessToken = urlParams.get('accessToken');
    if (token && accessToken) {
      localStorage.setItem('token', token);
      localStorage.setItem('accessToken', accessToken);
      navigate('/editor');
    }
  }, [navigate]);
  return <div>Logging you in...</div>;
};

const Editor = () => {
  const [content, setContent] = useState('');
  const accessToken = localStorage.getItem('accessToken');

  const saveToDrive = async () => {
    try {
      const response = await axios.post('https://warrantyme-backend.vercel.app/save-letter', {
        accessToken,
        content
      });
      alert(`Saved to Drive! File ID: ${response.data.fileId}`);
    } catch (error) {
      console.error('Error saving to Drive:', error);
      alert('Failed to save to Drive: ' + error.message);
    }
  };

  return (
    <div>
      <h1>Letter Editor</h1>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows="10"
        cols="50"
        placeholder="Write your letter here..."
      />
      <br />
      <button onClick={saveToDrive}>Save to Google Drive</button>
    </div>
  );
};

export default App;