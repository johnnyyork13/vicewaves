import React from 'react';

import '../styles/refunds.css';

export default function Refunds(props) {

    return (
        <div className="returns-container" onClick={() => props.setShowRefunds(false)}>
            <div className="returns" onClick={(e) => e.stopPropagation()}>
                <button
                    type="button"
                    className="close-tos-btn main-btn"
                    onClick={() => props.setShowRefunds(false)}
                >Close</button>
                <div className="returns-text">
                    <p className="returns-header-main">Refund Policy</p>
                    <p className="returns-text">
                        ViceWaves offers a 100% satisfaction guarantee and will refund a purchase
                        if the item has been unworn and unwashed. Otherwise, a refund cannot be issued.

                        This refund can be in the form of the payment used, or a gift card that can be redeemed 
                        on ViceWaves. 
                    </p>
                </div>
            </div>
        </div>
    )
}