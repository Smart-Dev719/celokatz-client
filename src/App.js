import "./App.css";
import { useEffect, useState } from "react";
import Footer from "./footer.js";
import Navbar from "./navbar.js";
import Banner from "./banner.js";
import Web3 from "web3";
import store from "./redux/store";
import { Provider } from "react-redux";

function App() {

  const [metamaskConnected, setMetamaskConnnected] = useState(false);
  const [account, setAccount] = useState();
  const [networkId, setNetworkId] = useState();
  const [isMetamask, setIsMetamask] = useState(true);

  useEffect(async () => {
    await loadWeb3().then((data) => {
      if (data !== false) {
        loadBlockchainData();
      }
    });
  }, []);

  const loadWeb3 = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      // window.alert(
      //   "Non-Ethereum browser detected. You should consider trying MetaMask!"
      // );
      setIsMetamask(false);
      return false;
    }
  };

  const loadBlockchainData = async () => {
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    setNetworkId(networkId);

    if (accounts.length == 0) {
      setMetamaskConnnected(false);
    } else {
      setMetamaskConnnected(true);
      setAccount(accounts[0]);
    }

    window.ethereum.on("accountsChanged", (accounts) => {
      if (accounts.length > 0) setAccount(accounts[0]);
      else setAccount();
    });
    window.ethereum.on("networkChanged", (networkId) => {
      setNetworkId(networkId);
    });
  };


  return (
    <Provider store={store}>
      {networkId != 42220 && metamaskConnected && (
        <div className="network-err-msg">
          <h4>Please switch to Celo mainnet. <a href="https://medium.com/defi-for-the-people/how-to-set-up-metamask-with-celo-912d698fcafe" target="_blank" rel="noreferrer">How do I set up Metamask on Celo?</a></h4>
        </div>
      )}
      {!isMetamask && (
        <div className="network-err-msg">
          <h4>You should consider trying <a href="http://metamask.io/" target="_blank" rel="noreferrer">MetaMask!</a></h4>
        </div>
      )}
      <div className="App">
        <Navbar />
        <Banner
          metamaskConnected={metamaskConnected}
          setMetamaskConnnected={setMetamaskConnnected}
          account={account}
        />
      </div>
    </Provider>
  );
}

export default App;
