import "./App.css";
import { useEffect, useState } from "react";
import Footer from "./footer.js";
import Navbar from "./navbar.js";
import Banner from "./banner.js";
import Web3 from "web3";
import store from "./redux/store";
import { Provider } from "react-redux";

function App() {
  // const [account, setAccount] = useState(); // state variable to set account.
  // useEffect(async () => {
  //   const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  // }, []);
  const [metamaskConnected, setMetamaskConnected] = useState(false);
  const [account, setAccount] = useState();
  const [preLoading, setPreLoading] = useState(false);
  const [networkId, setNetworkId] = useState();
  const [isMetamask, setIsMetamask] = useState(true);

  useEffect(() => {
    async function listenMMAccount() {
      if (window.ethereum) {
        window.ethereum.on("accountsChanged", async function () {
          connectToMetamask();
        });
        window.ethereum.on("chainChanged", async function () {
          connectToMetamask();
        });
      }
    }
    listenMMAccount();
  }, []);

  const connectToMetamask = async () => {
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum);
      window.ethereum.enable();
    } else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider);
    } else {
      // window.alert(
      //   "Non-Ethereum browser detected. You should consider trying MetaMask!"
      // );
      setIsMetamask(false);
      return false;
    }
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
    const networkId = await web3.eth.net.getId();
    setNetworkId(networkId);
    if (accounts.length == 0) {
      setMetamaskConnected(false);
    } else {
      const accounts = await web3.eth.getAccounts();
      console.log("connect info:", accounts);
      setAccount(accounts[0]);
      console.log(accounts[0]);
      setMetamaskConnected(true);
    }
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
          preLoading={preLoading}
          setPreLoading={setPreLoading}
          account={account}
          metamaskConnected={metamaskConnected}
          connectToMetamask={connectToMetamask}
        />
      </div>
    </Provider>
  );
}

export default App;
