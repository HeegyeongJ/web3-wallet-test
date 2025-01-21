import React, {useEffect, useState} from 'react';
import {web3EthereumWallet} from "../serviceUtils/web3-wallet";
import {sdk} from "../sdk";

const MetaMask = ({setAccount, availableWallets}: any) => {
    const [metaMaskProvider, setMetaMaskProvider] = useState<any>()
    const connect = async () => {
        const mmWallet = availableWallets.find((wallet: any) => wallet.info.name === 'MetaMask')
        if (mmWallet) {
            const result = await web3EthereumWallet.connect({info: {name: 'MetaMask'}, provider: metaMaskProvider})
            setAccount(result?.address)
            return
        }
        try {
            let hasNavigatedAway = false;

            const handleVisibilityChange = () => {
                if (document.visibilityState === "hidden") {
                    hasNavigatedAway = true;
                }
            };

            document.addEventListener("visibilitychange", handleVisibilityChange);

            const timer = setTimeout(() => {
                if (!hasNavigatedAway) {
                    window.open('https://metamask.app.link/dapp/192.163.0.31.:3000')
                }
            }, 2500);
            await sdk.metaMaskConnect()
            document.removeEventListener("visibilitychange", handleVisibilityChange);
            return timer
        } catch (e) {
            console.error(e)
            alert(e)
        }
    }
    const getProvider = () => {
        const provider = sdk.getMetaMaskProviderFromSDK()
        setMetaMaskProvider(provider)
    }

    useEffect(() => {
        getProvider()
    }, []);
    return (
        <div>
            <button onClick={() => connect()}>metamask connect</button>
        </div>
    );
};

export default MetaMask;