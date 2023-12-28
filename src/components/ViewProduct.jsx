import React from 'react';
import {v4 as uuidv4} from 'uuid';
import '../styles/view-product.css';

export default function ViewProduct(props) {

    const [selectedVariant, setSelectedVariant] = React.useState(props.currentProduct.sync_variants[0])
    const [mainImage, setMainImage] = React.useState("");
    const [addToCart, setAddToCart] = React.useState(false);
    const [sizeCharts, setSizeCharts] = React.useState(null);
    const [showSizeCharts, setShowSizeCharts] = React.useState(false);
    const [quantity, setQuantity] = React.useState(1);

    React.useEffect(() => {
        try {
            setSelectedVariant(props.currentProduct.sync_variants[0]);
            const productID = props.currentProduct.sync_variants[0].product.product_id || props.currentProduct.id;
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
        setMainImage(selectedVariant.files[1].preview_url);
    }, [selectedVariant])

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
            if (product.id === selectedVariant.id) {
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

    function handleVariantImageClick(imageURL) {
        setMainImage(imageURL)
    }

    function checkIfProductExistsInCart(id) {
        let productExists = false;
        props.shoppingCartContents.forEach((product) => {
            if (product.id === id) {
                productExists = true;
            }
        })
        return productExists;
    }

    const mappedVariants = props.currentProduct.sync_variants && props.currentProduct.sync_variants.map((variant) => {
        return <option
                    key={uuidv4()}
                    value={variant.id}
                >{variant.name}
                </option>
    })

    const mappedSizeMeasurements = sizeCharts && sizeCharts[0].measurements.map((measurement) => {
        return <div key={uuidv4()} className="measurement-container">
                    <p>{measurement.type_label}</p>
                    {measurement.values && measurement.values.map((size) => {
                        return <p key={uuidv4()}>Value: {size.value} Size: {size.size}</p>
                    })}
                </div>
    })

    const existingPreviewURL = [];
    props.currentProduct.sync_variants &&
        props.currentProduct.sync_variants.forEach((variant) => {
        const imageLink = variant.files[1].preview_url;
        if (!existingPreviewURL.includes(imageLink)) {
            existingPreviewURL.push(imageLink);
            }
        // existingPreviewURL.push(imageLink);
        })

    const mappedVariantImages = existingPreviewURL.map((image, index) => {
        return <div key={uuidv4()} onClick={() => handleVariantImageClick(image, index)} className="variant-image">
                                    <img src={image} />
                              </div>
    })

    function moveSlideshowLeft(e) {
        e.target.parentElement.previousSibling.scrollLeft += -100;
    }

    function moveSlideshowRight(e) {
        e.target.parentElement.previousSibling.scrollLeft += 100; 
    }

    return (
        <div className="view-product">
            {showSizeCharts && 
                <div className="size-charts-background">
                    <div className="size-charts">
                        <button onClick={() => setShowSizeCharts(false)}>Close</button>
                        <div className="size-charts-section-container">
                            <p className="size-charts-header">Insructions</p>
                            <div className="size-chart-section">
                                <div className="size-chart-img-container">
                                    <img src={sizeCharts && sizeCharts[0].image_url} />
                                </div>
                                <div className="size-chart-text">
                                    <p dangerouslySetInnerHTML={{__html: `${sizeCharts[0].description}`}}></p>
                                    <br></br>
                                    <p dangerouslySetInnerHTML={{__html: `${sizeCharts[0].image_description}`}}></p>
                                    <br></br>
                                </div>
                            </div>
                            <div className="size-chart-section">
                                <div className="size-chart-img-container">
                                    <img src={sizeCharts && sizeCharts[1].image_url} />
                                </div>
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
                    {mappedVariantImages}
                </div>
                <div className="scroll-buttons">
                    <button onClick={moveSlideshowLeft} className="main-btn slideshow-btn">{'<'}</button>
                    <button onClick={moveSlideshowRight} className="main-btn slideshow-btn">{'>'}</button>
                </div>
            </div>
            <div className="product-sidebar">
                <div className="product-name-container">
                    <div className="product-name">
                        <p>{props.currentProduct.name}</p>
                        <p>${selectedVariant.retail_price}</p>
                    </div>
                    {checkIfProductExistsInCart(selectedVariant.id) && <p className="product-in-cart">IN CART</p>}
                </div>
                {/* <p className="product-price">$ {selectedVariant && selectedVariant.retail_price}</p> */}
                <label
                    className="product-size-label sidebar-label" 
                    htmlFor="size">OPTIONS 
                    <select 
                        name="size" 
                        onChange={handleVariantChange}
                        value={selectedVariant.id}
                    >{mappedVariants}
                    </select>
                </label>
                {sizeCharts && sizeCharts[0].image_description && 
                <p className="show-size-charts" onClick={() => setShowSizeCharts((prev) => !prev)}
                >Show Size Chart</p>
                }
                <div className="product-description" dangerouslySetInnerHTML={{__html: props.currentProduct.description}}></div>
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