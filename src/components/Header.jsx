import React from 'react';
import '../styles/header.css';
import {v4 as uuidv4} from 'uuid';

import SearchIcon from '@mui/icons-material/Search';
import Person4OutlinedIcon from '@mui/icons-material/Person4Outlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

export default function Header(props) {

    const [sendLogout, setSendLogout] = React.useState(false);
    const [beginSearch, setBeginSearch] = React.useState(false);
    const [productNamesForSearch, setProductNamesForSearch] = React.useState([]);
    const [searchKeywords, setSearchKeywords] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const [selectedSearchResult, setSelectedSearchResult] = React.useState(null);
    const [animateCart, setAnimateCart] = React.useState("");
    //logout hook
    React.useEffect(() => {
        if (sendLogout) {
            try {
                async function sendLogoutRequest() {
                    
                    const url = props.root + '/logout';
                    await fetch(url, {
                        method: "GET",
                        mode: 'cors',
                        credentials: 'include'
                    }).then((res) => res.json())
                    .then((res) => {
                        console.log(res);
                        setSendLogout(false);
                        props.setCurrentUser(null);
                        props.setPage("home");
                    })
                }
                sendLogoutRequest();
            } catch(err) {
                console.log(err);
            }
        }
    }, [sendLogout])

    React.useEffect(() => {
        if (beginSearch) {
            try {
                async function getProductNamesForSearch() {
                    const url = props.root + '/products/search';
                    await fetch(url, {
                        method: "GET",
                        mode: "cors",
                    }).then((res) => res.json())
                    .then((res) => setProductNamesForSearch(res.productList))
                    .catch((err) => console.log(err));
                }
                getProductNamesForSearch();
            } catch(err) {
                console.log(err);
            }
        }
    },[beginSearch]);

    React.useEffect(() => {
        if (selectedSearchResult) {
            try {
                async function getSearchResultProduct() {
                    const url = props.root + '/products/search/get-product';
                    await fetch(url, {
                        method: "POST",
                        mode: 'cors',
                        headers: {
                            "Content-Type":"application/json",
                        },
                        body: JSON.stringify({id: selectedSearchResult.id})
                    }).then((res) => res.json())
                    .then((res) => props.setCurrentProduct(res))
                    .then(() => {
                            props.setPage("viewProduct")
                            setSearchResults([]);
                            setBeginSearch(false);
                        })
                    .catch((err) => console.log(err));
                }
                getSearchResultProduct();
            } catch(err) {
                console.log(err);
            }
        }
    }, [selectedSearchResult])

    React.useEffect(() => {
        setAnimateCart("animate-cart")
        setTimeout(() => {
            setAnimateCart("");
        }, 1000);
    }, [props.shoppingCartContents])

    function handleDropdownClick(value) {
        props.setPage("viewTag");
        props.setViewTag(value);
    }

    function handleSearchInputChange(e) {
        const results = [];
        productNamesForSearch.forEach((product) => {
            if (product.name.toLowerCase().includes(e.target.value.toLowerCase())) {
                results.push(product);
            }
        })
        setSearchResults(results);
    }

    function handleSearchResultClick(product) {
        setSelectedSearchResult(product);
    }
    
    const mappedSearchResults = searchResults.map((product) => {
        return <p
                    key={uuidv4()}
                    onClick={() => handleSearchResultClick(product)} 
                    className="search-result">{product.name}
                </p>
    })

    return (
        <header onClick={() => props.setShowDropdown(false)}>
            <nav>
                <div className="nav-btn-container">
                    <div className="nav-btn-text" onClick={() => props.setPage("home")}>HOME</div>
                </div>
                <div className="nav-btn-container">
                    <div onClick={(e) => {e.stopPropagation(); props.setShowDropdown((prev) => !prev)}}className="nav-btn-text nav-btn-text-shop">SHOP <span className="nav-arrow"></span></div>
                    {props.showDropdown && <div className="nav-btn-dropdown shop-dropdown">
                        <div className="shop-dropdown-section">
                            <p>TOPS</p>
                            <a onClick={() => handleDropdownClick("tshirts")}>T-Shirts</a>
                            <a onClick={() => handleDropdownClick("long sleeve shirts")}>Long Sleeves</a>
                            <a>ITEM</a>
                            <a>ITEM</a>
                            <a>ITEM</a>
                            <a>ITEM</a>
                            <a>ITEM</a>
                            <a>ITEM</a>
                            <a>ITEM</a>
                        </div>
                        <div className="shop-dropdown-section">
                            <p>BOTTOMS</p>
                            <a onClick={() => handleDropdownClick("sweatpants")}>Sweatpants</a>
                            <a>ITEM</a>
                            <a>ITEM</a>
                            <a>ITEM</a>
                            <a>ITEM</a>
                            <a>ITEM</a>
                            <a>ITEM</a>
                            <a>ITEM</a>
                            <a>ITEM</a>
                        </div>
                        <div className="shop-dropdown-section">
                            <p>ACCESSORIES</p>
                            <a>ITEM</a>
                            <a>ITEM</a>
                            <a>ITEM</a>
                            <a>ITEM</a>
                            <a>ITEM</a>
                            <a>ITEM</a>
                            <a>ITEM</a>
                            <a>ITEM</a>
                            <a>ITEM</a>
                        </div>
                        <div className="shop-dropdown-section">
                            <p>HOME</p>
                            <a onClick={() => handleDropdownClick("mugs")}>Mugs</a>
                            <a onClick={() => handleDropdownClick("posters")}>Posters</a>
                            <a>ITEM</a>
                            <a>ITEM</a>
                            <a>ITEM</a>
                            <a>ITEM</a>

                        </div>
                    </div>}
                </div>
                <div className="nav-btn-container">
                    <div className="nav-btn-text">NEW MERCH</div>
                </div>
                <div className="nav-btn-container">
                    <div className="nav-btn-text">BEST SELLERS </div>
                </div>
            </nav>
            <div className="nav-icon-container">
                {props.currentUser && <p>Welcome back, {props.currentUser.name}</p>}
                {beginSearch && 
                    <div className="search-bar-container">
                        <input className="search-bar" type="search" onChange={handleSearchInputChange} name="search" placeholder="Enter Search Keywords Here"/>
                        {searchResults.length > 0 && <div className="search-results">
                            {mappedSearchResults}
                        </div>}
                    </div>
                }
                <a onClick={() => setBeginSearch((prev) => !prev)}><SearchIcon /></a>
                <a className="shopping-cart-icon" onClick={() => props.setShowShoppingCart((prev) => !prev)}>
                    {props.shoppingCartContents.length > 0 && <div className={`shopping-cart-full ${animateCart}`}></div>}
                    <ShoppingCartOutlinedIcon />
                </a>
                <a onClick={() => {
                    props.currentUser ? props.setPage("profile") : props.setPage("login")
                    
                }}><Person4OutlinedIcon /></a>
                {props.currentUser && props.currentUser.membership === "admin" && <a className="admin-link" onClick={() => props.setPage("admin")}>ADMIN CONSOLE</a>}
                {props.currentUser && <a className="logout-btn" onClick={() => setSendLogout(true)}>Logout</a>}
            </div>
        </header>
    )
}