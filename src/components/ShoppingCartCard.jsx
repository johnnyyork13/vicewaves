import React from 'react';
import '../styles/shopping-cart-card.css';

export default function ShoppingCartCard(props) {

    const [removeItem, setRemoveItem] = React.useState(false);

    React.useEffect(() => {
        if (removeItem) {
            try {
                const cart = JSON.parse(localStorage.getItem("cart"))
                const filteredCart = cart.filter((product) => product.id !== props.product.id && product);
                localStorage.setItem("cart", JSON.stringify(filteredCart));
                props.setShoppingCartContents((prev) => prev.filter((product) => product.id !== props.product.id && product));
                setRemoveItem(false);
            } catch(err) {
                console.log(err);
            }
        }
    }, [removeItem])
    

    // React.useEffect(() => {
    //     localStorage.setItem(props.product.id, JSON.stringify(props.product));
    // }, [props.shoppingCartContents])

    function handleQuantityChange(e) {
        props.setShoppingCartContents((prev) => prev.map((product) => product.id === props.product.id ? ({
            ...product,
            quantity: e.target.value
        }) : product))
        const cartsInStorage = JSON.parse(localStorage.getItem("cart"));
        for (const key in cartsInStorage) {
            if (cartsInStorage[key].id === props.product.id) {
                cartsInStorage[key] = {
                    ...cartsInStorage[key],
                    quantity: e.target.value,
                }
            }
        }
        localStorage.setItem("cart", JSON.stringify(cartsInStorage));
    }
    
    function handleViewProduct() {
        props.setCurrentProduct(props.product.parentProduct);
        props.setPage("viewProduct");
        if (props.setShowShoppingCart) {
            props.setShowShoppingCart(false);
        }
    }

    return (
        <div className="shopping-cart-card">
            {props.product && <>
                <img
                    onClick={handleViewProduct} 
                    src={props.product && props.product.files[1].preview_url} />
                <div className="shopping-cart-buttons">
                    <span className="shopping-cart-product-name">{props.product.name}</span>
                    <span className="shopping-cart-product-name">${Number(Number(props.product.retail_price) * props.product.quantity).toFixed(2)}</span>
                    <label>Edit Quantity:
                        <input
                            onChange={handleQuantityChange}
                            type="number"
                            value={props.product.quantity}
                            min="1"
                        />
                    </label>
                    <div className="shopping-cart-buttons-group">
                        <button
                            className="main-btn shopping-cart-btn"
                            onClick={() => setRemoveItem(true)}>
                        Remove</button>
                        <button
                            className="main-btn shopping-cart-btn"
                            onClick={handleViewProduct}>
                        View</button>
                    </div>
                </div>
            </>}
        </div>
    )
}