const fs = require("fs");

async function main() {
	const txFee = ethers.utils.parseUnits("1", "ether");
	const [admin, artist, owner1, owner2] = await ethers.getSigners();
	console.log(`Deploying contracts with the account admin: ${admin.address}`);
	console.log(`Deploying contracts with the account artist: ${artist.address}`);
	console.log(`Deploying contracts with the ether: ${txFee}`);

	console.log(`deploying the MockToken!`);
	const balance = await admin.getBalance();
	console.log(`Account balance: ${balance.toString()}`);

	const Token = await ethers.getContractFactory("MockToken");
	const token = await Token.deploy();
	console.log(`Token address: ${token.address}`);

	console.log(`deploying the NFT!`);
	console.log(`Account balance: ${balance.toString()}`);

	const TokenNFT = await ethers.getContractFactory("NFT");
	const tokenNFT = await TokenNFT.deploy(artist.address, token.address, txFee);
	console.log(`Token NFT address: ${tokenNFT.address}`);

	const dataNFT = {
		address: tokenNFT.address,
		abi: JSON.parse(tokenNFT.interface.format("json")),
	};
	fs.writeFileSync(
		"./frontend/src/contracts/NFT.json",
		JSON.stringify(dataNFT)
	);

	const data = {
		address: token.address,
		abi: JSON.parse(token.interface.format("json")),
	};
	fs.writeFileSync(
		"./frontend/src/contracts/MockToken.json",
		JSON.stringify(data)
	);

	const addressdata = {
		token: token.address,
		nfttoken: tokenNFT.address,
		admin: admin.address,
		artist: artist.address,
	};
	fs.writeFileSync(
		"./frontend/src/contracts/addresses.json",
		JSON.stringify(addressdata)
	);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
