import { ethers } from 'ethers';
import { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { Button } from '../components/Button';
import { MyEpicNFT } from '../types/contracts/MyEpicNFT';
import MyEpicNFTArtifact from '../../artifacts/src/contracts/MyEpicNFT.sol/MyEpicNFT.json';

const CONTRACT_ADDRESS = '0x2A8159Ee1648a8225E73FE2284E845196925Ec22';

const Home: NextPage = () => {
  const [currentAccount, setCurrentAccount] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [totalNFTs, setTotalNFTs] = useState(0);

  const setupEventListener = async () => {
    const { ethereum } = window;

    if (!ethereum) return alert('Make sure MetaMask is installed.');

    try {
      const provider = new ethers.providers.Web3Provider(ethereum as any);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        MyEpicNFTArtifact.abi,
        signer
      ) as MyEpicNFT;

      contract.on('NewEpicNFTMinted', (_, tokenId) => {
        alert(
          `Hey there! We've minted your NFT and sent it to your wallet. It may be blank right now. It can take a max of 10 min to show up on OpenSea. Here's the link: https://testnets.opensea.io/assets/${CONTRACT_ADDRESS}/${tokenId.toNumber()}`
        );
      });

      setTotalNFTs((await contract.getTotalNFTs()).toNumber());
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    const { ethereum } = window;

    if (!ethereum) return alert('Make sure MetaMask is installed.');

    try {
      const accounts = await ethereum.request<Array<string>>({ method: 'eth_requestAccounts' });
      if (accounts?.[0]) setCurrentAccount(accounts[0]);
      setupEventListener();
    } catch (error) {
      console.error(error);
    }
  };

  const askContractToMintNFT = async () => {
    const { ethereum } = window;

    if (!ethereum) return alert('Make sure MetaMask is installed.');

    try {
      const provider = new ethers.providers.Web3Provider(ethereum as any);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        MyEpicNFTArtifact.abi,
        signer
      ) as MyEpicNFT;

      setIsLoading(true);

      const mintTx = await contract.makeAnEpicNFT();
      await mintTx.wait();

      console.log(`Mined, see transaction: https://rinkeby.etherscan.io/tx/${mintTx.hash}`);
    } catch (error) {
      console.error(error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    const { ethereum } = window;

    if (ethereum) {
      ethereum.request<Array<string>>({ method: 'eth_accounts' }).then((accounts) => {
        if (accounts?.[0]) {
          setCurrentAccount(accounts[0]);
          setupEventListener();
          console.log('Found an authorized account:', accounts[0]);
        } else {
          console.error('No authorized account found.');
        }
      });

      ethereum.request({ method: 'eth_chainId' }).then((chainId) => {
        const rinkebyChainId = '0x4';

        if (chainId !== rinkebyChainId) {
          alert('You need to connect to the Rinkeby Test Network.');
        }
      });
    } else {
      console.error('Make sure MetaMask is installed.');
    }
  }, []);

  return (
    <main className="h-screen bg-[#0d1116] text-center">
      <div className="h-full flex flex-col justify-between py-8">
        <div>
          <h1 className="text-[50px] leading-[1.2] font-bold text-transparent bg-gradient-to-r bg-clip-text from-purple-400 to-pink-600">
            My NFT Collection
          </h1>
          <h3 className="text-2xl mt-6 mb-2 text-white">
            Each unique. Each beautiful. Discover your NFT today.
          </h3>
          <a
            href="https://testnets.opensea.io/collection/squarenft-kk21shnny3"
            target="_blank"
            rel="noreferrer"
            className="block text-white mb-6 underline text-sm"
          >
            {`See on OpenSea (${totalNFTs || '?'} / 15)`}
          </a>
          {!currentAccount ? (
            <Button label="Connect to Wallet" onClick={connectWallet} />
          ) : (
            <Button label="Mint NFT" onClick={askContractToMintNFT} isLoading={isLoading} />
          )}
        </div>
        <div className="flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" className="w-6 h-6 mr-2">
            <path
              d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
              fill="#fff"
            ></path>
          </svg>
          <span className="text-white">
            built by{' '}
            <a
              href="https://github.com/msallent"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              @msallent
            </a>
          </span>
        </div>
      </div>
    </main>
  );
};

export default Home;
