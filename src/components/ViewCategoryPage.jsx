import React from 'react';
import CardContainer from './CardContainer';
import Hero from './Hero';
import heroBlank from '../assets/hero-blank.png';

import '../styles/view-tag-page.css';

export default function ViewCategoryPage(props) {

    const [productList, setProductList] = React.useState([]);

    React.useEffect(() =>  {
        try {
            if (props.categorySearch) {
                async function getRelatedTagProducts() {
                    const url = props.root + `/products/category/${props.categorySearch.category}/${props.categorySearch.categorySearchTerm}`;
                    await fetch(url, {
                        method: "GET",
                        mode: 'cors',
                    }).then((res) => res.json())
                    .then((productList) => {
                        setProductList(productList)

                    })
                    .catch((err) => console.log(err));
                }
                getRelatedTagProducts();
            }
        } catch(err) {
            console.log(err);
        }
    }, [props.categorySearch]);

    return (
        <div className="view-tag-page">
            {/* <Hero 
                header={"Browsing " + categorySearch.categorySearchTerm}
                setPage={props.setPage}
                // redirect={"new"}
                // redirectText={"See All"}
            /> */}
            <CardContainer 
                header={
                    props.categorySearch.categorySearchTerm === "new" || props.categorySearch.categorySearchTerm === "best" ? 
                    props.categorySearch.categorySearchTerm + " Merch" : 
                    props.categorySearch.categorySearchTerm
                }
                productList={productList}
                setCurrentProduct={props.setCurrentProduct}
                setPage={props.setPage}
            />
        </div>
    )
}