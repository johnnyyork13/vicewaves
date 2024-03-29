import React from 'react';
import {v4 as uuidv4} from 'uuid';
import PayPalPayment from './PayPalPayment';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import ShoppingCartCard from './ShoppingCartCard';

import '../styles/checkout.css';


export default function Checkout(props) {

    const [payerInfo, setPayerInfo] = React.useState(null);

    React.useEffect(() => {
        if (props.shoppingCartContents.length === 0) {
            props.setPage('home');
        }
    }, [props.shoppingCartContents])

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
        const taxRate = 0.1;
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

    const mappedShoppingCartContents = props.shoppingCartContents.map((product) => {
        return <ShoppingCartCard 
                key={uuidv4()}
                product={product}
                setShoppingCartContents={props.setShoppingCartContents}
                shoppingCartContents={props.shoppingCartContents}
                setShowShoppingCart={props.setShowShoppingCart}
                setPage={props.setPage}
                setCurrentProduct={props.setCurrentProduct}
        />
    })

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
                    {props.currentUser && <>
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
                    </>}
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
                <p className="paypal-text">All payments are encrypted and secured</p>
                <PayPalScriptProvider options={initialOptions}>
                    <PayPalPayment 
                        root={props.root}
                        shoppingCartContents={props.shoppingCartContents}
                        setShoppingCartContents={props.setShoppingCartContents}
                        currentUser={props.currentUser}
                        setPayerInfo={setPayerInfo}
                        setPage={props.setPage}
                    />
                </PayPalScriptProvider>
                <br></br>
                <a href="https://www.paypal.com/us/legalhub/privacy-full" target="_blank">PayPal Privacy Statement</a>
                <a href="https://www.paypal.com/us/legalhub/useragreement-full" target="_blank">PayPal User Agreement</a>
            </div>
            <div className="checkout-totals-container">
                <p className="checkout-totals-header">Your ViceWaves Merch</p>
                <div className="checkout-merch">
                    {mappedShoppingCartContents}
                </div>
                {payerInfo && <p className="checkout-totals-header">Billing Address and Information</p>}
                {!payerInfo && <p className="checkout-totals-header">Order Amount</p>}
                <div className="checkout-subtotal">
                    Shipping is always on the house with ViceWaves!
                </div>
                <br></br>
                {payerInfo && <div className="checkout-shipping-info">
                    <p>{payerInfo.firstName} {payerInfo.lastName}</p>
                    <p>{payerInfo.address1}</p>
                    {payerInfo.address2 && <p>{payerInfo.address2}</p>}
                    <p>{payerInfo.city}, {payerInfo.state_code}</p>
                    <p>{payerInfo.country_code} {payerInfo.zip}</p>
                    <br></br>
                </div>}
                <div className="checkout-subtotal">
                    Subtotal: ${Number(totals.subTotal).toFixed(2)} {`(${props.shoppingCartContents.length} Item${props.shoppingCartContents.length > 1 ? "s" : ""})`}
                </div>
                <div className="checkout-subtotal">
                    Shipping: FREE
                </div>
                <div className="checkout-tax">
                    Tax: ${totals.tax.toFixed(2)}
                </div>
                <br></br>
                <div className="checkout-total">
                    Total: ${Number(totals.total).toFixed(2)}
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


