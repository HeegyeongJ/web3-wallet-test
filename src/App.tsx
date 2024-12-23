import React, {useEffect, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import {AppKitProvider} from "./context";
import {MetaMaskProvider} from "@metamask/sdk-react";
import Test from "./Test";
import Coinbase from "./Coinbase";
const projectId = 'd13d662b32dcf743f8f79327adc3d18c';



function App() {


  return (
      <MetaMaskProvider
          sdkOptions={{
              dappMetadata: {
                  name: "Example React Dapp",
                  url: window.location.href,
              },
              infuraAPIKey: process.env.INFURA_API_KEY,
              // Other options.
          }}
      >
          <Test/>
          <Coinbase/>
      </MetaMaskProvider>
  );
}

export default App;
