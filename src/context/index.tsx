import React from 'react'
import { WagmiProvider } from 'wagmi'
import { mainnet, arbitrum, base, scroll, polygon } from '@reown/appkit/networks'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi'
import {
    createAppKit,
    useAppKit,
} from '@reown/appkit/react'
// 0. Setup queryClient
const queryClient = new QueryClient()

// 1. Get projectId from https://cloud.reown.com
const projectId = 'd13d662b32dcf743f8f79327adc3d18c'

// 2. Create a metadata object - optional
const metadata = {
    name: 'test',
    description: 'AppKit Example',
    url: 'https://reown.com/appkit', // origin must match your domain & subdomain
    icons: ['https://assets.reown.com/reown-profile-pic.png']
}

// 3. Set the networks
const networks = [mainnet, arbitrum, base]

// 4. Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
    networks,
    projectId,
    ssr: true
});

// 5. Create modal
createAppKit({
    adapters: [wagmiAdapter],
// @ts-ignore
    networks,
    projectId,
    metadata,
    features: {
        analytics: true // Optional - defaults to your Cloud configuration
    }
})

export function AppKitProvider({ children }: any) {
    const modal = useAppKit()
    return (
        <WagmiProvider config={wagmiAdapter.wagmiConfig}>
            <QueryClientProvider client={queryClient}>
                <button onClick={() => modal.open()}>Connect Wallet</button>
            </QueryClientProvider>
        </WagmiProvider>
    )
}
