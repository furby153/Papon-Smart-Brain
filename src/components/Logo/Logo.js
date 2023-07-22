import React from "react";
import Tilt from 'react-parallax-tilt';
import './Logo.css';
import brain from './brain-ai.png';

const Logo = () => {
    return (
        <div className='ma4 mt0'>
            <Tilt
                className="parallax-effect-glare-scale"
                perspective={500}
                glareEnable={true}
                glareMaxOpacity={0.7}
                scale={1.02}
            >
                <div className="inner-element">
                <div><img style={{padding: '5px'}}src={brain} alt='logo'/></div>
                </div>
            </Tilt>
        </div>
    );


}

export default Logo;