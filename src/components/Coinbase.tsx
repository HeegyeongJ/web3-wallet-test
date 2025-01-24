// import React from 'react';
// import {web3EthereumWallet} from "../serviceUtils/web3-wallet";
// import {sdk} from "../sdk";
//
// const Coinbase = () => {
//     const connect = async () => {
//         const result = await web3EthereumWallet.connect({
//             info: {name: 'Coinbase'},
//             provider: sdk.getCoinbaseProviderFromSDK()
//         })
//         console.log("Connected", result);
//     }
//     return (
//         <div>
//             <button onClick={() => connect()}>coinbase connect</button>
//         </div>
//     );
// };
//
// export default Coinbase;