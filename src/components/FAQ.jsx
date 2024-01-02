import React from 'react';

import '../styles/faq.css'

export default function FAQ(props) {

    return (
        <div className="faq-container" onClick={() => props.setShowFAQ(false)}>
            <div className="faq" onClick={(e) => e.stopPropagation()}>
                <button
                    type="button"
                    className="close-faq-btn main-btn"
                    onClick={() => props.setShowFAQ(false)}
                >Close</button>
                <p className="faq-header-main">FREQUENTLY ASKED QUESTIONS</p>
                <p className="faq-subheader"></p>
                <p className="faq-text"></p>

                <p className="faq-subheader">SHIPPING</p>
                <p className="faq-text">ViceWaves currently only ships in the United States. Our printing provider
                possesses locations all over the country, resulting in a consistently efficient shipping and delivery process.</p>
                <p className="faq-text">Shipping times usually take between 6-18 business days. This can 
                be slightly prolonged by congested periods, like holidays. </p>

                <p className="faq-subheader">CANCELLING OR CHANGING ORDERS</p>
                <p className="faq-text">Since our products are made to order, cancelling an order requires
                immediate contact to prevent unwanted items from being produced. This can be achieved by 
                going to the contact page and sending a cancellation requeset immediately after an incorrect order was placed.</p>
                <p className="faq-text">If an order was made by mistake and must be cancelled, please send a 
                cancellation request within 24 hours after the order was placed.</p>

                <p className="faq-subheader">RETURNS AND EXCHANGES</p>
                <p className="faq-text">ViceWaves does not offer returns or exchanges due to the nature
                of how we manufacture orders. We do, however, offer refunds if an item is received damaged 
                or broken. If this is the case, you may send a request via the contact page. We may ask
                for photos or evidence of the damaged merchandise before a refund is distributed.</p>

                <p className="faq-subheader">LOST, STOLEN, OR LATE SHIPMENTS</p>
                <p className="faq-text">ViceWaves is not liable for lost, stolen, or late shipments once
                the product has left the care of our printing facilities.</p>
                <p className="faq-text">If an order is presumed lost or stolen, we advise you to
                reach out to the assigned postal carrier to receive compensation or further information.</p>

                <p className="faq-subheader">RETURNED TO SENDER ORDERS</p>
                <p className="faq-text">If an order is returned to us due to an address issue, we will
                attempt to contact you to confirm the address. Once the address has been confirmed, the delivery
                will be shipped again.</p>
                <p className="faq-text">If we do not recieve a response in 15 days, the delivery will be 
                donated.</p>

                <p className="faq-subheader">TRACKING INFORMATION</p>
                <p className="faq-text">ViceWaves will provide a tracking number once it is received by our
                printing facilities. This tracking number can be viewed either on your profile, or through
                your provided email.</p>
                <p className="faq-text">The tracking number will not be available immmediately, as it takes
                several days before the delivery is available for shipping.</p>

                <p className="faq-subheader">PARTIAL DELIVERY</p>
                <p className="faq-text">Sometimes orders can be distributed separately due to the possibility of our printing provider
                fulfilling parts of an order separately to hasten delivery. 
                If this happens, multiple packages may be delivered to the same address for 
                the same order. </p>
            </div>
        </div>
    )
}