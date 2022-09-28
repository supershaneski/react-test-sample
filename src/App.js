import React from 'react'
import logo from './logo.svg';
import './App.css';

import Users from './components/Users';

const DataFlux = () => {
  const [data, setData] = React.useState((new Date()).toLocaleTimeString())
  React.useEffect(() => {
    const flux = setInterval(() => {
      setData((new Date()).toLocaleTimeString())
    }, 1000)
    return () => {
      clearInterval(flux)
    }
  }, [])
  return (
    <span style={{
      fontSize: '1em',
      color: '#FFF'
    }}>{data}</span>
  )
}

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
        <div><DataFlux /></div>
        <div style={{width: '50%', height: 200, marginTop: '1em', overflow: 'auto'}}>
          <Users page={1} count={10} />
        </div>
      </header>
    </div>
  );
}

export default App;
