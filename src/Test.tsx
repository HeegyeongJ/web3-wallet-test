import React from 'react'
import {useState} from "react";
import {useSDK} from "@metamask/sdk-react";

const Test = () => {
    const [account, setAccount] = useState('')
    const {sdk, connected, provider, chainId} = useSDK();

    const connect = async() => {
        try {
            const accounts = await sdk?.connect() as string[];
            setAccount(accounts[0]);
        }catch (e){
            console.error(e);
        }
    }
    return (
        <div>
            <button onClick={() => connect()}>Connect to SDK</button>
            {connected && <div>
                {chainId && (<p>chainId: {chainId}</p>)}
                {account &&( <p>account: {account}</p>)}
                <p>aasdf</p>
            </div>}
        </div>
    );
};

export default Test;