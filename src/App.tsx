import React, {useEffect, useRef, useState} from 'react';
import './App.css';
import {ethers} from "ethers";
import {Web3} from "web3";
import {Account} from "viem";
import {web3EthereumWallet} from "./serviceUtils/web3-wallet";
import MetaMask from "./components/MetaMask";
import Coinbase from "./components/Coinbase";
import {eip712, USDT_ABI, USDT_CONTRACT_ADDRESS} from "./example";


function App() {
    const [account, setAccount] = useState<any>();
    const [amount, setAmount] = useState(0);
    const [balance, setBalance] = useState<string | bigint>('none');
    const [availableWallets, setAvailableWallets] = useState<any>([]);
    const [currentChain, setCurrentChain] = useState<string>('none');
    const [wallet, setWallet] = useState<any>('none')

    const connectMetaMask = async () => {
        let web3: any;
        await Web3.requestEIP6963Providers().then(res => {
            for (const [key, value] of res) {
                console.log(value)
                if (value.info.name.includes('Meta')) {
                    console.log(22)
                    console.log(value.info)
                    web3 = new Web3(value.provider);
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
        console.log('window trust wallet', windows.trustWallet)
        console.log('window isTrust', windows.ethereum.isTrust)
        const ethereumProvider = windows.trustWallet as any
        if (ethereumProvider) {
            try {
                // console.log(ethereumProvider.coinbaseWalletExtension)
                // await ethereumProvider.request({
                //     method: "eth_requestAccounts",
                // })
                const result = await web3EthereumWallet.connect({info: {name: 'Trust'}, provider: ethereumProvider})
                setCurrentChain(result.chainId)
                setWallet(result.walletName)
                setAccount(result.address)
            } catch (e) {
                console.log(e)
            }
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
            setBalance('none')
            setCurrentChain('none')
            setWallet('none')
        } catch (e) {
            console.log(e)
        }
    }


    // web3?.provider.on('accountsChanged', (account: string) => {
    //     console.log(11111, account)
    // })
    // web3?.provider.on('chainChanged', (chain: string) => {
    //     console.log(22222, chain)
    // })
    // web3?.provider.on('disconnect', async (err: any) => {
    //     console.log(999999999999999, err)
    // })

    const getBalance = async () => {
        // const result = await web3?.eth.getBalance(account)
        try {
            const result = await web3EthereumWallet.getBalance(account)
            if (typeof result === 'undefined') {
                setBalance('none')
                return
            }
            setBalance(new Web3().utils.fromWei(result, 'ether'))
        } catch (e) {
            console.error(e)
        }

    }

    const onSigning = async () => {
        // const result = await web3?.eth.personal.sign('bye', account, '')
        const result = await web3EthereumWallet.signMessage('aaaaaaa', account)
        console.log(result)
    }

    const signTypedData = async () => {
        const result = await web3EthereumWallet.signTypedData(eip712, account)
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
        if (result) {
            setAvailableWallets(result)
            console.log(result)
        }
    }
    web3EthereumWallet.onAccountChanged = async (account: string) => {
        setWallet(web3EthereumWallet.walletName)
        setAccount(account)
        console.log(11111111)
        if (account) {
            const result = await web3EthereumWallet.getBalance(account)
            if (result) {
                setBalance(new Web3().utils.fromWei(result, 'ether'))
            }
        }
    }

    useEffect(() => {
        getBalance()
    }, [account, currentChain]);

    useEffect(() => {
        getDetectedWallets()
    }, []);

    console.log('availableWallets', availableWallets)
    const connectWallet = async (name: string) => {
        const compareName = name.trim().toLowerCase()
        try {
            const selectedWallet = availableWallets.find((item: any) => item.info.name.toLowerCase().includes(compareName))
            console.log('ssss', selectedWallet)
            const connect = await web3EthereumWallet.connect(selectedWallet)
            setAccount(connect?.address)
            setCurrentChain(connect.chainId)
            setWallet('Trust')
            return connect
        } catch (e) {
            return null
        }

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
            alert(e.error.message)
        }
    }

    const sendUSDT = async () => {
        const contractInfo = {
            toAddress: "0x51F6661CAB4553d8434F005E06314A5cD4d00A27",
            contractABI: USDT_ABI,
            contractAddress: USDT_CONTRACT_ADDRESS,
            amount: amount * 10 ** 6,
            method: 'transfer'
        }
        const result = await web3EthereumWallet.callERC20ContractMethod(contractInfo)
        console.log(result)
    }
    web3EthereumWallet.onChainChanged = (chain) => {
        setCurrentChain(chain)
    }

    const sendTransaction = async () => {
        const tx = {
            to: '0x51F6661CAB4553d8434F005E06314A5cD4d00A27',
            value: '0x0'
        }
        const result = await web3EthereumWallet.sendTransaction(tx)
        console.log(result)
    }
    return (
        <div>
            <div>
                <button onClick={async () => {
                    const wallet = await connectWallet('asdfasdf')
                    console.log('connectWallet', wallet)
                    if (!wallet) {
                        await connectTrust()
                    }
                }}>trust connect
                </button>
                <MetaMask setCurrentChain={setCurrentChain} setWallet={setWallet} availableWallets={availableWallets}
                          setAccount={(address: string) => setAccount(address)}/>
            </div>
            <div>balance: {balance}</div>
            <div>current wallet: {wallet}</div>
            <div>current chain: {currentChain}</div>
            <div>
                <button onClick={() => disconnect()}>disconnect</button>
                <button onClick={() => onSigning()}>sign</button>
                <button onClick={async () => {
                    // changeChain()
                    let web3 = new Web3()
                    try {
                        // await web3EthereumWallet.changeEthereumChainById(new Web3().utils.toHex(1))
                        const result = await web3EthereumWallet.changeEthereumChainById(web3.utils.toHex(43114))
                        console.log('change result', result)
                    } catch (e) {
                        console.log(333)
                        await web3EthereumWallet.addEthereumChain({
                            chainName: 'Avalanche Network',
                            rpcUrls: ["https://api.avax.network/ext/bc/C/rpc"],
                            chainId: new Web3().utils.toHex(43114),
                            nativeCurrency: {
                                name: 'AVAX',
                                decimals: 18,
                                symbol: 'AVAX'
                            }
                        })
                        console.log(4444, 'change')
                    }
                }}>change chain to avalanche
                </button>
                <button onClick={async () => {
                    // changeChain()
                    try {
                        const result = await web3EthereumWallet.changeEthereumChainById(new Web3().utils.toHex(1))
                        console.log('change result', result)
                    } catch (e) {
                        console.log(4444, false)
                    }
                }}>change chain to ethereum
                </button>
                <button onClick={async () => {
                    // changeChain()
                    try {

                        const result = await web3EthereumWallet.changeEthereumChainById(new Web3().utils.toHex(11155111))
                        console.log('change result', result)
                    } catch (e) {
                        console.log(4444, false)
                        await web3EthereumWallet.addEthereumChain({
                            chainName: 'Sepolia',
                            rpcUrls: ["https://sepolia.drpc.org"],
                            chainId: new Web3().utils.toHex(11155111),
                            nativeCurrency: {
                                name: 'SepoliaETH',
                                decimals: 18,
                                symbol: 'ETH'
                            }
                        })
                    }
                }}>change chain to ethereum sepolia(testnet)
                </button>
                <button onClick={() => deployContract()}>deploy</button>
            </div>
            <div>
                <input type={"number"} onChange={(e) => setAmount(Number(e.target.value))}/>
                <button onClick={() => sendUSDT()}>send eth USDT(testnet)</button>
            </div>
            <div>
                <button onClick={() => sendTransaction()}>send transaction</button>
                <button onClick={() => signTypedData()}>sign typed data in ethereum</button>
            </div>
        </div>
    );
}

export default App;
