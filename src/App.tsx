import React, {useEffect} from 'react';
import logo from './logo.svg';
import './App.css';
import Onboard from '@web3-onboard/core'
import coinbaseWalletModule from '@web3-onboard/coinbase'

const main = async () => {
    const coinbaseWalletSdk = coinbaseWalletModule()
    const chains = [
        {
            id: 1,
            token: 'ETH',
            label: 'Ethereum Mainnet',
            rpcUrl: 'https://mainnet.infura.io/v3/${INFURA_ID}'
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
            id: 137,
            token: 'MATIC',
            label: 'Matic Mainnet',
            rpcUrl: 'https://matic-mainnet.chainstacklabs.com'
        },
        {
            id: '0x2105',
            token: 'ETH',
            label: 'Base',
            rpcUrl: 'https://mainnet.base.org'
        }
    ]
    const onboard = Onboard({
        chains,
        wallets: [
            coinbaseWalletSdk
        ]
    })

    const connectedWallets = await onboard.connectWallet()
    console.log(connectedWallets)
}


function App() {
    useEffect(() => {
        main()
    }, []);
  return (
    <div className="App">
      {/* eslint-disable-next-line react/jsx-no-undef */}
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
