import React from 'react';
import '../styles/footer.css';

export default function Footer(props) {

    return (
        <footer>
            <div className="footer-links footer-section">
                <a>ORDER TRACKING</a>
                <a>FAQ</a>
                <a>ABOUT US</a>
                <a>CONTACT US</a>
                <a>PRIVACY</a>
                <a>TERMS OF SERVICE</a>
                <br></br>
                <br></br>
                <p>SynthMerch, 2023</p>
            </div>
            <div className="footer-about footer-section">
                Est anim exercitation cillum qui aliqua commodo commodo in excepteur veniam tempor ullamco velit. Dolor velit deserunt minim sint cupidatat eu culpa excepteur laborum pariatur. Veniam minim in laborum reprehenderit non quis dolore qui nostrud exercitation sint commodo excepteur. In quis ad ea nisi et non amet fugiat dolore laborum id Lorem.
            </div>
            <div className="footer-email footer-section">
                <p>Join our email list!</p>
                <div className="footer-email-container">
                    <input
                        className="footer-input"
                        type="email"
                        name="email"
                        placeholder='email@example.com' />
                    <button className="main-btn footer-btn">Subscribe</button>
                </div>
            </div>
        </footer>
    )
}