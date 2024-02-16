import React, { useState } from 'react';
import axios from 'axios';

const ComparePlayers = () => {
  const [username1, setUsername1] = useState('');
  const [username2, setUsername2] = useState('');
  const [player1Stats, setPlayer1Stats] = useState(null);
  const [player2Stats, setPlayer2Stats] = useState(null);
  const [count1,setcount1]=useState([])
  const [count2,setcount2]=useState([])

  const [error, setError] = useState(null);

  const getPlayerStats = async (username, setPlayerStats,setcount) => {
    try {
      const response = await axios.get(`https://lichess.org/api/user/${username}`);
      setPlayerStats(response.data);
      setcount(response.data.count)
      console.log(response.data.count)
    } catch (error) {
      console.error(`Error fetching stats for ${username}:`, error);
      setError(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Fetch stats for both players upon form submission
    await getPlayerStats(username1, setPlayer1Stats,setcount1);
    await getPlayerStats(username2, setPlayer2Stats,setcount2);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Player 1 Username:
          <input 
            type="text" 
            value={username1} 
            onChange={(e) => setUsername1(e.target.value)} 
          />
        </label>
        <br />
        <label>
          Player 2 Username:
          <input 
            type="text" 
            value={username2} 
            onChange={(e) => setUsername2(e.target.value)} 
          />
        </label>
        <br />
        <button type="submit">Compare</button>
      </form>

      {error && <p>Error fetching player stats. Please try again later.</p>}

      {/* Display player stats if available */}
      {player1Stats && player2Stats && (
        <div>
          <h2>Player 1 Stats</h2>
          <ul>
            <li>Username: {player1Stats.username}</li>
            <li> Profile Link :<a href='{player1Stats.url}'>link</a></li>
            <li>country: {player1Stats.profile.country}</li>
            <li>location:{player1Stats.profile.location}</li>
          </ul>
          <h2>Player 2 Stats</h2>
          <ul>
            <li>Username: {player2Stats.username}</li>
            <li> Profile Link :<a href='{player1Stats.url}'>link</a></li>
            <li>country: {player2Stats.profile.country}</li>
            <li>location:{player2Stats.profile.location}</li>
            {/* now we cna create stat count from stat data  */}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ComparePlayers;
