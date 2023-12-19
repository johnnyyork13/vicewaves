import React from 'react';
import '../styles/hero.css';

export default function Hero(props) {

    return (
        <div 
            className="hero" 
            onClick={() => props.clickFunction(props.clickValue)}>
        <img />
        </div>
    )
}