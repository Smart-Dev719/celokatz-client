import './App.css';
import { useEffect, useState } from 'react';
import Footer from './footer.js';
import Navbar from './navbar.js';
import Banner from './banner.js';
import Web3 from 'web3';
import store from "./redux/store";
import { Provider } from 'react-redux';

function App() {
  // const [account, setAccount] = useState(); // state variable to set account.
  // useEffect(async () => {
  //   const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
  // }, []);
  const [metamaskConnected, setMetamaskConnected] = useState(false);
  const [account, setAccount] = useState();
  const [preLoading, setPreLoading] = useState(false);

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
      window.alert(
        "Non-Ethereum browser detected. You should consider trying MetaMask!"
      );
    }
    const web3 = window.web3;
    const accounts = await web3.eth.getAccounts();
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
