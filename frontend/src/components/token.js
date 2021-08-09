import { ethers, Contract } from "ethers";
import web3 from "web3";
import Token from "../contracts/MockToken.json";
import nftToken from "../contracts/NFT.json";

const getAmounts = async () => {
  const provider = new ethers.providers.Web3Provider(window.ethereum, "any");
  // Prompt user for account connections
  await provider.send("eth_requestAccounts", []);
  const signer = provider.getSigner();
  console.log("Account:", await signer.getAddress());
};

const getAmount = async (token, address) => {
  const amountWei = await token.balanceOf(address);
  const amount = parseInt(web3.utils.fromWei(web3.utils.toBN(amountWei)));
  console.log(`amount: ${amount}`);
  return amount;
};

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
        const token = new Contract(Token.address, Token.abi, signer);
        const nfttoken = new Contract(nftToken.address, nftToken.abi, signer);
        // console.log(`token:${token.balanceOf(signerAddress)}`);
        // console.log(`nfttoken:${nfttoken}`);

        getAmounts(provider);

        resolve({ signerAddress, token, nfttoken });
      }
      resolve({
        signerAddress: undefined,
        token: undefined,
        nfttoken: undefined,
      });
    });
  });

export { getTokenBlockchain, getAmount };
