import React from 'react';
import ShoppingCartCard from './ShoppingCartCard';
import {v4 as uuidv4} from 'uuid';
import '../styles/shopping-cart.css';

export default function ShoppingCart(props) {

    let shoppingCartTotal = 0;

    const mappedShoppingCartContents = props.shoppingCartContents.map((product) => {
        shoppingCartTotal += Number(product.quantity * product.retail_price);
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

    return (
        <div onClick={() => props.setShowShoppingCart(false)} className="shopping-cart-background">
            <div onClick={(e) => e.stopPropagation()} className="shopping-cart">
                <button
                    className="exit-btn" 
                    onClick={() => props.setShowShoppingCart(false)}>Close</button>
                {mappedShoppingCartContents.length === 0 && <>
                    <p className="empty-cart-text">Your cart is currently lacking merchandise of the Synthwave variety...</p>
                    <button
                        className="main-btn shopping-cart-browse-btn" 
                        onClick={() => {
                        props.setPage("home")
                        props.setShowShoppingCart(false)
                    }}>Shop Synthwave Merch</button>
                </>}
                <div className="shopping-cart-items-container">
                    {mappedShoppingCartContents}
                </div>
                {mappedShoppingCartContents.length > 0 && <>
                    <p className="shopping-cart-total">Subtotal: ${shoppingCartTotal.toFixed(2)}</p>
                    <button
                    className="checkout-btn main-btn"
                    onClick={() => {props.setShowShoppingCart(false); props.setPage("checkout")}}>Checkout</button>
                </>}
            </div>
        </div>
    )
}