import React from 'react';
import '../styles/footer.css';

export default function Footer(props) {

    return (
        <footer>
            <div className="footer-links footer-section">
                {/* <a onClick={() => props.setPage('faq')}>FAQ</a> */}
                <a onClick={() => props.setShowAbout(true)}>ABOUT US</a>
                <a onClick={() => props.setShowContact(true)}>CONTACT US</a>
                <a onClick={() => props.setShowPrivacy(true)}>PRIVACY</a>
                <a onClick={() => props.setShowTOS(true)}>TERMS OF SERVICE</a>
                <a onClick={() => props.setShowRefunds(true)}>REFUND POLICY</a>
                <a onClick={() => props.setShowFAQ(true)}>FAQ</a>
                <a>ORDER TRACKING</a>
                {/* <a>TAKE OUR SURVEY {'(FOR REWARDS)'}</a> */}
                <br></br>
                <br></br>
                <p>ViceWaves, 2023</p>
            </div>
            <div className="footer-links footer-section">
            </div>
            <div className="footer-email footer-section">
                <p>GET UPDATES ON SALES AND NEW DESIGNS</p>
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