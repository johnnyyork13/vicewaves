import React from 'react';
import PayPalPayment from './PayPalPayment';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";

import '../styles/checkout.css';


export default function Checkout(props) {

    const [payerInfo, setPayerInfo] = React.useState(null);

    React.useEffect(() => {
        if (props.currentUser) {
            try {
                async function getPayerInfo() {
                    const url = props.root + '/get-payer';
                    await fetch(url, {
                        method: "POST",
                        mode: 'cors',
                        credentials: 'include',
                        headers: {
                            "Content-Type":"application/json",
                        },
                        body: JSON.stringify(props.currentUser)
                    }).then((res) => res.json())
                    .then((payer) => setPayerInfo(payer))
                    .catch((err) => console.log(err))
                }
                getPayerInfo();
            } catch(err) {
                console.log(err);
            }
        }
    }, [])

    function calculateTotals() {
        let subTotal = null;
        const taxRate = 0.07;
        props.shoppingCartContents.forEach((product) => {
            subTotal += product.retail_price * product.quantity;
        })
        return {
            subTotal: subTotal,
            tax: subTotal * taxRate,
            total: subTotal + (subTotal * taxRate)
        }
    }

    const totals = calculateTotals();

    const initialOptions = {
        clientId: "Aano05ZYLqQlX9V5MNe9jf-QRgEzu7IgVjXSL8SW4CDxUDpt-veg3vIqNfknXFWyc_0u73WqT1PUb18S",
        currency: "USD",
        intent: "capture",
    };

    return (
        <div className="checkout">
            <div className="paypal-container">
                <p className="paypal-header">Checkout Information</p>
                <br></br>
                <div className="checkout-extra">
                    <div className="checkout-extra-section">
                        <p className="checkout-extra-subheader">Account</p>
                        <p className="checkout-extra-info-text">{props.currentUser.email}</p>
                    </div>
                    <div className="checkout-extra-section">
                        <div className="checkout-extra-checkbox-container">
                            <input name="promo" type="checkbox" placeholder='CODE' />
                            <label>Email me with news and offers</label>
                        </div>
                    </div>
                    <div className="checkout-extra-section">
                        <p className="checkout-extra-subheader">Phone</p>
                        <p className="checkout-extra-info-text">{props.currentUser.phone}</p>
                    </div>
                    <div className="checkout-extra-section">
                        <p className="checkout-extra-subheader">Discount Code or Gift Card</p>
                        <div className="checkout-extra-input-container">
                            <input name="promo" type="text" placeholder='CODE' />
                            <button className="main-btn">APPLY</button>
                        </div>
                    </div>
                    
                </div>
                <br></br>
                <p className="paypal-header">Payment Options</p>
                <PayPalScriptProvider options={initialOptions}>
                    <PayPalPayment 
                        root={props.root}
                        shoppingCartContents={props.shoppingCartContents}
                        setPayerInfo={setPayerInfo}
                    />
                </PayPalScriptProvider>
            </div>
            <div className="checkout-totals-container">
                <p className="checkout-totals-header">Billing Address and Information</p>
                {payerInfo && <div className="checkout-shipping-info">
                    <p>{payerInfo.name}</p>
                    <p>{payerInfo.address1}</p>
                    <p>{payerInfo.city}, {payerInfo.state_code}</p>
                    <p>{payerInfo.country_code} {payerInfo.zip}</p>
                    <br></br>
                </div>}
                <div className="checkout-subtotal">
                    Subtotal: ${totals.subTotal}
                </div>
                <div className="checkout-tax">
                    Tax: ${totals.tax.toFixed(2)}
                </div>
                <br></br>
                <div className="checkout-total">
                    Total: ${totals.total}
                </div>
                
            </div>
        </div>
    )
}

// export default function Checkout(props) {
    
//     const [clientId, setClientId] = React.useState(null);

//     React.useEffect(() => {
//         try {
//             async function getPaypalClient() {
//                 const url = props.root + '/paypal/client';
//                 await fetch(url, {
//                     method: "GET",
//                     mode: "cors",
//                 }).then((res) => res.json())
//                 .then((clientId) => {
//                     console.log(clientId.clientId);
//                     setClientId(clientId.clientId)
//                 }).catch((err) => console.log(err));
//             }
//             getPaypalClient();
//         } catch(err) {
//             console.log(err);
//         }
//     }, [])

//     console.log("ID", clientId)

//     return (
//         <div className="checkout">
//             <PayPalScriptProvider>
//                 {clientId && <PayPalPayment clientId={clientId}/>}
//             </PayPalScriptProvider>
//         </div>
//     )
// }


