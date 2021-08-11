import { ethers, Contract } from "ethers";
//import Web3 from "web3";
import MyToken from "../contracts/MyToken.json";

const getBalance = async (token, account) => {
  const balance = await token.balanceOf(account);
  return ethers.utils.formatEther(balance);
};

// const getWeb3 = async () => {
//   // Init
//   const web3Provider = new Web3.providers.HttpProvider("http://localhost:8545");
//   const web3 = new Web3(web3Provider);
//   console.log(web3);
//   let accounts = await web3.eth.getAccounts();
//   console.log(accounts);
//   let contract = new web3.eth.Contract(MyToken.abi, MyToken.address);
//   console.log(MyToken.address);
//   let artist = await contract.methods.getAdmin();
//   console.log(artist);
//   web3.eth.defaultAccount = accounts[0];

//   var result = contract.methods.admin.call().call((error, result) => {
//     console.log(result);
//   });
//   console.log(result);
//   console.log(contract.admin());

//   //const Web3 = require("web3");
//   console.log("Web3.eth = " + web3.eth);
//   console.log("Web3.utils = " + web3.utils);
//   console.log("Web3.bzz = " + web3.bzz);
//   console.log("Web3.shh = " + web3.shh);

//   // var owner = contract.owner.call();
//   // console.log(owner);

//   // let result = contract.methods.admin.call((error, result) => {
//   //   console.log(result);
//   // });
//   // console.log(result);
// };

const getTokenBlockchain = () =>
  new Promise((resolve, reject) => {
    window.addEventListener("load", async () => {
      console.log(`window.ethereum: ${window.ethereum}`);
      if (window.ethereum) {
        await window.ethereum.enable();
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        // console.log(`provider: ${provider}`);
        const signer = provider.getSigner();
        // console.log(`signer:${signer}`);
        const signerAddress = await signer.getAddress();
        // console.log(`signerAddress:${signerAddress}`);
        const mytoken = new Contract(MyToken.address, MyToken.abi, signer);
        //const balance = getBalance(mytoken, signerAddress);
        const balance = await mytoken.balanceOf(signerAddress);
        //console.log(balance);
        console.log(ethers.utils.formatEther(balance));

        //const contract = instance();

        let artist = await mytoken._artist();

        const percentage = ethers.utils.formatEther(
          await mytoken._percentage()
        );

        const admin = await mytoken.admin();

        if (artist === "0x0000000000000000000000000000000000000000") {
          artist = null;
        }

        console.log(artist);
        console.log(percentage);
        console.log(admin);

        resolve({
          signerAddress,
          mytoken,
          addresses: [artist, percentage, admin],
        });
      }
      resolve({
        signerAddress: undefined,
        mytoken: undefined,
        addresses: [],
      });
    });
  });

export { getTokenBlockchain, getBalance };
