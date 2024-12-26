import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import {useAccountCenter, useConnectWallet, useWagmiConfig} from "@web3-onboard/react";
import {signMessage} from "@web3-onboard/wagmi";
import {WagmiConfig} from "@web3-onboard/core/dist/types";

function App() {
    const [{wallet, connecting}, connect] = useConnectWallet()
        const wagmiConfig = useWagmiConfig() as WagmiConfig
    console.log('wagmi', wagmiConfig)
    const signMessages = async () => {
        try{
            await signMessage(wagmiConfig, {
                message: 'heelelldlldl',
                connector: wallet?.wagmiConnector
            })
        }catch (e){
            console.log('error',e)
        }
    }


    return (
    <div className="App">
      {/* eslint-disable-next-line react/jsx-no-undef */}
        <button onClick={() => connect()}>click</button>
        <button onClick={() => signMessages()}>signing message</button>
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
