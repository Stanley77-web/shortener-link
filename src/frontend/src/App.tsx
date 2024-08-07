import React from 'react';
import './App.css';
import ShortenerLink from './component/shortenerLink';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <h1 style={{
          padding: 0,
          margin: 0,
        }}>Shorten Your Link</h1>
        <p style={{
          padding: 0,
          margin: 0,
        }}>Generate a simpler access for your long link</p>
      </header>
      <ShortenerLink />
    </div>
  );
}

export default App;
