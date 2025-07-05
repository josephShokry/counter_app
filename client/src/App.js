import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [counter, setCounter] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch initial counter value
  useEffect(() => {
    fetchCounter();
  }, []);

  const fetchCounter = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/counter');
      if (!response.ok) {
        throw new Error('Failed to fetch counter');
      }
      const data = await response.json();
      setCounter(data.counter);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const incrementCounter = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/counter/increment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to increment counter');
      }
      const data = await response.json();
      setCounter(data.counter);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const resetCounter = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await fetch('/api/counter/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to reset counter');
      }
      const data = await response.json();
      setCounter(data.counter);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Counter App</h1>
        
        <div className="counter-section">
          <div className="counter-display">
            <span className="counter-value">{counter}</span>
          </div>
          
          {error && (
            <div className="error-message">
              Error: {error}
            </div>
          )}
          
          <div className="button-group">
            <button 
              className="increment-btn"
              onClick={incrementCounter}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Increment Counter'}
            </button>
            
            <button 
              className="reset-btn"
              onClick={resetCounter}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Reset Counter'}
            </button>
            
            <button 
              className="refresh-btn"
              onClick={fetchCounter}
              disabled={loading}
            >
              {loading ? 'Loading...' : 'Refresh'}
            </button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;