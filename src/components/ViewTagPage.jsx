import React from 'react';
import CardContainer from './CardContainer';
import heroBlank from '../assets/hero-blank.png';

import '../styles/view-tag-page.css';

export default function ViewTagPage(props) {

    const [tagList, setTagList] = React.useState([]);

    React.useEffect(() =>  {
        try {
            async function getRelatedTagProducts() {
                const url = props.root + '/products/tag/search/' + props.viewTag;
                await fetch(url, {
                    method: "GET",
                    mode: 'cors',
                }).then((res) => res.json())
                .then((tags) => setTagList(tags.tagList));
            }
            getRelatedTagProducts();
        } catch(err) {
            console.log(err);
        }
    }, [props.viewTag]);
    

    return (
        <div className="view-tag-page">
            <div className="view-tag-page-hero-container">
                <img className="view-tag-hero" src={heroBlank} />
                <p className="view-tag-hero-text">{props.viewTag.toUpperCase()}</p>
            </div>
            <CardContainer 
                productList={tagList}
                setCurrentProduct={props.setCurrentProduct}
                setPage={props.setPage}
            />
        </div>
    )
}