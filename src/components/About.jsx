import React from 'react';
import '../styles/about.css';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export default function About(props) {

    return (
        <div className="about-container" onClick={() => props.setShowAbout(false)}>
            <div className="about" onClick={(e) => e.stopPropagation()}>
                <button
                    type="button"
                    className="close-about-btn main-btn"
                    onClick={() => props.setShowAbout(false)}
                >Close</button>
                {/* <p onClick={() => props.setPage("home")} className="about-text about-header-link"><KeyboardBackspaceIcon />Back Home</p> */}
                <p className="about-header-main">About SynthMerch</p>
                <p className="about-header">Synthwave is life</p>
                <p className="about-text">Synthwave music
                is unique and beautiful. I believe that art derived from this genre of music should also be
                equally unique and beautiful.</p>
                <p className="about-header">All art is original</p>
                <p className="about-text">My designs are all unique and are derived from Synthwave culture.
                </p>
                <p className="about-header">Our products are high quality</p>
                <p className="about-text">Every order is made with the best material, so your vibrant
                colors stay vibrant and your synthiest styles stay synthiest.</p>
                <p className="about-header">Made to order</p>
                <p className="about-text">Every purchase is made to order, so your new look will
                arrive clean and fresh, instead of matted and faded from sitting in a warehouse all day.</p>
                <p className="about-header">Be a part of the Synthwave movement</p>
                <p className="about-text">Join a growing community of people who love this beautiful and
                nostalgic art style!</p>
                <br></br>
                {/* <p className="about-header about-header-link">See what's new<ArrowOutwardIcon /></p> */}
            </div>
        </div>
    )
}