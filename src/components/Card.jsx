import React from 'react';
import '../styles/card.css';

export default function Card(props) {

    const [variants, setVariants] = React.useState([]);

    React.useEffect(() => {
        try {
            setVariants(props.product.sync_variants)
        } catch(err) {
            console.log(err);
        }
    }, [])

    function handleCardClick() {
        props.setPage("view-product");
        props.setCurrentProduct(props.product);
    }

    const mappedVariants = variants.map((variant) => {
        return <option value={variant.id}>{variant.name}</option>
    })

    return (
        <div className="card" onClick={handleCardClick}>
            <img src={props.product.thumbnail_url} />
            <div className="card-info">
                <p className="card-info-header">{props.product.name}</p>
                <select name="id">
                    {mappedVariants}
                </select>
            </div>
        </div>
    )
}