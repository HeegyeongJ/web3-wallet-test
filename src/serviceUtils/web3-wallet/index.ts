import {Eip712TypedData, Web3} from "web3";
import {ChainInfo, DetectedWalletList} from "./index.type";

const web3 = new Web3();

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
        }
        this.onChainChanged = (chain: string) => {
        }
    }

    async getAvailableWallets() {
        let wallets: any[] = []
        await Web3.requestEIP6963Providers().then(async (res) => {
            for (const [key, value] of res) {
                wallets.push(value.info)
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

    async connect(walletName: DetectedWalletList["name"]) {
        try {
            let wallet: any[] = []
            await Web3.requestEIP6963Providers().then(async (res) => {
                for (const [key, value] of res) {
                    if (value.info.name === walletName) {
                        wallet.push(value.info.name)
                        this.web3 = new Web3(value.provider);
                        this.walletName = value.info.name;
                    }
                }
            })
            if (wallet.length === 0) {
                throw new Error("no installed wallet found");
            }
            if (this.web3) {
                const result = await this.web3?.eth.requestAccounts() as string[]
                const chainId = await this.web3?.eth.getChainId()
                this.chainId = chainId?.toString() as string
                this.account.address = result[0];
                this.detectAccountChanged()
                this.detectChainChanged()
                return {address: this.account.address, chainId: this.chainId, walletName: this.walletName};
            }
        } catch (e) {
            console.error(e)
        }
    }

    async disconnect() {
        if (this.web3) {
            try {
                this.web3?.provider?.request({
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
                this.web3.provider?.disconnect()
            }
        }
        throw new Error('not connected any wallet')
    }

    getCurrentWallet() {
        if (this.web3) {
            return {web3: this.web3, address: this.account.address};
        }
        throw new Error('not connected any wallet')
    }

    async sendTransaction(txParams: {
        from: string;
        to?: string;
        value?: number | string;
        gas?: number;
        gasPrice?: number;
        data?: string;
        nonce?: number;
        chainId?: bigint
    }) {
        try {
            const result = await this.web3?.eth.sendTransaction(txParams);
            return result
        } catch (e) {
            console.error(e)
            throw new Error('failed to send transaction')
        }
    }


    async callContractMethod(contractABI: any, contractAddress: string, method: string, amount: number, gasPrice: string, gas: string) {
        try {
            if (this.web3) {
                const contract = new this.web3.eth.Contract(contractABI, contractAddress)
                const txParameter = [contractAddress, web3.utils.toHex(web3.utils.toWei(amount, 'ether'))]
                const encodeParameter = contract.methods[method](...txParameter).encodeABI();
                const transaction = {
                    to: contractAddress,
                    chainId: this.chainId as string,
                    gasPrice,
                    gas,
                    data: encodeParameter,
                    from: this.account.address as string
                }
                const sendTransaction = await this.web3.eth.sendTransaction(transaction)
                return sendTransaction
            }
        } catch (e) {
            console.error(e)
            throw new Error('failed to send transaction')
        }
    }

    async signMessage(message: string, address: string) {
        try {
            // 마지막 인자 passphrase 는 지갑에서 서명시 자동으로 인식
            const result = await this.web3?.eth.personal.sign(message, address, '')
            return result
        } catch (e) {
            console.log(e)
            throw new Error('failed to signing message')
        }
    }

    async signTypedData(EIP712TypedData: Eip712TypedData, address: string) {
        try {
            const result = await this.web3?.eth.signTypedData(address, EIP712TypedData)
            return result
        } catch (e) {
            console.log(e)
            throw new Error('failed to sign typed data')
        }
    }


    getChainId() {
        if (this.web3) {
            return this.chainId
        }
        throw new Error('not connected any wallet')
    }

    async changeChainId(chainId: string) {
        try {
            await this.web3?.provider?.request({
                method: 'wallet_switchEthereumChain',
                params: [{chainId}]
            })
            return true
        } catch (e) {
            console.error(e)
            throw new Error('failed to change chain')
        }
    }

    async getBalance(address: string) {
        try {
            return await this.web3?.eth.getBalance(address)
        } catch (e) {
            console.error(e)
            throw new Error('failed to get balance')
        }
    }

    async addEthereumChain(chainInfo: ChainInfo[]) {
        try {
            const result = await this.web3?.provider?.request({method: 'wallet_addEthereumChain', params: chainInfo})
            return result
        } catch (e) {
            console.error(e)
            throw new Error('failed to add new chain')
        }
    }
}

export const web3EthereumWallet = new Web3EthereumWallet()