import React from 'react';
import ShoppingCartCard from './ShoppingCartCard';
import {v4 as uuidv4} from 'uuid';
import '../styles/shopping-cart.css';

export default function ShoppingCart(props) {

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

    
    return (
        <div className="shopping-cart-background">
            <div className="shopping-cart">
                <button
                    className="exit-btn" 
                    onClick={() => props.setShowShoppingCart(false)}>Close</button>
                <div className="shopping-cart-items-container">
                    {mappedShoppingCartContents}
                </div>
                <button
                    className="checkout-btn main-btn"
                    onClick={() => props.setPage("checkout")}>Checkout</button>
            </div>
        </div>
    )
}