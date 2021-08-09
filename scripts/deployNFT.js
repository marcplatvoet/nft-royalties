const fs = require('fs');

async function main() {
  const txFee = ethers.utils.parseUnits('1', 'ether'); 
  const [admin, artist, owner1, owner2] = await ethers.getSigners();
  console.log(`Deploying contracts with the account admin: ${admin.address}`);
  console.log(`Deploying contracts with the account artist: ${artist.address}`);
  console.log(`Deploying contracts with the ether: ${txFee}`);

  const balance = await admin.getBalance();
  console.log(`Account balance: ${balance.toString()}`);

  const Token = await ethers.getContractFactory('NFT');
  const token = await Token.deploy(admin.address,artist.address,txFee);
  console.log(`Token address: ${token.address}`);

  const data = {
    address: token.address,
    abi: JSON.parse(token.interface.format('json'))
  };
  fs.writeFileSync('frontend/src/NFT.json', JSON.stringify(data)); 
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });
