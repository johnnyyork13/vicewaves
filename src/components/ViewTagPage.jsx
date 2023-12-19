import React from 'react';
import CardContainer from './CardContainer';

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
            <div className="view-tag-page-hero">{props.viewTag.toUpperCase()}</div>
            <CardContainer 
                productList={tagList}
                setCurrentProduct={props.setCurrentProduct}
                setPage={props.setPage}
            />
        </div>
    )
}