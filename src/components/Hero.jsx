import React from 'react';
import '../styles/hero.css';
import hero from '../assets/hero.png';

export default function Hero(props) {

    return (
        <div 
            className="hero" 
            >
        <img 
            src={hero}
        />
        </div>
    )
}