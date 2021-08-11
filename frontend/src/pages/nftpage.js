// Import the ethers library
import React from "react";
import { ethers } from "ethers";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-grid.css";

const nftpage = ({ signerAddress, mytoken, currentAccount }) => {
  let balfrom, balto;

  const getBalance = async (e) => {
    e.preventDefault();
    const from = e.target.elements.from.value;
    const to = e.target.elements.to.value;
    //const amount = e.target.elements.amount.value;
    // console.log(mytoken);
    // console.log(from);
    // console.log(to);
    // console.log(amount);
    balto = await mytoken.balanceOf(to);
    balfrom = await mytoken.balanceOf(from);

    console.log(ethers.utils.formatEther(balto));
    console.log(ethers.utils.formatEther(balfrom));
  };

  const onClickFunction = async (e) => {
    e.preventDefault();
    getBalance(e);
    //const from = e.target.elements.from.value;
    const to = e.target.elements.to.value;
    const amount = e.target.elements.amount.value;
    // console.log(mytoken);
    // console.log(from);
    // console.log(to);
    // console.log(amount);
    await mytoken.transfer(to, ethers.utils.parseUnits(amount));
  };

  const MintTokens = async (e) => {
    e.preventDefault();
    //const to = e.target.elements.to.value;
    const amount = e.target.elements.amount.value;
    // console.log(mytoken);
    // console.log(from);
    // console.log(to);
    // console.log(amount);
    await mytoken.mint(ethers.utils.parseUnits(amount));
  };

  const onNFTClickFunction = async (e) => {
    e.preventDefault();
    const from = e.target.elements.from.value;
    const to = e.target.elements.to.value;

    console.log(from);
    console.log(to);

    await mytoken.transferFrom(from, to, 0);
  };

  return (
    <div>
      <h1>NFT</h1>
      <br />

      <div className="card col-sm-6 bg-secondary">
        Token address: 0x5FbDB2315678afecb367f032d93F642f64180aa3 install
        Metamask, and create an account. send some tokens to your account. (this
        is all free on the test network!)
      </div>

      <div className="row mb-3">
        <div className="col-4 card col-sm-4 bg-secondary">
          <div className="card-body">
            <div className="card-header">Mint tokens. (Faucet tokens)</div>
            <form onSubmit={(e) => MintTokens(e)}>
              To address:
              <input
                type="text"
                name="to"
                className="form-control"
                placeholder=""
                value={currentAccount}
              />
              Amount:
              <input
                type="text"
                name="amount"
                className="form-control"
                placeholder=""
              />
              <br />
              <button className="btn btn-primary">submit</button>
            </form>
          </div>
        </div>

        <div className="col-4  card col-sm-4 bg-secondary">
          <div className="card-body">
            <div className="card-header">Send tokens.</div>
            <form onSubmit={(e) => onClickFunction(e)}>
              From address:
              <input
                type="readonly"
                name="from"
                className="form-control"
                placeholder=""
                value={currentAccount}
              />
              To address:
              <input
                type="text"
                name="to"
                className="form-control"
                placeholder=""
                value="0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc"
              />
              Amount:
              <input
                type="text"
                name="amount"
                className="form-control"
                placeholder=""
              />
              <br />
              <button className="btn btn-primary">submit</button>
            </form>
          </div>
        </div>

        <div className="col-4  card col-sm-4 bg-secondary">
          <div className="card-body">
            <div className="card-header">Send NFT tokens.</div>
            <form onSubmit={(e) => onNFTClickFunction(e)}>
              From address:
              <input
                type="readonly"
                name="from"
                className="form-control"
                placeholder=""
                value="0x70997970C51812dc3A010C7d01b50e0d17dc79C8"
              />
              To address:
              <input
                type="text"
                name="to"
                className="form-control"
                placeholder=""
                value="0x15d34aaf54267db7d7c367839aaf71a00a2c6a65"
              />
              <br />
              <button className="btn btn-primary">submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default nftpage;
