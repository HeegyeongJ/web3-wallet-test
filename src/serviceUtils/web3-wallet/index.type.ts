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
    icon: string;
    name: string;
    rdns: string;
    uuid: string;
}

export type ChainInfo = {
    chainId: string;
    rpcUrls: string[]; chainName: string
    nativeCurrency: { name: string, decimals: number, symbol: string }
    blockExplorerUrls?: string[]
    iconUrls?: string[]
}