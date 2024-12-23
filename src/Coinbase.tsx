import React, { useState } from 'react';
import {createCoinbaseWalletSDK} from '@coinbase/wallet-sdk';
import { ethers } from 'ethers';

const Coinbase = () => {
    const [provider, setProvider] = useState<any>();
    const [account, setAccount] = useState<any>(null);

    const connectWallet = async () => {
        try {

            const sdk = createCoinbaseWalletSDK({
                appName: "My App",
                appLogoUrl: "https://example.com/logo.png",
                appChainIds: [8453],
                preference: {
                    options: "smartWalletOnly",
                    attribution: {
                        auto: true,
                    }
                },
            });
            const provider = sdk.getProvider();
            const addresses = provider.request({ method: 'eth_requestAccounts' });
            setAccount(addresses)
        } catch (error) {
            console.error('Connection failed:', error);
        }
    };

    return (
        <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <h1>Coinbase Wallet Connect</h1>
            {account ? (
                <p>Connected Account: {account}</p>
            ) : (
                <button
                    onClick={connectWallet}
                    style={{
                        padding: '10px 20px',
                        fontSize: '16px',
                        backgroundColor: '#0052ff',
                        color: '#fff',
                        border: 'none',
                        borderRadius: '5px',
                        cursor: 'pointer',
                    }}
                >
                    Connect Coinbase Wallet
                </button>
            )}
        </div>
    );
};

export default Coinbase;
