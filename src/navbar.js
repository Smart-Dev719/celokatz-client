import react from "react";
import logo from "./logo.png";
import "./App.css";
import image from "./bg.jpg";
import nft from "./nft.gif";

function Navbar() {
  return (
    <div className="PageHeader">
      <img src={logo} alt="" draggable={false} />
      {/* <li className=""><a href=""></a>Home</li> */}
      {/* <li className=""><a href=""></a>Mint</li> */}
    </div>
  );
}

export default Navbar;
