var Web3 = require("web3");

if (window.ethereum) {
    window.web3 = new Web3(window.ethereum);
    // window.ethereum.enable();
} else if (window.web3) {
    window.web3 = new Web3(window.web3.currentProvider);
}
// else {
//     window.alert(
//         "Non-Ethereum browser detected. You should install Metamask wallet first!"
//     );
// }



export const mintNft = async (price, tokenAmount, address) => {

    if (window.web3) {
        var web3 = window.web3;

        const CeloKatzWarriors = require("./CeloKatzWarriors.json");
        const add = web3.utils.toChecksumAddress(process.env.REACT_APP_ADDRESS);
        const contract = new web3.eth.Contract(CeloKatzWarriors.abi, add);
        let e;
        try {
            var correctPrice = web3.utils.toBN(
                web3.utils.toWei(price, "ether").toString()
            );
        } catch (u) {
            console.log('err', u);
        }
        try {
            e = await contract.methods.mint(tokenAmount).estimateGas({
                value: correctPrice * tokenAmount,
                from: address
            })
        } catch (u) {
            console.log('error', u)
        }
        let d = await web3.eth.getGasPrice();
        let c;

        try {
            c = await contract.methods.mint(tokenAmount).send({
                from: address,
                gas: parseInt(e),
                gasPrice: parseInt(1.2 * d),
                value: correctPrice * tokenAmount,
                maxFeePerGas: null,
            })
        } catch (u) {
            console.log('send error', u);
        }

        if (c) {
            return c.status;
        }
    }
}