import React, {useEffect, useState} from 'react';
import './App.css';
import {ethers} from "ethers";
import {Web3} from "web3";



function App() {
    const connectMetaMask = async () => {
     if(window.ethereum?.isMetaMask){
         try{
         const ethereumProvider = window.ethereum as any
             // console.log(ethereumProvider.coinbaseWalletExtension)
         await ethereumProvider.request({
             method: "eth_requestAccounts",
         })
         }catch (e){
             console.log(e)
         }
     }
    }
    const connectTrust = async () => {
        const windows = window as any
        console.log(windows.trustWallet)
            try{
                const ethereumProvider = windows.trustWallet as any
                // console.log(ethereumProvider.coinbaseWalletExtension)
                // await ethereumProvider.request({
                //     method: "eth_requestAccounts",
                // })
                const web3 = new Web3(ethereumProvider)
                await web3.eth.requestAccounts()
            }catch (e){
                console.log(new Error('connection failed'))
            }
    }
    const connectCoinBase = async ()=> {
        try{
            console.log(window.ethereum)
        }catch (e){
            console.log(e)
        }
    }
    const permissionWallet = async() => {
        try{
            const ethereumProvider = window.ethereum as any
            await ethereumProvider.request({
                method: "wallet_requestPermissions",
                params:[{
                    eth_accounts:{}
                }]
            })
        }catch (e){
            console.log(e)
        }
    }

    const sendTransaction = async () => {
        const ethereumProvider = window.ethereum as any
        await ethereumProvider.request({
            "method": "eth_sendTransaction",
            "params": [
                {
                    to: "0x4B0897b0513FdBeEc7C469D9aF4fA6C0752aBea7",
                    from: "0xDeaDbeefdEAdbeefdEadbEEFdeadbeefDEADbEEF",
                    gas: "0x76c0",
                    value: "0x8ac7230489e80000",
                    data: "0x",
                    gasPrice: "0x4a817c800"
                }
            ],
        });
    }
  return (
      <div>
          <button onClick={() => connectMetaMask()}>metamask</button>
          <button onClick={() => connectTrust()}>trust</button>
          <button onClick={() => connectCoinBase()}>coinbase</button>
          <button onClick={() => permissionWallet()}>permission</button>
          <button onClick={() => sendTransaction()}>send Transaction</button>
      </div>
  );
}

export default App;
