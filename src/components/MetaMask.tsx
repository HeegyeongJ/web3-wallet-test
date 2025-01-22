import React, {useEffect, useState} from 'react';
import {web3EthereumWallet} from "../serviceUtils/web3-wallet";
import {sdk} from "../sdk";
import {checkPlatform} from "../serviceUtils/platformUtils";

const MetaMask = ({setAccount, availableWallets, setWallet, setCurrentChain}: any) => {
    const [metaMaskProvider, setMetaMaskProvider] = useState<any>()
    const connect = async () => {
        const platform = checkPlatform();
        const mmWallet = availableWallets.find((wallet: any) => wallet?.info.name === 'MetaMask')
        if (mmWallet) {
            const result = await web3EthereumWallet.connect({info: {name: 'MetaMask'}, provider: metaMaskProvider})
            setWallet(result.walletName)
            setCurrentChain(result.chainId)
            setAccount(result?.address)
            return
        }
        try {
            if (platform === 'mobile') {
                let hasNavigatedAway = false;

                const handleVisibilityChange = () => {
                    if (document.visibilityState === "hidden") {
                        hasNavigatedAway = true;
                    }
                };

                document.addEventListener("visibilitychange", handleVisibilityChange);

                setTimeout(() => {
                    if (!hasNavigatedAway) {
                        window.open('https://metamask.app.link/dapp/192.163.0.31:3000')
                    }
                }, 2000);
                document.removeEventListener("visibilitychange", handleVisibilityChange);
            }
            await sdk.metaMaskConnect()

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