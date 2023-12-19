import React from 'react';
import Card from './Card';
import '../styles/card-container.css';

import {v4 as uuidv4} from 'uuid';

export default function CardContainer(props) {

    const mappedCards = props.productList.map((product) => {
        return <Card 
                    key={uuidv4()}
                    product={product}
                    setCurrentProduct={props.setCurrentProduct}
                    setPage={props.setPage}
                />
    })

    return (
        <div className="card-container">
            {mappedCards}
        </div>
    )
}