import React, { useState } from 'react';
import axios from 'axios';

const History = () => {
  const [username, setUsername] = useState('');
  const [recentGames, setRecentGames] = useState([]);
  const [error, setError] = useState(null);

  const getRecentGames = async () => {
    try {
      const response = await axios.get(`https://lichess.org/api/games/user/${username}`, {
        params: {
          max: 1, // Change the number of games to fetch as needed
          until: Math.floor(Date.now() / 1000) // Fetch games until now
        }
      });
      setRecentGames(response.data);
    } catch (error) {
      console.error('Error fetching recent games:', error);
      if (error.response && error.response.status === 429) {
        // If the error is a 429 (Too Many Requests), retry with exponential backoff
        retryWithExponentialBackoff(getRecentGames);
      } else {
        // If it's another type of error, set the error state
        setError(error);
      }
    }
  };

  const retryWithExponentialBackoff = async (retryFunction, retryCount = 0) => {
    const maxRetries = 5;
    const baseDelay = 1000; // 1 second
    const maxDelay = 60000; // 1 minute

    // Calculate the exponential backoff delay
    const delay = Math.min(baseDelay * 2 ** retryCount, maxDelay);

    // Wait for the delay before retrying
    await new Promise(resolve => setTimeout(resolve, delay));

    // Retry the function
    try {
      await retryFunction();
    } catch (error) {
      console.error('Error on retry attempt:', error);
      if (retryCount < maxRetries) {
        // If there are still retries remaining, retry again with exponential backoff
        retryWithExponentialBackoff(retryFunction, retryCount + 1);
      } else {
        // If all retries are exhausted, set the error state
        setError(error);
      }
    }
  };

  return (
    <div>
      <input 
        type="text" 
        placeholder="Enter username" 
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
      />
      <button onClick={getRecentGames}>Get Recent Games</button>
      
      {error && <p>Error fetching recent games. Please try again later.</p>}
      
      {recentGames.length > 0 && (
        <div>
          <h2>Recent Games</h2>
          <ul>
            {recentGames.map((game, index) => (
              <li key={index}>
                <p>Opponent: {game.players.white.user.username === username ? game.players.black.user.username : game.players.white.user.username}</p>
                <p>Score: {game.status === 'draw' ? 'Draw' : game.winner === username ? 'Win' : 'Loss'}</p>
                <p>Duration: {game.duration}</p>
                {/* Display more game details as needed */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default History;
