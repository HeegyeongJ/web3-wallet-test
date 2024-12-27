import React, {useEffect, useState} from 'react';
import './App.css';
import {ethers} from "ethers";



function App() {
    const connectWallet = async () => {
     if(window.ethereum){
         try{

         const ethereumProvider = window as any
         console.log(ethereumProvider.coinbaseWalletExtension)
         await ethereumProvider.request({
             method: "eth_requestAccounts",
         })
         }catch (e){
             console.log(e)
         }
     }
    }

  return (
      <div>
        <button onClick={() => connectWallet()}>click</button>
      </div>
  );
}

export default App;
