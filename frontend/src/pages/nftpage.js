// Import the ethers library
import React from "react";
import { ethers } from "ethers";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-grid.css";

const nftpage = ({
  signerAddress,
  nfttoken,
  token,
  amountAdmin,
  amountArtist,
  currentAccount,
}) => {
  const onClickFunction = async (e) => {
    e.preventDefault();
    const from = e.target.elements.from.value;
    const to = e.target.elements.to.value;
    const amount = e.target.elements.amount.value;
    console.log(from);
    console.log(to);
    console.log(amount);
    await token.transfer(to, ethers.utils.parseUnits(amount));
  };

  const onNFTClickFunction = async (e) => {
    e.preventDefault();
    const from = e.target.elements.from.value;
    const to = e.target.elements.to.value;

    console.log(from);
    console.log(to);
    console.log(nfttoken);
    await nfttoken.transferFrom(from, to, 0);
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
      <div>{`Balance admin: ${amountAdmin} `}</div>
      <div>{`Balance artist: ${amountArtist} `}</div>
      <div className="card col-sm-6 bg-secondary">
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
              value="0x15d34aaf54267db7d7c367839aaf71a00a2c6a65"
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

      <div className="card col-sm-6 bg-secondary">
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
  );
};

export default nftpage;
