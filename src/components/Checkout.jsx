import React from 'react';
import PayPalPayment from './PayPalPayment';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";



export default function Checkout(props) {
    
    const [clientId, setClientId] = React.useState(null);

    React.useEffect(() => {
        try {
            async function getPaypalClient() {
                const url = props.root + '/paypal/client';
                await fetch(url, {
                    method: "GET",
                    mode: "cors",
                }).then((res) => res.json())
                .then((clientId) => {
                    console.log(clientId.clientId);
                    setClientId(clientId.clientId)
                }).catch((err) => console.log(err));
            }
            getPaypalClient();
        } catch(err) {
            console.log(err);
        }
    }, [])

    console.log("ID", clientId)

    return (
        <div className="checkout">
            <PayPalScriptProvider>
                {clientId && <PayPalPayment clientId={clientId}/>}
            </PayPalScriptProvider>
        </div>
    )
}


// export default function Checkout(props) {

//     const [clientId, setClientId] = React.useState("");

//     React.useEffect(() => {
//         try {
//             async function getClientId() {
//                 const url = props.root + '/paypal/client';
//                 await fetch(url, {
//                     method: "GET",
//                     mode: 'cors',
//                 }).then((res) => res.json())
//                 .then((clientId) => setClientId({clientId: clientId}))
//                 .catch((err) => console.log(err));
//             }
//             getClientId();
//         } catch(err) {
//             console.log(err);
//         }
//     }, [])

//     const initialOptions = {
//         clientId: "Aano05ZYLqQlX9V5MNe9jf-QRgEzu7IgVjXSL8SW4CDxUDpt-veg3vIqNfknXFWyc_0u73WqT1PUb18S",
//         currency: "USD",
//         intent: "capture",
//     };

//     return (
//         <div className="checkout">
//             <PayPalScriptProvider options={initialOptions}>
//                 <PayPalPayment 
//                     root={props.root}
//                     shoppingCartContents={props.shoppingCartContents}
//                 />
//             </PayPalScriptProvider>
//         </div>
//     )
// }