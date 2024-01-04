import React from 'react';
import '../styles/hero.css';
import hero from '../assets/hero-blank.png';

export default function Hero(props) {

    return (
        <div className="hero" >
            <img src={hero}/>
            <p>{props.header}</p>
        </div>
    )
}