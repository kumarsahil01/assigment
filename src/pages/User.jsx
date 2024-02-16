import React, { useState } from 'react';
import axios from 'axios';
import './User.css'; // Import CSS file for styling
import {Bar} from "react-chartjs-2"

const App = () => {
  const [username, setUsername] = useState('');
  const [userData, setUserData] = useState(null);

  const getUserData = async () => {
    try {
      const response = await axios.get(`https://lichess.org/api/user/${username}`);
      setUserData(response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };
  

  return (
    <div className="container">
      <h1>Lichess User Profile</h1>
      <div className="input-container">
        <input 
          type="text" 
          placeholder="Enter username" 
          value={username} 
          onChange={(e) => setUsername(e.target.value)} 
        />
        <button onClick={getUserData}>Get User Data</button>
      </div>

      {userData && (
        <div className="user-profile">
          <h2>{userData.username}</h2>
          <p>Rating: {userData.perfs.blitz.rating}</p>
          <p>Playtime: {userData.playTime.total}</p>
          <p>Title: {userData.title}</p>
          <p>Currently Streaming: {userData.streaming ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
};

export default App;
