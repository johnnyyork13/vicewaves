import React from 'react';
import '../styles/contact.css';

import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';

export default function Contact(props) {
    
    const [message, setMessage] = React.useState({
        email: "",
        subject: "",
        body: "",
    })

    function handleMessageChange(e) {
        setMessage((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <div className="contact-container">
            <div className="contact">
                <p onClick={() => props.setPage("home")} className="contact-text contact-header-link"><KeyboardBackspaceIcon />Back Home</p>
                <p className="contact-header-main">Contact Us</p>
                <br></br>
                <p className="contact-header">Customer Support</p>
                <p className="contact-text">me@johnnyyork.dev</p>
                <p className="contact-text">(706) 238-0872</p>
                <br></br>
                <p className="contact-text">Or</p>
                <br></br>
                <p className="contact-header">Send a direct message</p>
                <div className="contact-message-container">
                    <input onChange={handleMessageChange} value={message.email} className="contact-email contact-input" type="email" placeholder="Email" name="email" />
                    <input onChange={handleMessageChange} value={message.subject} className="contact-subject contact-input" type="text" placeholder="Subject" name="subject" />
                    <textarea onChange={handleMessageChange} value={message.body} className="contact-body" name="body" placeholder="Message Body" />
                    <button className="main-btn contact-message-btn" type="button" >Send</button>
                </div>
            </div>
        </div>
    )
}