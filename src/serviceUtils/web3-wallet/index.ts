import {Eip712TypedData, Web3} from "web3";
import {ChainInfo, DetectedWalletList} from "./index.type";

const web3 = new Web3();

// EVM 기반의 MetaMask, Coinbase, Trust wallet을 바탕으로 만든 모듈
class Web3EthereumWallet {
    walletName: string | null;
    web3: Web3 | null;
    account: {
        address: null | string;
    }
    chainId: null | string;
    onAccountChanged: (account: string) => void
    onChainChanged: (chain: string) => void


    constructor() {
        this.walletName = null;
        this.web3 = null;
        this.account = {
            address: null,
        };
        this.chainId = null;
        this.onAccountChanged = (account: string) => {
            this.account.address = account
        }
        this.onChainChanged = (chain: string) => {
            this.chainId = chain
        }
    }

    async getAvailableWallets() {
        let wallets: any[] = []
        await Web3.requestEIP6963Providers().then(async (res) => {
            for (const [key, value] of res) {
                wallets.push(value)
            }
        })
        return wallets
    }

    private initialize() {
        this.walletName = null;
        this.web3 = null;
        this.account = {
            address: null,
        };
        this.chainId = null;
    }

    private detectAccountChanged() {
        return this.web3?.provider?.on('accountsChanged', (account) => {
            this.account.address = account[0]
            this.onAccountChanged(account[0])
        })
    }

    private detectChainChanged() {
        return this.web3?.provider?.on('chainChanged', (chain) => {
            this.chainId = chain;
            this.onChainChanged(chain)
        })
    }

    async connect(wallet: DetectedWalletList) {
        try {
            this.web3 = new Web3(wallet.provider)
            if (this.web3) {
                const result = await this.web3?.eth.requestAccounts() as string[]
                const chainId = await this.web3?.eth.getChainId()
                this.chainId = web3.utils.toHex(chainId)
                this.walletName = wallet.info.name
                this.account.address = result[0];
                console.log(result[0])
                this.detectAccountChanged()
                this.detectChainChanged()
                return {
                    address: this.account.address,
                    chainId: this.chainId,
                    walletName: this.walletName,
                    web3: this.web3
                };
            }
            throw new Error('failed to initialize web3')
        } catch (e: any) {
            if (e?.error?.code === -32603) {
                alert('지갑 생성 필요')
            }
            throw e
        }
    }

    async disconnect() {
        if (this.web3) {
            try {
                await this.web3?.provider?.request({
                    method: "wallet_revokePermissions",
                    params: [
                        {
                            eth_accounts: this.account.address
                        }
                    ],
                })
                this.initialize()
                return true
            } catch (e) {
                try {
                    this.web3.provider?.disconnect()
                    this.initialize()
                    return true
                } catch (disconnectError) {
                    throw disconnectError
                }
            }
        }
        throw new Error('not connected any wallet')
    }

    async sendTransaction(txParams: {
        to?: string;
        value?: number | string;
        gas?: number;
        gasPrice?: number;
        data?: string;
        nonce?: number;
        chainId?: bigint
    }) {
        try {
            return await this.web3?.eth.sendTransaction({from: this.account.address, ...txParams});
        } catch (e) {
            console.error(e)
            throw e
        }
    }

    async deployContract(contractABI: any, contractBytecode: string) {
        if (this.web3) {
            try {
                const contract = new this.web3.eth.Contract(contractABI)
                const contractDeployer = contract.deploy({
                    data: contractBytecode,
                })

                const gas = await contractDeployer.estimateGas({
                    from: this.account.address as string,
                })

                const tx = await contractDeployer.send({
                    from: this.account.address as string,
                    gas: gas.toString()
                })
                return tx
            } catch (e) {
                console.error(e)
                throw e
            }
        }
        throw new Error('not connected any wallet')
    }

    async callERC20ContractMethod(contractInfo: {
        contractABI: any,
        contractAddress: string,
        method: string,
        amount: number,
        toAddress: string,
    }) {
        if (this.web3) {
            try {
                const {contractABI, contractAddress, method, amount, toAddress} = contractInfo
                const contract = new this.web3.eth.Contract(contractABI, contractAddress)

                const encodeParameter = contract.methods[method](toAddress, amount).encodeABI();

                const estimatedGas = await this.web3.eth.estimateGas({
                    to: contractAddress,
                    from: this.account.address as string,
                    data: encodeParameter,
                });

                const transaction = {
                    to: contractAddress,
                    chainId: this.chainId as string,
                    gas: estimatedGas,
                    data: encodeParameter,
                    from: this.account.address as string,
                }
                console.log(transaction)
                const sendTransaction = await this.web3.eth.sendTransaction(transaction)
                console.log('hyhhhhh')
                return sendTransaction
            } catch (e) {
                console.error(e)
                throw e
            }
        }
        throw new Error('not connected any wallet')
    }

    async signMessage(message: string, address: string) {
        if (this.web3) {
            try {
                // 마지막 인자 passphrase 는 지갑에서 서명시 자동으로 인식
                return await this.web3?.eth.personal.sign(message, address, "");
            } catch (e) {
                console.log(e)
                throw e
            }
        }
        throw new Error('not connected any wallet')
    }

    async signTypedData(EIP712TypedData: Eip712TypedData, address: string) {
        if (this.web3) {
            try {
                return await this.web3?.eth.signTypedData(address, EIP712TypedData)
            } catch (e) {
                console.error(e)
                throw e
            }
        }
        throw new Error('not connected any wallet')
    }


    getCurrentChainId() {
        if (this.web3) {
            return this.chainId
        }
        throw new Error('not connected any wallet')
    }

    async changeEthereumChainById(chainId: string) {
        if (this.web3) {
            try {
                const result = await this.web3?.provider?.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{chainId}]
                })
                this.chainId = chainId
                return result
            } catch (e) {
                console.error(e);
                throw e;
            }
        }
        throw new Error('not connected any wallet')
    }

    async getBalance(address: string) {
        if (this.web3) {
            return await this.web3?.eth.getBalance(address)
        }
        throw new Error('not connected any wallet')
    }

    async addEthereumChain(chainInfo: ChainInfo) {
        if (this.web3) {
            try {
                const result = await this.web3?.provider?.request({
                    method: 'wallet_addEthereumChain',
                    params: [chainInfo]
                })
                this.chainId = chainInfo.chainId
                return result
            } catch (e) {
                console.error(e)
                throw e
            }
        }
        throw new Error('not connected any wallet')
    }
}

export const web3EthereumWallet = new Web3EthereumWallet()