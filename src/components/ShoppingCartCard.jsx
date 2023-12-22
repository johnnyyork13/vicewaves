import React from 'react';
import '../styles/shopping-cart-card.css';

export default function ShoppingCartCard(props) {

    const [removeItem, setRemoveItem] = React.useState(false);

    React.useEffect(() => {
        if (removeItem) {
            try {
                const cart = JSON.parse(localStorage.getItem("cart"))
                console.log(cart);
                const filteredCart = cart.filter((product) => product.id !== props.product.id && product);
                console.log(filteredCart);
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
    }
    
    function handleViewProduct() {
        props.setCurrentProduct(props.product.parentProduct);
        props.setPage("viewProduct");
        props.setShowShoppingCart(false);
    }

    console.log("SHOPPING", props.product);

    return (
        <div className="shopping-cart-card">
            {props.product && <>
                <img src={props.product && props.product.files[1].preview_url} />
                <div className="shopping-cart-buttons">
                    <span className="shopping-cart-product-name">{props.product.name}</span>
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