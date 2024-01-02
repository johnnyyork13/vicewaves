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
        <div className="contact-container" onClick={() => props.setShowContact(false)}>
            <div className="contact" onClick={(e) => e.stopPropagation()}>
                <button
                    type="button"
                    className="close-contact-btn main-btn"
                    onClick={() => props.setShowContact(false)}
                >Close</button>
                {/* <p onClick={() => props.setPage("home")} className="contact-text contact-header-link"><KeyboardBackspaceIcon />Back Home</p> */}
                <p className="contact-header-main">Contact Us</p>
                <br></br>
                <p className="contact-text">Before attempting to contact us, please read through our FAQ.
                If you are unable to find a solution to your issue there, then you may reach out via email
                or phone.</p>
                <br></br>
                <p className="contact-text">We will try to respond to your inqurity within 48 hours. However,
                we are a small team, so the response time may be longer during busier seasons. Thanks. </p>
                <br></br>
                <p className="contact-header">Email</p>
                <p className="contact-text">support@vicewaves.com</p>
                <p className="contact-header">Phone</p>
                <p className="contact-text">(706) 238-0872</p>
                <br></br>
            </div>
        </div>
    )
}