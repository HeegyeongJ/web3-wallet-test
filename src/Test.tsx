import React from 'react';
import {useChainId, useDisconnect, useSignMessage, useSignTypedData} from "wagmi";
import {useAppKit, useAppKitAccount, useAppKitEvents} from "@reown/appkit/react";

const Test = () => {
    const {signMessageAsync} = useSignMessage()
    const {signTypedData, failureReason} = useSignTypedData()

    const modal = useAppKit()
    const {address, isConnected, status} = useAppKitAccount()
    const events = useAppKitEvents()
    const {disconnect, error: isError} = useDisconnect()
    const chainId = useChainId()
    console.log('wagmi chainId', chainId)
    console.log('current chainId', window.ethereum?.chainId)
    console.log('failReason', failureReason)
    return (
        <div>
            <button onClick={() => {
                signTypedData({
                    types: {
                        Person: [
                            {name: 'name', type: 'string'},
                            {name: 'wallet', type: 'address'},
                        ],
                        Mail: [
                            {name: 'from', type: 'Person'},
                            {name: 'to', type: 'Person'},
                            {name: 'contents', type: 'string'},
                        ],
                    },
                    primaryType: 'Mail',
                    message: {
                        from: {
                            name: 'Cow',
                            wallet: '0xCD2a3d9F938E13CD947Ec05AbC7FE734Df8DD826',
                        },
                        to: {
                            name: 'Bob',
                            wallet: '0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB',
                        },
                        contents: 'Hello, Bob!',
                    },
                })
            }}>Sign Typed Data
            </button>
            <button onClick={async () => await disconnect}>disconnect</button>
            <button onClick={async () => await signMessageAsync({message: 'hellooooooo'})}>Sign Message</button>
            <button onClick={() => modal.open()}>click</button>
        </div>
    );
};

export default Test;