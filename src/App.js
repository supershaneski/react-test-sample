import logo from './logo.svg';
import './App.css';

import Button from './components/Button';

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
        <div style={{width: '50%'}}>
        <Button onClick={() => console.log('button click')}>Click Me</Button>
        </div>
      </header>
    </div>
  );
}

export default App;
