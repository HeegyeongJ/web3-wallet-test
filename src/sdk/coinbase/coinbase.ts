import {createCoinbaseWalletSDK} from "@coinbase/wallet-sdk";

export const coinbaseWallet = createCoinbaseWalletSDK({
    appName: 'my app',
    appLogoUrl: '',
    appChainIds: []
})

