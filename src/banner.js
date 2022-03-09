import react from 'react';
import logo from './logo.svg';
import './App.css';
import image from './bg.jpg';
import nft from './nft.gif';
import CounterInput from "react-bootstrap-counter";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { onGetMintData, onCheckMintable } from "./redux/actions/mint";
import { mintNft } from "./web3/web3";

const Banner = (props) => {
    const { preLoading, setPreLoading, account, metamaskConnected, connectToMetamask } = props;
    const [selectedCount, setSelectedCount] = useState(1);
    const dispatch = useDispatch();
    const mintable = useSelector((state) => state.mint);
    const [mintLoading, setMintLoading] = useState(false);
    const [mintStatus, setMintStatus] = useState(false);
    const [viewModal, setViewModal] = useState(false);
    const [networkId, setNetworkId] = useState();
    const [modal, setModal] = useState(false);

    useEffect(async () => {
        const web3 = window.web3;
        const networkId = await web3.eth.net.getId();
        setNetworkId(networkId);
        window.ethereum.on("networkChanged", (networkId) => {
            setNetworkId(networkId);
        });
    });

    useEffect(async () => {
        if (mintable.count || mintable.failedMsg) {
            setPreLoading(false);
        }
        if (mintable.failedMsg) {
            setMintLoading(false);
        }
        if (mintable.mintData.success == true) {
            const price = mintable.mintData.price;
            const tokenAmount = mintable.mintData.tokenAmount;
            await mintNft(price, tokenAmount, account).then(
                (data) => {
                    setMintStatus(data);
                    setMintLoading(false);
                }
            ).catch(err => {
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
            {/* <img src={image} alt="" /> */}
            <div className='nft'>
                <img src={nft} alt="" />
            </div>
            <div className='CounterInputPart'>
                <CounterInput
                    value={1}
                    min={1}
                    max={10}
                    onChange={(value) => {
                        setSelectedCount(value);
                    }}
                />
            </div>
            <div className='button'>
                {/* <button onClick={connectToMetamask}>Connect wallet</button> */}
                {
                    metamaskConnected ?
                        <button onClick={handleMint}>MINT YOUR NAVIKATZ NFTS!</button>
                        :
                        <button onClick={connectToMetamask}>CONNECT WALLET</button>
                }
            </div>
        </div>
    )
}

export default Banner