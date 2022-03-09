import react from 'react';
import logo from './logo.png';
import './App.css';
import image from './bg.jpg';
import nft from './nft.gif';


function Navbar() {
    return (
        <div className="navbar">
            <header className="App-body">
                <div className='container'>
                    <nav className='navbar'>

                        <ul className='nav-item'>
                            <li className='logoo'><img src={logo} alt="" /></li>
                            {/* <li className=""><a href=""></a>Home</li> */}
                            {/* <li className=""><a href=""></a>Mint</li> */}
                        </ul>

                    </nav>
                </div>
            </header>
        </div>
    );
}

export default Navbar;
