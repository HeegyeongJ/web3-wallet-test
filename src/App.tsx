import React from 'react';
import logo from './logo.svg';
import './App.css';
import {AppKitProvider} from "./context";


function App() {
  return (
    <div className="App">
      {/* eslint-disable-next-line react/jsx-no-undef */}
        <AppKitProvider/>
        <header className="App-header">d
            <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
