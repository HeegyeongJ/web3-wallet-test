import {MMSDK} from "./metamask/metamask";
import {coinbaseWallet} from "./coinbase/coinbase";

export const sdk = {
    metaMaskConnect: async () => {
        return await MMSDK.connect();
    },
    getMetaMaskProviderFromSDK: () => {
        return MMSDK.getProvider();
    },
    getCoinbaseProviderFromSDK: () => {
        return coinbaseWallet.getProvider()
    }
};