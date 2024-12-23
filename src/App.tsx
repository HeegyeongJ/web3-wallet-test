import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {AppKitProvider} from "./context";
import {ethers} from "ethers";
import EthereumProvider from "@walletconnect/ethereum-provider";
import {useAppKit, useAppKitAccount, useAppKitTheme} from "@reown/appkit/react";
import {useDisconnect, useSignMessage, useSignTypedData, useChainId} from "wagmi";
const projectId = 'd13d662b32dcf743f8f79327adc3d18c';



function App() {
    // const [provider, setProvider] = useState<any>()
    // const [connected, setConnected] = useState(false);
    // const [balance, setBalance] = useState<any>();
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
    //     const getBalance = async () => {
    //         const balanceFromEthers = await ethersWeb3Provider
    //             .getBalance(provider.accounts[0])
    //         // const remainder =  await balanceFromEthers.mod(1e14);
    //         setBalance(balanceFromEthers);
    //     };
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
    //                 <button onClick={getBalance}>Balance</button>
    //                 <button onClick={refresh}>Refresh</button>
    //                 <p>
    //                     balance: {balance ? `${balance} ETH` : `click "Balance" to fetch`}
    //                 </p>
    //             </>
    //         );
    //     }
    //     return <button onClick={connect}>Connect with ethereum-provider</button>;
    // }
    const {signMessageAsync} = useSignMessage()
    const {signTypedData, failureReason} = useSignTypedData()

    const appkit = useAppKit()
    const {disconnect, error: isError} = useDisconnect()
    const chainId = useChainId()
    console.log('wagmi chainId', chainId)
    console.log('current chainId', window.ethereum?.chainId)
    console.log('failReason', failureReason)

  return (
    <div className="App">
      {/* eslint-disable-next-line react/jsx-no-undef */}
        <AppKitProvider>
            <button onClick={() => {
                signTypedData({
                    types: {
                        Person: [
                            {name: 'name', type: 'string'},
                            {name: 'wallet', type: 'address'},
                        ],
                        Mail: [
                            {name: 'from', type: 'Person'},
                            {name: 'to', type: 'Person'},
                            {name: 'contents', type: 'string'},
                        ],
                    },
                    primaryType: 'Mail',
                    message: {
                        from: {
                            name: 'Cow',
                            wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
                        },
                        to: {
                            name: 'Bob',
                            wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
                        },
                        contents: 'Hello, Bob!',
                    },
                })
            }}>Sign Typed Data</button>
        <button onClick={async () => await disconnect}>disconnect</button>
            <button onClick={async() => await signMessageAsync({message: 'hellooooooo'})}>Sign Message</button>
            <button onClick={() =>   appkit.open()}>click</button>
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
