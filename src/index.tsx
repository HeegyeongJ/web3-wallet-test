import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {init, Web3OnboardProvider} from "@web3-onboard/react";
import coinbaseWalletModule from "@web3-onboard/coinbase";
import wagmi from '@web3-onboard/wagmi'
import Onboard from '@web3-onboard/core'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const coinbaseWalletSdk = coinbaseWalletModule()
const INFURA_KEY = '2896ff3d0a1143689424a8341cb75c67'
const web3Onboard = Onboard({
    wagmi,
    wallets:[coinbaseWalletSdk],
    chains: [
        {
            // hex encoded string, eg '0x1' for Ethereum Mainnet
            id: '0x1',
            // string indicating chain namespace. Defaults to 'evm' but will allow other chain namespaces in the future
            namespace: 'evm',
            // the native token symbol, eg ETH, BNB, MATIC
            token: 'ETH',
            // used for display, eg Ethereum Mainnet
            label: 'Ethereum Mainnet',
            // used for network requests
            rpcUrl: `https://mainnet.infura.io/v3/${INFURA_KEY}`
        },
        {
            id: 42161,
            token: 'ARB-ETH',
            label: 'Arbitrum One',
            rpcUrl: 'https://rpc.ankr.com/arbitrum'
        },
        {
            id: '0xa4ba',
            token: 'ARB',
            label: 'Arbitrum Nova',
            rpcUrl: 'https://nova.arbitrum.io/rpc'
        },
        {
            id: '0x89',
            token: 'MATIC',
            label: 'Matic Mainnet',
            rpcUrl: 'https://matic-mainnet.chainstacklabs.com'
        },
        {
            id: '0x2105',
            token: 'ETH',
            label: 'Base',
            rpcUrl: 'https://mainnet.base.org'
        },
        {
            id: '0xa4ec',
            token: 'ETH',
            label: 'Celo',
            rpcUrl: 'https://1rpc.io/celo'
        },
        {
            id: 666666666,
            token: 'DEGEN',
            label: 'Degen',
            rpcUrl: 'https://rpc.degen.tips'
        }
    ],
})

root.render(
  <React.StrictMode>
      <Web3OnboardProvider web3Onboard={web3Onboard} >
        <App />
      </Web3OnboardProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
