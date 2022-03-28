import "./App.css";
import nft from "./nft.gif";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { onCheckMintable, onGetMintData } from "./redux/actions/mint";
import { mintNft } from "./web3/web3";
import { FaPlus, FaMinus } from "react-icons/fa";
import swal from 'sweetalert';
import Modal from "react-modal";
import { CloseOutlined } from '@ant-design/icons';
import logo from "./logo.png";

const Banner = (props) => {
  const { metamaskConnected, account, setMetamaskConnnected } = props;

  const dispatch = useDispatch();
  const [count, setCount] = useState(1);
  const [preLoading, setPreLoading] = useState(false);
  const [selectedCount, setSelectedCount] = useState(1);
  const mintable = useSelector((state) => state.mint);
  const [mintLoading, setMintLoading] = useState(false);
  const [mintStatus, setMintStatus] = useState(false);
  const [viewModal, setViewModal] = useState(false);
  const [networkId, setNetworkId] = useState();
  const [modal, setModal] = useState(false);


  const handleConnectWallet = async () => {
    if (window.ethereum) {
      await window.ethereum.enable();
      setMetamaskConnnected(true);
      window.location.reload();
    }
  };

  useEffect(() => {
    if (account) {
      setPreLoading(true);
      dispatch(
        onCheckMintable({
          address: account,
        })
      );
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
      <Modal
        isOpen={viewModal}
        onRequestClose={() => setViewModal(false)}
        contentLabel="Example Modal"
        className="ConnectModal"
        overlayClassName="ConnectModalOverlay"
      >
        <div className="ConnectModalMain d-flex flex-column justify-content-center align-items-center">
          <div className="ModalHeader d-flex flex-column justify-content-between">
            <div className="d-flex justify-content-between">
              <span className="ModalHeaderText"><img src={logo} className="ModalLogo" alt='' /></span><span onClick={() => setViewModal(false)}><CloseOutlined className="ModalCloseBtn" /></span>
            </div>
            <div className="ModalDescription d-flex flex-column align-items-center">
              <span className="ModalTitle">Congratulations!</span>
              <a href="https://testnets.nftrade.com/assets/fuji/0xd151621eedbefb10704acebe1c841550cb8ac83e" className="ModalText" target="_blank"
                rel="noreferrer">You have successfully minted your NAVIKATZ NFT !</a>
            </div>
          </div>

        </div>
      </Modal>
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
            if (selectedCount < 10) {
              setSelectedCount(selectedCount + 1);
            }
            // if (account) {
            //   if (selectedCount < mintable.count) {
            //     setSelectedCount(selectedCount + 1);
            //   }
            // } else {
            //   swal("Sorry!", "Please connect wallet, first!", "warning");
            // }
          }}
        >
          <FaPlus />
        </span>
      </div>
      {/* <button onClick={connectToMetamask}>Connect wallet</button> */}
      {metamaskConnected && account ? (
        // mintable.count > 0 ? (
        //   <button className="MintBtn" onClick={handleMint}>
        //     MINT YOUR NAVIKATZ NFTS!
        //   </button>
        // ) : (
        //   <button className="MintBtn disable">
        //     MINT YOUR NAVIKATZ NFTS!
        //   </button>
        // )

        <button className="MintBtn" onClick={handleMint}>
          MINT YOUR NAVIKATZ NFTS!
        </button>

      ) : (
        <button className="MintBtn"
          onClick={() => {
            handleConnectWallet();
          }}>
          CONNECT WALLET
        </button>
        // <button className="MintBtn" >
        //   Please register on our Whitelists!
        // </button>
      )}
    </div>
  );
};

export default Banner;
