import { ethers } from 'hardhat';

const main = async () => {
  const myEpicNFTFactory = await ethers.getContractFactory('MyEpicNFT');
  const myEpicNFT = await myEpicNFTFactory.deploy();
  await myEpicNFT.deployed();

  console.log('Contract deployed to:', myEpicNFT.address);

  let mintTx = await myEpicNFT.makeAnEpicNFT();
  await mintTx.wait();
  console.log('Minted NFT #1');

  mintTx = await myEpicNFT.makeAnEpicNFT();
  await mintTx.wait();
  console.log('Minted NFT #2');

  mintTx = await myEpicNFT.makeAnEpicNFT();
  await mintTx.wait();
  console.log('Minted NFT #3');
};

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
