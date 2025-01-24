import {EIP1193Provider} from "web3";

type Transaction = {
    blockHash: string;
    blockNumber: number;
    cumulativeGasUsed: number;
    effectiveGasPrice: number;
    from: string;
    to: string;
    gasUsed: number;
    logs: string[]
    logsBloom: string;
    status: number;
    transactionHash: string;
    transactionIndex: number;
    type: number;
}

type SignTypedData = {
    domain: Record<string, string | number>
    message: Record<string, unknown>
    primaryType: string
    types: {
        EIP712Domain: {
            name: string; type: string
        }[]
    }
}

export type DetectedWalletList = {
    info: {
        name: string; // 지갑 명
        icon?: string;
        rdns?: string;
        uuid?: string; // 새로고침할 떄마다 변경되어서 사용하면 X
    }
    provider: EIP1193Provider<any>
}

export type ChainInfo = {
    chainName: string;
    chainId: string;
    rpcUrls: string[];
    nativeCurrency: { name: string, decimals: number, symbol: string }
    blockExplorerUrls?: string[]
    iconUrls?: string[]
}

export const enum Wallet {
    trust = 'Trust',
    metamask = 'MetaMask'
}

export type Address = string;

export type Account = Address[];