import React from 'react';
import '../styles/hero.css';
import hero from '../assets/hero-blank.png';

import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

export default function Hero(props) {

    function handleHeroClick() {
        props.setCategorySearch({
            category: null,
            categorySearchTerm: "new",
        })
        props.setPage("viewCategory");
    }

    return (
        <div className="hero" onClick={handleHeroClick}>
            <img src={hero}/>
            <div className="hero-text-container">
                <p>{props.header}</p>
                {props.redirect &&
                    <button 
                        className="main-btn hero-btn"
                        onClick={handleHeroClick}
                    >{props.redirectText}<ArrowOutwardIcon />
                    </button>
                }
            </div>
        </div>
    )
}