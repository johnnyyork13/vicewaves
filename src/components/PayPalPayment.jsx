import React from 'react';
import { PayPalButtons } from '@paypal/react-paypal-js';
import useScript from '../hooks/useScript';

export default function PayPalPayment(props) {

    const [cartIdList, setCartIdList] = React.useState([]);
    const [renderComplete, setRenderComplete] = React.useState(false);
    const [orderId, setOrderId] = React.useState(null);

    //pop up order confirmation modal that does not allow click through on background
    
    React.useEffect(() => {
        setCartIdList(() => {
            return props.shoppingCartContents.map((product) => ({id: product.id, quantity: product.quantity}));
        }, setRenderComplete(true))
    }, [props.shoppingCartContents])

    async function createOrder() {
        const url = props.root + '/create-paypal-order';
        return fetch(url, {
            method: "POST", 
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
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
              username: props.currentUser ? props.currentUser.username : null,
              cart: cartIdList
            })
          })
          .then((response) => response.json())
          .then((order) => {
                console.log("ORDER RESPONSE", order);
                setOrderId(order.data.result.id);
          });
    }

    function handleConfirmedOrder(page) {
        props.setShoppingCartContents([]);
        localStorage.removeItem("cart");
        props.setPage(page);
    }

    return (
            <>
                {orderId && <div className="order-success-modal-background">
                    <div className="order-success-modal">
                        <p className="order-success-modal-header">Order #{orderId} Has Been Placed!</p>
                        {props.currentUser && <p className="order-success-modal-text">
                            Orders and tracking information can be viewed on your profile when it becomes
                            available. <a onClick={() => handleConfirmedOrder("profile")}>Go to Profile</a>
                        </p>}
                        {!props.currentUser && <>
                            <p className="order-success-modal-text">
                                Order and tracking information will be sent via email when it becomes available. 
                            </p>
                            <p className="order-success-modal-text">
                                Also, creating an account only takes a few seconds and provides an easy way to view
                                all of your orders in one place. <a onClick={() => handleConfirmedOrder("signup")}>Create your account here</a>
                            </p>
                        </>}
                        <button 
                            className="main-btn order-success-modal-btn"
                            onClick={() => handleConfirmedOrder("home")}
                        >Confirm</button>
                    </div>
                </div>}
                {renderComplete && 
                <div className="paypal-buttons-container">
                    <PayPalButtons
                        createOrder={createOrder}
                        onApprove={onApprove}
                        showSpinner={true}
                    />
                </div>}
            </>

    )
}