import React from 'react'
import logo from './logo.svg';
import './App.css';

import Users from './components/Users';

function App() {
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
        <div style={{width: '50%', height: 200, marginTop: '1em', overflow: 'auto'}}>
          <Users page={1} count={10} />
        </div>
      </header>
    </div>
  );
}

export default App;
