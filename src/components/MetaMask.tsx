import React, {useEffect, useState} from 'react';
import {web3EthereumWallet} from "../serviceUtils/web3-wallet";
import {sdk} from "../sdk";
import {checkPlatform} from "../serviceUtils/platformUtils";
import {Wallet} from "../serviceUtils/web3-wallet/index.type";

const MetaMask = ({setAccount, availableWallets, setWallet, setCurrentChain}: any) => {
    const [metaMaskProvider, setMetaMaskProvider] = useState<any>()
    const connect = async () => {
        const platform = checkPlatform();
        const mmWallet = availableWallets.find((wallet: any) => wallet?.info.name === 'MetaMask')
        if (mmWallet) {
            const result = await web3EthereumWallet.connect(Wallet.metamask)
            setWallet(result.walletName)
            setCurrentChain(result.chainId)
            setAccount(result?.address)
            return
        }
        try {
            console.log(1111111111)
            const result = await web3EthereumWallet.connect(Wallet.metamask)
            if (platform === 'mobile') {
                if (!result) {
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
                    }, 2500);
                    document.removeEventListener("visibilitychange", handleVisibilityChange);
                }

            }


            setWallet(result.walletName)
            setCurrentChain(result.chainId)
            setAccount(result?.address)
        } catch (e) {
            console.error(e)
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