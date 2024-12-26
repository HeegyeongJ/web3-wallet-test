import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import { WagmiProvider} from "wagmi";
import {mainnet, sepolia} from "@wagmi/core/chains";
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {arbitrum, base} from "@reown/appkit/networks";
import {WagmiAdapter} from "@reown/appkit-adapter-wagmi";
import {createAppKit} from "@reown/appkit/react";
import Test from "./Test";
import { useAppKitWallet } from '@reown/appkit-wallet-button/react'
// 0. Setup queryClient
const queryClient = new QueryClient()
// 1. Get projectId from https://cloud.reown.com
const projectId = 'd13d662b32dcf743f8f79327adc3d18c'

// 2. Create a metadata object - optional
const metadata = {
    name: 'test',
    description: 'AppKit Example',
    url: 'https://reown.com/appkit', // origin must match your domain & subdomain
    icons: ['https://assets.reown.com/reown-profile-pic.png']
}

// 3. Set the networks
const networks = [mainnet, arbitrum, base, sepolia]

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
    networks,
    projectId,
});

// 5. Create modal
createAppKit({
    adapters: [wagmiAdapter],
// @ts-ignore
    networks,
    projectId,
    metadata,
})

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

  return (
    <div className="App">

        <WagmiProvider config={wagmiAdapter.wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                <Test/>
            </QueryClientProvider>
        </WagmiProvider>
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
