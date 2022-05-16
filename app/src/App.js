import React, { useEffect, useState } from 'react';
import './App.css';
// import twitterLogo from './assets/twitter-logo.svg';
import phantomLogo from './assets/phantom-icon-purple.svg';
import cosmicBoatBanner from './assets/banner.png'
import CandyMachine from './CandyMachine';

// Constants
// const TWITTER_HANDLE = '_buildspace';
// const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;
const PHANTOM_LINK = `https://phantom.app/`;

const App = () => {

  // TEST
  function isMobileDevice() {
    return 'ontouchstart' in window || 'onmsgesturechange' in window;
  }

  // State
  const [walletAddress, setWalletAddress] = useState(null);

  const checkIfWalletIsConnected = async () => {
    try {
      const { solana } = window;

      if (solana && solana.isPhantom) {
        console.log('Phantom wallet found!');
        const response = await solana.connect({ onlyIfTrusted: true });
        console.log(
          'Connected with Public Key:',
          response.publicKey.toString()
        );

        setWalletAddress(response.publicKey.toString());

      } else {
        alert('Solana object not found! Get a Phantom Wallet 👻');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const connectWallet = async () => {
    const { solana } = window;

    if (solana) {
      const response = await solana.connect();
      console.log('Connected with Public Key:', response.publicKey.toString());
      setWalletAddress(response.publicKey.toString());
    }
  };

  const renderNotConnectedContainer = () => (
    <button
      className="cta-button connect-wallet-button"
      onClick={connectWallet}
    >
      Connect to Wallet
    </button>
  );

  useEffect(() => {
    const onLoad = async () => {
      await checkIfWalletIsConnected();
    };
    window.addEventListener('load', onLoad);
    return () => window.removeEventListener('load', onLoad);
  }, []);

  return (
    <div className="App">

      <div className="container">
        <div className="header-container">

          <p className="header">
            Cosmic Kids Collection
          </p>

          <p></p>

          <img alt="Cosmic Banner" className="banner-cosmic-boat" src={cosmicBoatBanner} />

          <p className="body-text">
            What you say, what you hear, what you see define your emotions.
            Every combination of words and thoughts, sounds and visuals translate into a unique vibe.
            This is why music producer Gusku and Selas Studio have partnered to develop a collection of NFTs to attach music to unique semantics: generated visuals, generated with artificial intelligence.
          </p>

          <p className="body-text">
            Solana is a Proof of Stake blockchain on which the Cosmic Kid Collection will be stored and exchanged. Blockchain unicity and traceability will empower the Cosmic Kid community to hold and trade IP rights on Gusku's track “Rolling Under The Wave”, without requiring any third party approval, and potentially giving access to way more: exclusive access to a venue, a boat or any other physical space, specific privileges, etc. On top of their holding rights, every Cosmic Kid will be an artistic proof of your attendance to the party, your curiosity and love for innovation in Arts.
          </p>

          <p className="body-text">
            There are only 20 NFTs, so take 5 minutes to see below how to get one!
          </p>

          {!walletAddress && renderNotConnectedContainer()}

          <p className="note-text">
            {!isMobileDevice() && "Connected on browser..."}
            {isMobileDevice() && "Connected on mobile, please use your browser..."}
          </p>

        </div>

        {walletAddress && <CandyMachine walletAddress={window.solana} />}

        <p className="sub-text">
          About the team involved in the project
        </p>

        <p className="body-text">
          Gusku has been producing music for more than 10 years, from his little studio next to the Flandrin. Gusku is a perfectionist, he likes to produce music way more than mixing other peoples’ sounds, even if he dropped some bombs in Marrakech last year, he is a music maker above all things. This is why he would like to give to the Cosmic Kids community the ownership of his exclusive track: “Rolling Under the Wave”. Each holder being entitled to its fraction of revenue on the track.
        </p>

        <p className='body-text'>
          'Selas Studio' is a brand-new innovative lab' composed of artists, former tech specialists and scientists in a mission to demonstrate that Artificial Intelligence help us complete our understanding of how we function as humans, and push us to outsmart our current level of creativity in a radical way
        </p>

        <p className="body-text">
          Hugo has been recently investigating the web3 space, as an innovation, party and music lover, just out of curiosity. He wonders if this can be used for artists to break labels' walls, get their independence partnering with their fanbase. He also wonders if clubs and festivals will eventually use it as improved versions of members cards to reward their fidelity with exclusive rights.
        </p>

        <div className="footer-container">
          <img alt="Phantom Logo" className="phantom-logo" src={phantomLogo} />
          <a
            className="footer-text"
            href={PHANTOM_LINK}
            target="_blank"
            rel="noreferrer"
          >{`Click here to get your Phantom Wallet!`}</a>
        </div>
      </div>
    </div>
  );
};

export default App;
