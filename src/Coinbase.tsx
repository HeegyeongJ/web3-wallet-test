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
        <div>
            {account ? (
                <p>Connected Account: {account}</p>
            ) : (
                <button onClick={() => connectWallet()}>
                    Connect Coinbase Wallet
                </button>
            )}
        </div>
    );
};

export default Coinbase;
