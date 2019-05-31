import React from 'react';
import Tilt from 'react-tilt';
import cerebro from './cerebro.png';
import './Logo.css';

const Logo = () => {
    return(
        <nav style={{display: 'flex', justifyContent: 'flex-start', paddingTop:'24px', paddingLeft: '60px'}}>
           <div>
             <Tilt className="Tilt br2 shadow-2" options={{ max : 60 }} style={{ height: 150, width: 150 }} >
                <div className="Tilt-inner pa3"> 
                    <img style={{padding: '10px'}} alt='logo' src={cerebro}/>
                </div>
            </Tilt>
           </div>
        </nav>
    );
}

export default Logo;