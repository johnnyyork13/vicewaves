import React from 'react';
import {v4 as uuidv4} from 'uuid';
import '../styles/search.css';
import Card from './Card';

export default function Search(props) {

    const [searchResults, setSearchResults] = React.useState([]);
    const [getProduct, setGetProduct] = React.useState(false);
    const [searchTerms, setSearchTerms] = React.useState({
        search: ""
    });

    React.useEffect(() => {
        try {
            async function getSearchResult() {
                const url = props.root + "/products/search"
                await fetch(url, {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type":"application/json",
                    },
                    body: JSON.stringify({searchTerms}),
                }).then((res) => res.json())
                .then((productList) => setSearchResults(productList))
                .catch((err) => console.log(err));
            }
            getSearchResult();
        } catch(err) {
            console.log(err);
        }
    }, [searchTerms])

    const mappedSearchResults = searchResults.map((product) => {
        return <Card 
                    key={uuidv4()}
                    product={product}
                    setCurrentProduct={props.setCurrentProduct}
                    setPage={props.setPage}
                />
    })

    return (
        <div className="search-container">
            <p className="search-header">Search ViceWaves</p>
            <div className="search">
                <input 
                    onChange={(e) => setSearchTerms({[e.target.name]: e.target.value})}
                    type="search" 
                    name="search"
                    className="search-input" 
                    placeholder="Enter Product Name" 
                />
                <p className="search-results-header">Product Results</p>
                <div className='search-results-container'>
                    {mappedSearchResults}
                </div>
            </div>
        </div>
    )
}