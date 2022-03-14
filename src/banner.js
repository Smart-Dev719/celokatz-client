import "./App.css";
import nft from "./nft.gif";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { onCheckMintable, onGetMintData } from "./redux/actions/mint";
import { mintNft } from "./web3/web3";
import { FaPlus, FaMinus } from "react-icons/fa";
import swal from 'sweetalert';

const Banner = (props) => {
  const {
    preLoading,
    setPreLoading,
    account,
    metamaskConnected,
    connectToMetamask,
  } = props;
  const [selectedCount, setSelectedCount] = useState(1);
  const dispatch = useDispatch();
  const mintable = useSelector((state) => state.mint);
  const [mintLoading, setMintLoading] = useState(false);
  const [mintStatus, setMintStatus] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  // const [networkId, setNetworkId] = useState();
  const [modal, setModal] = useState(false);

  // useEffect(async () => {
  //   const web3 = window.web3;
  //   const networkId = await web3.eth.net.getId();
  //   setNetworkId(networkId);
  //   window.ethereum.on("networkChanged", (networkId) => {
  //     setNetworkId(networkId);
  //   });
  // });

  useEffect(async () => {
    if (account) {
      dispatch(onCheckMintable({ address: account }));
    }
  }, [account]);

  useEffect(async () => {
    if (mintable.count || mintable.failedMsg) {
      setPreLoading(false);
    }
    if (mintable.failedMsg) {
      setMintLoading(false);
      swal("Sorry!", mintable.failedMsg, "warning");
    }
    if (mintable.mintData.success == true) {
      const price = mintable.mintData.price;
      const tokenAmount = mintable.mintData.tokenAmount;
      await mintNft(price, tokenAmount, account)
        .then((data) => {
          setMintStatus(data);
          setMintLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [mintable]);

  useEffect(() => {
    if (mintStatus) {
      setViewModal(true);
    }
  }, [mintStatus]);

  const handleMint = () => {
    setMintLoading(true);
    dispatch(onGetMintData({ address: account, count: selectedCount }));
  };

  const handleClose = () => {
    setViewModal(false);
  };

  return (
    <div className="Banner">
      <div className="nft">
        <img src={nft} alt="" draggable={false} />
      </div>
      <div className="CounterInput">
        <span
          className="ArrowIcon leftIcon "
          onClick={() => {
            console.log("minus");
            if (selectedCount > 1) {
              setSelectedCount(selectedCount - 1);
            }
          }}
        >
          <FaMinus />
        </span>
        <span className="CounterValue">{selectedCount}</span>
        <span
          className="ArrowIcon rightIcon"
          onClick={() => {
            console.log("plus");
            // if (selectedCount < mintable.count) {
            //   setSelectedCount(selectedCount + 1);
            // }
            if (account) {
              if (selectedCount < mintable.count) {
                setSelectedCount(selectedCount + 1);
              }
            } else {
              swal("Sorry!", "Please connect wallet, first!", "warning");
            }
          }}
        >
          <FaPlus />
        </span>
      </div>
      {/* <button onClick={connectToMetamask}>Connect wallet</button> */}
      {metamaskConnected ? (
        mintable.count > 0 ? (
          <button className="MintBtn" onClick={handleMint}>
            MINT YOUR NAVIKATZ NFTS!
          </button>
        ) : (
          <button className="MintBtn disable">
            MINT YOUR NAVIKATZ NFTS!
          </button>
        )
      ) : (
        <button className="MintBtn" onClick={connectToMetamask}>
          CONNECT WALLET
        </button>
      )}
    </div>
  );
};

export default Banner;
