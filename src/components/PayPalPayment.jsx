import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import useScript from '../hooks/useScript';

export default function PayPalPayment(props) {

    const [recipient, setRecipient] = React.useState(null);
    const [cartIdList, setCartIdList] = React.useState([]);
    const [renderComplete, setRenderComplete] = React.useState(false);

    //pop up order confirmation modal that does not allow click through on background
    
    React.useEffect(() => {
        setCartIdList(() => {
            return props.shoppingCartContents.map((product) => product.id);
        }, setRenderComplete(true))
    }, [props.shoppingCartContents])

    console.log(cartIdList);

    React.useEffect(() => {
        if (recipient) {
            try {
                const url = props.root + '/products/order';
                fetch(url, {
                    method: "POST",
                    mode: 'cors',
                    credentials: "include",
                    headers: {
                        "Content-Type":"application/json",
                    },
                    body: JSON.stringify({
                        recipient: recipient,
                        cart: props.shoppingCartContents
                    })
                }).then((res) => res.json())
                .then((message) => console.log(message))
                .catch((err) => console.log(err));
            } catch(err) {
                console.log(err);
            }
        }
    }, [recipient])

    async function createOrder() {
        const url = props.root + '/create-paypal-order';
        return fetch(url, {
            method: "POST", 
            credentials: "include",
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
            body: JSON.stringify({
                cart: cartIdList,
            })
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
          .then((order) => {
                console.log(order);
                const name = order.payer.name.given_name;
                alert(`Transaction completed by ${name}`);
                const info = order.purchase_units[0].shipping
                setRecipient({
                    name: info.name.full_name,
                    address1: info.address.address_line_1,
                    city: info.address.admin_area_2,
                    state_code: info.address.admin_area_1,
                    country_code: info.address.country_code,
                    zip: info.address.postal_code,
                });
          });

    }

    return (
            <>
                {renderComplete && <PayPalButtons
                    createOrder={createOrder}
                    onApprove={onApprove}
                />}
            </>

    )
}