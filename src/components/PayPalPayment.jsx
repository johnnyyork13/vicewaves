import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import useScript from '../hooks/useScript';

export default function PayPalPayment(props) {

    const [testOrder, setTestOrder] = React.useState(false);

    console.log(props.clientId);
    
    useScript(`https://www.paypal.com/sdk/js?components=buttons,card-fields&client-id=${props.clientId}`)

    React.useEffect(() => {
        if (testOrder) {
            try {
                const url = props.root + '/products/order';
                fetch(url, {
                    method: "POST",
                    mode: 'cors',
                    headers: {
                        "Content-Type":"application/json",
                    },
                    body: JSON.stringify({
                        cart: props.shoppingCartContents
                    })
                }).then((res) => res.json())
                .then((message) => console.log(message))
                .catch((err) => console.log(err));
            } catch(err) {
                console.log(err);
            }
        }
    }, [testOrder])

    async function createOrder() {
        const url = props.root + '/create-paypal-order';
        return fetch(url, {
            method: "POST", 
            headers: {
                "Content-Type": "application/json",
            },
            // use the "body" param to optionally pass additional order information
            // like product ids and quantities
            // body: JSON.stringify({
            //     cart: [
            //         {
            //             id: "Synth Merch",
            //             cost: totalCost,
            //         },
            //     ],
            // }),
            body: JSON.stringify({cart: props.shoppingCartContents})
        })
            .then((response) => response.json())
            .then((order) => order.id)
            .catch((err) => console.log(err));
    }
    async function onApprove(data) {
          const url = props.root + `/capture-paypal-order/${data.orderID}`;
          return fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              orderID: data.orderID
            })
          })
          .then((response) => response.json())
          .then((orderData) => {
                const name = orderData.payer.name.given_name;
                alert(`Transaction completed by ${name}`);
                setTestOrder(true);
          });

    }

    return (
        <PayPalButtons
                createOrder={createOrder}
                onApprove={onApprove}
        />
    )
}