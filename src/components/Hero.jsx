import React from 'react';
import '../styles/hero.css';
import hero from '../assets/hero-blank.png';

import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

export default function Hero(props) {

    return (
        <div className="hero" onClick={() => props.setPage(props.redirect)}>
            <img src={hero}/>
            <div className="hero-text-container">
                <p>{props.header}</p>
                {/* {props.redirect &&
                    <button 
                        className="main-btn hero-btn"
                        onClick={() => props.setPage=(props.redirect)}
                    >{props.redirectText}<ArrowOutwardIcon />
                    </button>
                } */}
            </div>
        </div>
    )
}