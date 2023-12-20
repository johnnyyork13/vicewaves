import React from 'react';
import {v4 as uuidv4} from 'uuid';
import '../styles/card.css';

export default function Card(props) {

    function handleCardClick() {
        props.setPage("viewProduct");
        props.setCurrentProduct(props.product);
    }
    

    return (
        <div className="card" onClick={handleCardClick}>
            <img src={props.product.thumbnail_url} />
            <div className="card-info">
                <p className="card-info-header">{props.product.name}</p>
            </div>
        </div>
    )
}