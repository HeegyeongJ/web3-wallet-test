import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {ethers} from "ethers";
import {Web3} from "web3";
import {Account} from "viem";
import {web3EthereumWallet} from "./serviceUtils/web3-wallet";
import MetaMask from "./components/MetaMask";
import Coinbase from "./components/Coinbase";


function App() {
    const [web3, setWeb3] = useState<any>();
    const [account, setAccount] = useState<any>();
    const [provider, setProvider] = useState<any>();
    const [balance, setBalance] = useState<string | bigint>('none');
    const [availableWallets, setAvailableWallets] = useState<any>([]);
    const [currentWallet, setCurrentWallet] = useState<any>('none');

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
    // const connectCoinBase = async () => {
    //     let web3: any;
    //     await Web3.requestEIP6963Providers().then(res => {
    //         for (const [key, value] of res) {
    //             console.log(value);
    //             if (value.info.name.includes('Coinbase')) {
    //                 web3 = new Web3(value.provider);
    //                 console.log('hhhhhhhhhhhhh', value.info)
    //                 setProvider(value.provider)
    //                 setWeb3(web3)
    //             }
    //         }
    //     })
    //     try {
    //         const result = await web3?.eth.requestAccounts()
    //         setAccount(result[0])
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

    // const sendTransaction = async () => {
    //     try {
    //         const transaction = {
    //             to: "0x51F6661CAB4553d8434F005E06314A5cD4d00A27",
    //             from: account,
    //             value: "0",
    //         }
    //         console.log(1111)
    //         const result = await web3?.eth.sendTransaction(transaction)
    //         console.log(result)
    //     } catch (e) {
    //         console.log(e)
    //     }
    // }

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
            setCurrentWallet('none')
            setBalance('none')
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
        // const result = await web3?.eth.getBalance(account)
        try {
            const result = await web3EthereumWallet.getBalance(account)
            if (typeof result === 'undefined') {
                setBalance('none')
                return
            }
            setBalance(result)
        } catch (e) {
            console.error(e)
        }

    }

    const onSigning = async () => {
        // const result = await web3?.eth.personal.sign('bye', account, '')
        console.log('ac', account)
        const result = await web3EthereumWallet.signMessage('aaaaaaa', account)
        console.log(result)
    }

    // const changeChain = async () => {
    //     const result = await web3.currentProvider.request({
    //         method: 'wallet_switchEthereumChain',
    //         // params: [{chainId: web3.utils.toHex(43114)}]
    //         params: [{chainId: new Web3().utils.toHex(1)}]
    //     })
    //     console.log(result)
    // }

    const getDetectedWallets = async () => {
        const result = await web3EthereumWallet.getAvailableWallets()
        console.log(result)
        // if (result) {
        //     setAvailableWallets(result)
        // }
    }

    const getCurrentWallet = () => {
        setCurrentWallet(web3EthereumWallet.walletName ?? 'none')
    }

    useEffect(() => {
        getBalance()
        getDetectedWallets()
        getCurrentWallet()
    }, [account]);

    console.log(availableWallets)
    const connectWallet = async (name: string) => {

        const compareName = name.trim().toLowerCase()
        availableWallets.map(async (item: any) => {
            console.log(item)
            if (item.info.name.trim().toLowerCase().includes(compareName)) {
                const connect = await web3EthereumWallet.connect(item)
                setAccount(connect?.address)
                setWeb3(connect?.web3)
            }
        })
    }

    const deployContract = async () => {
        const contractBytecode = '0x608060405234801561001057600080fd5b50610164806100206000396000f3fe60806040526004361061004f5760003560e01c806360fe47b1146100545780636d4ce63c1461007a575b600080fd5b34801561006057600080fd5b506100796004803603602081101561007657600080fd5b5035610098565b005b34801561008657600080fd5b5061008f6100b0565b60405161009c919061010a565b60405180910390f35b8060008190555050565b6000819050919050565b6100be816100ab565b81146100c957600080fd5b50565b6000813590506100db816100b5565b92915050565b6000602082840312156100f7576100f66100a6565b5b6000610105848285016100cc565b91505092915050565b610117816100ab565b82525050565b6000602082019050610132600083018461010e565b92915050565b6000819050919050565b61014a81610137565b811461015557600080fd5b5056fea26469706673582212204b805c8699dfbe7f0ffadb4a5e13d11c258f82a7d007b57eeb29e38a3f01e7ea64736f6c634300080a0033';
        const abi = [
            {
                "inputs": [],
                "stateMutability": "nonpayable",
                "type": "constructor"
            },
            {
                "inputs": [],
                "name": "get",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            },
            {
                "inputs": [
                    {
                        "internalType": "uint256",
                        "name": "x",
                        "type": "uint256"
                    }
                ],
                "name": "set",
                "outputs": [],
                "stateMutability": "nonpayable",
                "type": "function"
            },
            {
                "inputs": [],
                "name": "storedData",
                "outputs": [
                    {
                        "internalType": "uint256",
                        "name": "",
                        "type": "uint256"
                    }
                ],
                "stateMutability": "view",
                "type": "function"
            }
        ];
        try {
            const tx = await web3EthereumWallet.deployContract(abi, contractBytecode)
            console.log(tx)
        } catch (e) {
            console.error(e)
        }
    }

    return (
        <div>
            <div>
                <button onClick={async () => {
                    // await connectTrust()
                    await connectWallet('Trust')
                }}>trust connect
                </button>
                <MetaMask availableWallets={availableWallets} setAccount={(address: string) => setAccount(address)}/>
                <Coinbase/>
            </div>
            <div>balance: {balance}</div>
            <div>current wallet: {currentWallet}</div>
            <div>
                <button onClick={() => disconnect()}>disconnect</button>
                <button onClick={() => onSigning()}>sign</button>
                <button onClick={async () => {
                    // changeChain()
                    let web3 = new Web3()
                    try {
                        // await web3EthereumWallet.changeEthereumChainById(new Web3().utils.toHex(1))
                        const result = await web3EthereumWallet.changeEthereumChainById(web3.utils.toHex(43114))
                        console.log(result)
                    } catch (e) {
                        console.log(333)
                        await web3EthereumWallet.addEthereumChain([{
                            chainName: 'Avalanche Network',
                            rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
                            chainId: new Web3().utils.toHex(43114),
                            nativeCurrency: {
                                name: 'AVAX',
                                decimals: 18,
                                symbol: 'AVAX'
                            }
                        }])
                        console.log(4444, 'change')
                    }
                }}>change chain to avalanche
                </button>
                <button onClick={async () => {
                    // changeChain()
                    try {
                        const result = await web3EthereumWallet.changeEthereumChainById(new Web3().utils.toHex(1))
                        console.log(result)
                    } catch (e) {
                        console.log(4444, false)
                    }
                }}>change chain to ethereum
                </button>
                <button onClick={() => deployContract()}>deploy</button>
            </div>
        </div>
    );
}

export default App;
