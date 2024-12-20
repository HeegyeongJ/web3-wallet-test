import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {AppKitProvider} from "./context";
import {ethers} from "ethers";
import EthereumProvider from "@walletconnect/ethereum-provider";
import {useAppKit, useAppKitAccount, useAppKitTheme} from "@reown/appkit/react";
const projectId = 'd13d662b32dcf743f8f79327adc3d18c';



function App() {
    // const [provider, setProvider] = useState<any>()
    // const [connected, setConnected] = useState(false);
    // const [balance, setBalance] = useState<string | null>(null);
    // const initProvider  = async () => {
    //     const provider =  await EthereumProvider.init({
    //         projectId,
    //         chains: [1],
    //         methods: ["personal_sign", "eth_sendTransaction"],
    //         showQrModal: true,
    //         qrModalOptions: {
    //             themeMode: "light",
    //         },
    //     });
    //     setProvider(provider)
    // }
    //
    // useEffect(() => {
    //     initProvider()
    // },[])
    // // 1. Create a new EthereumProvider instance
    //
    // if(provider){
    //     provider.on("display_uri", (uri: string) => {
    //         console.log("display_uri", uri);
    //     });
    //
    // // 2. Pass the provider to ethers.js
    //     const ethersWeb3Provider = new ethers.BrowserProvider(provider);
    //
    //     // 3. Handle Connect
    //     const connect = () => {
    //         provider.connect().then(() => {
    //             setConnected(true);
    //         });
    //     };
    //
    //
    //
    //     // 4. Fetch Balance on click with ethers.js
    //     // const getBalance = async () => {
    //     //     const balanceFromEthers = await ethersWeb3Provider
    //     //         .getSigner(provider.accounts[0])
    //     //         .getBalance();
    //     //     const remainder = balanceFromEthers.mod(1e14);
    //     //     setBalance(ethers.utils.formatEther(balanceFromEthers.sub(remainder)));
    //     // };
    //
    //     // 5. Handle Disconnect
    //     const refresh = () => {
    //         provider.disconnect();
    //         window.localStorage.clear();
    //         setConnected(false);
    //     };
    //     if (connected) {
    //         return (
    //             <>
    //                 {/*<button onClick={getBalance}>Balance</button>*/}
    //                 <button onClick={refresh}>Refresh</button>
    //                 <p>
    //                     balance: {balance ? `${balance} ETH` : `click "Balance" to fetch`}
    //                 </p>
    //             </>
    //         );
    //     }
    //     return <button onClick={connect}>Connect with ethereum-provider</button>;
    // }
    const appkit = useAppKit()
    appkit.open()
    const {setThemeMode, setThemeVariables} = useAppKitTheme()
    setThemeMode('light')
    setThemeVariables({
        '--w3m-color-mix': '#00BB7F',
    })

  return (
    <div className="App">
      {/* eslint-disable-next-line react/jsx-no-undef */}
        <AppKitProvider>
            <button>click</button>
        </AppKitProvider>
        <header className="App-header">
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
