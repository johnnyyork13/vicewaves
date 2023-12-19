import React from 'react';
import '../styles/shopping-cart-card.css';

export default function ShoppingCartCard(props) {

    const [removeItem, setRemoveItem] = React.useState(false);

    React.useEffect(() => {
        if (removeItem) {
            try {
                localStorage.removeItem(props.product.id);
                props.setShoppingCartContents((prev) => prev.filter((product) => product.id !== props.product.id && product));
                setRemoveItem(false);
            } catch(err) {
                console.log(err);
            }
        }
    }, [removeItem])

    React.useEffect(() => {
        localStorage.setItem(props.product.id, JSON.stringify(props.product));
    }, [props.shoppingCartContents])

    function handleQuantityChange(e) {
        props.setShoppingCartContents((prev) => prev.map((product) => product.id === props.product.id ? ({
            ...product,
            quantity: e.target.value
        }) : product))
    }
    
    function handleViewProduct() {
        props.setPage("viewProduct");
        props.setCurrentProduct(props.product);
        props.setShowShoppingCart(false);
    }

    return (
        <div className="shopping-cart-card">
            {props.product && <>
                <img src={props.product.thumbnail_url} />
                <div className="shopping-cart-buttons">
                    <span>{props.product.name}</span>
                    <button onClick={handleViewProduct}>View</button>
                    <input 
                        onChange={handleQuantityChange}
                        type="number" 
                        value={props.product.quantity}
                        min="1"
                        ></input>
                    <button onClick={() => setRemoveItem(true)}>Remove</button>
                </div>
            </>}
        </div>
    )
}