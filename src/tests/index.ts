import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('MyEpicNFT', () => {
  it('Should successfully mint an NFT when prompted', async () => {
    const myEpicNFTFactory = await ethers.getContractFactory('MyEpicNFT');
    const myEpicNFT = await myEpicNFTFactory.deploy();
    await myEpicNFT.deployed();

    expect(await myEpicNFT.getTotalNFTs()).to.equal(0);

    const mintTx = await myEpicNFT.makeAnEpicNFT();
    await mintTx.wait();

    expect(await myEpicNFT.getTotalNFTs()).to.equal(1);
  });
});
