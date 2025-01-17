import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {ethers} from "ethers";
import {Web3} from "web3";
import {Account} from "viem";
import {web3EthereumWallet} from "./serviceUtils/web3-wallet";


function App() {
    const [web3, setWeb3] = useState<any>();
    const [account, setAccount] = useState<any>(null);
    const [provider, setProvider] = useState<any>();
    const [balance, setBalance] = useState<number>(0);

    const metaMaskRef = useRef(null)
    const connectMetaMask = async () => {
        let web3: any;
        await Web3.requestEIP6963Providers().then(res => {
            for (const [key, value] of res) {
                console.log(value)
                if (value.info.name.includes('Meta')) {
                    console.log(22)
                    console.log(value.info)
                    web3 = new Web3(value.provider);
                    setProvider(value.provider)
                    setWeb3(web3);
                }
            }
        })
        try {
            const result = await web3?.eth.requestAccounts()
            console.log(result)
            setAccount(result[0])
        } catch (e) {
            console.log(e)
        }
    }

    const connectTrust = async () => {
        const windows = window as any
        console.log(windows.trustWallet)
        try {
            const ethereumProvider = windows.trustWallet as any
            // console.log(ethereumProvider.coinbaseWalletExtension)
            // await ethereumProvider.request({
            //     method: "eth_requestAccounts",
            // })
            const web3 = new Web3(ethereumProvider)
            const result = await web3.eth.requestAccounts()
            setWeb3(web3)
            setProvider(ethereumProvider)
            setAccount(result[0])
        } catch (e) {
            console.log(new Error('connection failed'))
        }
    }
    const connectCoinBase = async () => {
        let web3: any;
        await Web3.requestEIP6963Providers().then(res => {
            for (const [key, value] of res) {
                console.log(value);
                if (value.info.name.includes('Coinbase')) {
                    web3 = new Web3(value.provider);
                    console.log('hhhhhhhhhhhhh', value.info)
                    setProvider(value.provider)
                    setWeb3(web3)
                }
            }
        })
        try {
            const result = await web3?.eth.requestAccounts()
            setAccount(result[0])
        } catch (e) {
            console.log(e)
        }
    }

    const sendTransaction = async () => {
        try {
            const transaction = {
                to: "0x51F6661CAB4553d8434F005E06314A5cD4d00A27",
                from: account,
                value: "0",
            }
            console.log(1111)
            const result = await web3?.eth.sendTransaction(transaction)
            console.log(result)
        } catch (e) {
            console.log(e)
        }

    }
    const disconnect = async () => {
        // coinbase 지원 안함
        try {
            // if(web3.currentProvider.disconnect){
            //
            //     await web3.currentProvider.disconnect()
            // }
            await web3EthereumWallet.disconnect()
            // const result = await provider.request({
            //     method: "wallet_revokePermissions",
            //     params: [
            //         {
            //             eth_accounts: account
            //         }
            //     ],
            // })
        } catch (e) {
            console.log(e)
        }
    }

    const test = async () => {

        try {
            const result = await web3?.eth.getBalance(account[0])
            console.log(result)
        } catch (e) {
            console.log(e)
        }
    }

    web3?.provider.on('accountsChanged', (account: string) => {
        console.log(11111, account)
    })
    web3?.provider.on('chainChanged', (chain: string) => {
        console.log(22222, chain)
    })
    web3?.provider.on('disconnect', async (err: any) => {
        console.log(999999999999999, err)
    })

    const getBalance = async () => {
        const result = await web3?.eth.getBalance(account)
        setBalance(result)
    }

    const onSigning = async () => {
        // const result = await web3?.eth.personal.sign('bye', account, '')
        console.log('ac', account)
        const result = await web3EthereumWallet.signMessage('aaaaaaa', account)
        console.log(result)
    }

    const changeChain = async () => {
        const result = await web3.currentProvider.request({
            method: 'wallet_switchEthereumChain',
            // params: [{chainId: web3.utils.toHex(43114)}]
            params: [{chainId: new Web3().utils.toHex(1)}]
        })
        console.log(result)
    }

    const getDetectedWallets = async () => {
        const result = await web3EthereumWallet.getAvailableWallets()
        console.log(result)
    }

    useEffect(() => {
        getBalance()
        getDetectedWallets()
    }, [account]);

    const connectWallet = async (name: string) => {
        const result = await web3EthereumWallet.getAvailableWallets()
        const compareName = name.trim().toLowerCase()
        result.map(async (item) => {
            if (item.info.name.trim().toLowerCase().includes(compareName)) {
                const connect = await web3EthereumWallet.connect(item)
                setAccount(connect?.address)
            }
        })
    }
    return (
        <div>
            <button onClick={async () => {
                // connectMetaMask()
                await connectWallet('MetaMask')
            }} ref={metaMaskRef}>metamask
            </button>
            <button onClick={async () => {
                // connectTrust()
                await connectWallet('Trust Wallet')
            }}>trust
            </button>
            <button onClick={async () => {
                // await connectCoinBase()
                await connectWallet('coinbase')
            }}>coinbase
            </button>
            <button onClick={() => sendTransaction()}>send Transaction</button>
            <button onClick={() => disconnect()}>disconnect</button>
            <button onClick={() => test()}>test</button>
            <button onClick={() => onSigning()}>sign</button>
            <button onClick={async () => {
                // changeChain()
                try {
                    await web3EthereumWallet.changeEthereumChainById(new Web3().utils.toHex(1))
                    // await web3EthereumWallet.changeEthereumChainById(new Web3().utils.toHex(43114))
                    console.log(3123123123)
                } catch (e) {
                    console.log(333)
                    await web3EthereumWallet.addEthereumChain([{
                        chainName: 'EQBR',
                        rpcUrls: ["https://socket-ag.eqhub.eqbr.com?socketKey=61Nsv25-UFzF4TH0gOV2n4kYamGxsq9_-NTOUyTIPjk"],
                        chainId: new Web3().utils.toHex(43161),
                        nativeCurrency: {
                            name: 'EQBR',
                            decimals: 18,
                            symbol: 'EQBR'
                        }
                    }])
                    console.log(4444)
                }
            }}>change chain to avalanche
            </button>
            <button onClick={async () => {
                await connectWallet('zerion')
            }}>zerion
            </button>
            <div>balance: {balance}</div>
        </div>
    );
}

export default App;
