// Import the ethers library
import { React, useState } from "react";
import { ethers } from "ethers";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap-grid.css";
import MyToken from "../contracts/MyToken.json";

const Transfertokens = ({ signerAddress, mytoken, currentAccount }) => {
  const [balancefrom, setBalanceFrom] = useState(0);
  const [balanceto, setBalanceTo] = useState(0);
  const [balanceartist, setBalanceArtist] = useState(0);

  const onTransferTokensWithoutRoyalties = async (e) => {
    e.preventDefault();
    const from = e.target.elements.from.value;
    const to = e.target.elements.to.value;
    const amount = e.target.elements.amount.value;
    console.log(from);
    console.log(to);
    await mytoken.transfer(to, ethers.utils.parseUnits(amount));
    setBalanceFrom(ethers.utils.parseUnits(await mytoken.balanceOf(from)));
    setBalanceTo(ethers.utils.parseUnits(await mytoken.balanceOf(to)));

    const artist = await mytoken._artist();
    if (artist !== "0x0000000000000000000000000000000000000000") {
      setBalanceArtist(
        ethers.utils.parseUnits(await mytoken.balanceOf(artist))
      );
    }
  };

  return (
    <div>
      <h1>Transfer tokens without royalties</h1>
      <br />

      <div className="card col-sm-8 bg-secondary">
        The token address: {MyToken.address} is the token that we can transfer
        with or without royalties to the artist. The artist can be setup by the
        admin, and the percentage of royalties that the artist receives with
        every transaction.
      </div>
      <br />
      <div className="col-4  card col-sm-8 bg-secondary">
        <div className="card-body">
          <div className="card-header">Transfer Tokens Without Royalties.</div>
          <form onSubmit={(e) => onTransferTokensWithoutRoyalties(e)}>
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
        <div>{`Balance sender:${balancefrom}`} </div>
        <div>{`Balance sender:${balanceto}`} </div>
        <div>{`Balance sender:${balanceartist}`} </div>
      </div>
    </div>
  );
};

export default Transfertokens;
