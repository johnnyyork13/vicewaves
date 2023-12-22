import React from 'react';
import {v4 as uuidv4} from 'uuid';
import '../styles/view-product.css';

export default function ViewProduct(props) {

    console.log(props.currentProduct);

    const [selectedVariant, setSelectedVariant] = React.useState(props.currentProduct.sync_variants[0])
    const [addToCart, setAddToCart] = React.useState(false);
    const [sizeCharts, setSizeCharts] = React.useState(null);
    const [showSizeCharts, setShowSizeCharts] = React.useState(false);
    const [mainImage, setMainImage] = React.useState(props.currentProduct.thumbnail_url);
    const [quantity, setQuantity] = React.useState(1);

    React.useEffect(() => {
        try {
            const productID = props.currentProduct.sync_variants[0].product.product_id || props.currentProduct.id;
            setMainImage(props.currentProduct.thumbnail_url);
            async function getSizeChart() {
                const url = props.root + '/products/size/' + productID;
                await fetch(url, {
                    method: "GET",
                    mode: "cors",
                }).then((res) => res.json())
                .then((chart) => setSizeCharts(chart.charts.result.size_tables))
                .catch(() => setSizeCharts(null));
            }
            getSizeChart();
        } catch(err) {
            console.log(err);
        }
    }, [props.currentProduct])

    React.useEffect(() => {
        if (addToCart) {
            try {            
                props.setShoppingCartContents((prev) => [
                    ...prev,
                    {...selectedVariant,
                        quantity: quantity,
                        parentProduct: props.currentProduct}
                ])
    
                const localStoragePrev = JSON.parse(localStorage.getItem("cart"));
                if (!localStoragePrev) {
                    localStorage.setItem("cart", JSON.stringify([{...selectedVariant, quantity: quantity, parentProduct: props.currentProduct}]));
                } else {
                    localStorage.setItem("cart", JSON.stringify([...localStoragePrev, {...selectedVariant, quantity: quantity, parentProduct: props.currentProduct}]))
                }
                //localStorage.setItem(props.currentProduct.id, JSON.stringify(props.currentProduct));
                setAddToCart(false);
            } catch(err) {
                console.log(err);
            }
        }

    }, [addToCart])
    

    function handleAddToCart() {
        let itemExists = false;
        props.shoppingCartContents.forEach((product) => {
            if (product.id === Number(props.currentProduct.id)) {
                itemExists = true;
            }
        })
        if (!itemExists) {
            setAddToCart(true);
        }
    }

    function handleVariantChange(e) {
        const id = e.target.value;
        props.currentProduct.sync_variants.forEach((variant) => {
            if (variant.id === Number(id)) {
                setSelectedVariant(variant);
                return;
            }
        })
    }

    function handleQuantityChange(e) {
        setQuantity(e.target.value);
    }

    const mappedVariants = props.currentProduct.sync_variants && props.currentProduct.sync_variants.map((variant) => {
        return <option
                    key={uuidv4()}
                    value={variant.id}
                >{variant.name}
                </option>
    })

    const mappedSizeMeasurements = sizeCharts && sizeCharts[0].measurements.map((measurement) => {
        return <div className="measurement-container">
                    <p>{measurement.type_label}</p>
                    {measurement.values && measurement.values.map((size) => {
                        return <p>Value: {size.value} Size: {size.size}</p>
                    })}
                </div>
    })

    return (
        <div className="view-product">
            {showSizeCharts && 
                <div className="size-charts-background">
                    <div className="size-charts">
                        <button onClick={() => setShowSizeCharts(false)}>Close</button>
                        <div className="size-charts-section-container">
                            <div className="size-chart-section">
                                <img src={sizeCharts && sizeCharts[0].image_url} />
                                <div className="size-chart-text">
                                    <p dangerouslySetInnerHTML={{__html: `${sizeCharts[0].description}`}}></p>
                                    <br></br>
                                    <br></br>
                                    <p dangerouslySetInnerHTML={{__html: `${sizeCharts[0].image_description}`}}></p>
                                    <br></br>
                                </div>
                            </div>
                            <div className="size-chart-section">
                                <img src={sizeCharts && sizeCharts[1].image_url} />
                                <div className="size-chart-text">
                                    <p dangerouslySetInnerHTML={{__html: `${sizeCharts[1].image_description}`}}></p>
                                    <br></br>
                                </div>
                            </div>
                        </div>
                        <div className="size-chart-measurements">
                            {mappedSizeMeasurements}
                        </div>
                    </div>
                </div>}
            <div className="product-images">
                <img src={mainImage} className="product-image-main" />
                <div className="product-images-slideshow">

                </div>
            </div>
            <div className="product-sidebar">
                <p className="product-name">{props.currentProduct.name}</p>
                <p className="product-price">$ {selectedVariant && selectedVariant.retail_price}</p>
                <label
                    className="product-size-label sidebar-label" 
                    htmlFor="size">OPTIONS <select 
                                    name="size" onChange={handleVariantChange}>
                        {mappedVariants}
                    </select>
                </label>
                {sizeCharts && sizeCharts[0].image_description && <a className="show-size-charts" onClick={() => setShowSizeCharts((prev) => !prev)}>Show Size Chart</a>}
                <p className="product-description">{props.currentProduct.description}</p>
                <label className="quantity-label sidebar-label" htmlFor="quantity">Quantity
                    <input
                        onChange={handleQuantityChange} 
                        value={quantity}
                        type="number" 
                        placeholder='quantity'
                        min="1"
                        />
                </label>
                <button 
                    className="add-to-cart-btn main-btn"
                    onClick={handleAddToCart}
                >Add to Cart</button>
            </div>
        </div>
    )
}