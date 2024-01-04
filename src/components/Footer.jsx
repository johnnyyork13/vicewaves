import React from 'react';
import '../styles/footer.css';
import logo from '../assets/vice-logo.png';

import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import EmailIcon from '@mui/icons-material/Email';
import { Face } from '@mui/icons-material';

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
            <div className="footer-section-socials">
                <img src={logo} />
                <p>ViceWaves was created by artists who love Synthwave and who want to be
                    a part of the Synthwave movement. If you want to join the movement too, 
                    reach out to us on one of our socials.
                </p>
                <div className="footer-socials">
                    <InstagramIcon />
                    <FacebookIcon />
                    <TwitterIcon />
                    <EmailIcon />
                </div>
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