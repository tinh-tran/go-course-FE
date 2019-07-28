import React from 'react';
import WebLogo from './logo.png';
import './logo.css';

class Logo extends React.Component{
    render(){
        return (          
            <img id='weblogo' src={WebLogo} alt='WebLogo' />
        )
    }
}

export default Logo;