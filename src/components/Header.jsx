import React from 'react';
import '../styles/header.css';

import {v4 as uuidv4} from 'uuid';

import logo from '../assets/vice-logo.png';
import SearchIcon from '@mui/icons-material/Search';
import Person4OutlinedIcon from '@mui/icons-material/Person4Outlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import SmallMenu from './SmallMenu';
import Card from './Card';
import { Menu } from '@mui/material';

export default function Header(props) {

    const [sendLogout, setSendLogout] = React.useState(false);
    const [productNamesForSearch, setProductNamesForSearch] = React.useState([]);
    const [searchKeywords, setSearchKeywords] = React.useState("");
    const [searchResults, setSearchResults] = React.useState([]);
    const [selectedSearchResult, setSelectedSearchResult] = React.useState(null);
    const [animateCart, setAnimateCart] = React.useState("");
    const [dropdownProducts, setDropdownProducts] = React.useState([]);
    const [dropdownProductsLoaded, setDropdownProductsLoaded] = React.useState(false);
    

    React.useEffect(() => {
        try {
            setDropdownProductsLoaded(false);
            if (props.showDropdown === "new") {
                async function getNewMerch() {
                    const url = props.root + '/products/new';
                    await fetch(url, {
                        method: "GET",
                        mode: "cors",
                    }).then((res) => res.json())
                    .then((res) => {
                        setDropdownProducts(res)
                        setDropdownProductsLoaded(true);
                    })
                    .catch((err) => console.log(err));
                }
                getNewMerch();
            } else if (props.showDropdown === "best") {
                async function getBestMerch() {
                    const url = props.root + '/products/best';
                    await fetch(url, {
                        method: "GET",
                        mode: "cors",
                    }).then((res) => res.json())
                    .then((res) => {
                        setDropdownProducts(res)
                        setDropdownProductsLoaded(true);
                    })
                    .catch((err) => console.log(err));
                }
                getBestMerch();
            }
        } catch(err) {
            console.log(err);
        }

    }, [props.showDropdown])

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
                    .then(() => {
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

    // React.useEffect(() => {
    //     if (props.beginSearch) {
    //         try {
    //             async function getProductNamesForSearch() {
    //                 const url = props.root + '/products/search';
    //                 await fetch(url, {
    //                     method: "GET",
    //                     mode: "cors",
    //                 }).then((res) => res.json())
    //                 .then((res) => setProductNamesForSearch(res.productList))
    //                 .catch((err) => console.log(err));
    //             }
    //             getProductNamesForSearch();
    //         } catch(err) {
    //             console.log(err);
    //         }
    //     }
    // },[props.beginSearch]);

    // React.useEffect(() => {
    //     if (selectedSearchResult) {
    //         try {
    //             async function getSearchResultProduct() {
    //                 const url = props.root + '/products/search/get-product';
    //                 await fetch(url, {
    //                     method: "POST",
    //                     mode: 'cors',
    //                     headers: {
    //                         "Content-Type":"application/json",
    //                     },
    //                     body: JSON.stringify({id: selectedSearchResult.id})
    //                 }).then((res) => res.json())
    //                 .then((res) => props.setCurrentProduct(res))
    //                 .then(() => {
    //                         props.setPage("viewProduct")
    //                         setSearchResults([]);
    //                         props.setBeginSearch(false);
    //                     })
    //                 .catch((err) => console.log(err));
    //             }
    //             getSearchResultProduct();
    //         } catch(err) {
    //             console.log(err);
    //         }
    //     }
    // }, [selectedSearchResult])

    React.useEffect(() => {
        setAnimateCart("animate-cart")
        setTimeout(() => {
            setAnimateCart("");
        }, 1000);
    }, [props.shoppingCartContents])

    function handleDropdownClick(value, categoryType) {
        props.setCategorySearch({
            category: categoryType,
            categorySearchTerm: value
        });
        if (props.openSmallMenu) {
            props.setOpenSmallMenu(false);
        }

        props.setPage("viewCategory");
    }

    // function handleSearchInputChange(e) {
    //     const results = [];
    //     productNamesForSearch.forEach((product) => {
    //         if (product.name.toLowerCase().includes(e.target.value.toLowerCase())) {
    //             results.push(product);
    //         }
    //     })
    //     setSearchResults(results);
    // }

    // function handleSearchResultClick(product) {
    //     setSelectedSearchResult(product);
    // }
    
    // const mappedSearchResults = searchResults.map((product) => {
    //     return <p
    //                 key={uuidv4()}
    //                 onClick={() => handleSearchResultClick(product)} 
    //                 className="search-result">{product.name}
    //             </p>
    // })

    const mappedDropdownProducts = dropdownProducts.map((product) => {
        return <Card 
                    key={uuidv4()}
                    product={product}
                    setCurrentProduct={props.setCurrentProduct}
                    setPage={props.setPage}
                />
    })

    return (
        <header onClick={() => props.setShowDropdown(null)}>
            <div className="nav-logo-container">
                <img onClick={() => props.setPage("home")} src={logo} className="nav-logo"/>
            </div>
            <nav className="desktop-nav">
                <div className="nav-btn-container">
                    <div className="nav-btn-text" onClick={() => props.setPage("home")}>HOME</div>
                </div>
                {!props.beginSearch && <div className="nav-btn-container">
                    <div 
                        onClick={(e) => {
                            e.stopPropagation(); 
                            props.setShowDropdown((prev) => prev === "shop" ? null : "shop")
                        }} 
                        className={`nav-btn-text nav-btn-text-shop`}
                        >SHOP <span className={`nav-arrow ${props.showDropdown === "shop" ? 'nav-btn-arrow-spin' : ""}`}></span></div>
                    {props.showDropdown === "shop" && <div className="nav-btn-dropdown shop-dropdown">
                        <div className="shop-dropdown-section">
                            <p className="dropdown-header">TOPS</p>
                            <a onClick={() => handleDropdownClick("shirts", "sub_category")}>Shirts</a>
                            <a onClick={() => handleDropdownClick("threequarter", "sub_category")}>3/4 Sleeves</a>
                            <a onClick={() => handleDropdownClick("longsleeves", "sub_category")}>Long Sleeves</a>
                            <a onClick={() => handleDropdownClick("hoodies", "sub_category")}>Hoodies</a>
                            <a onClick={() => handleDropdownClick("sweatshirts", "sub_category")}>Sweatshirts</a>
                            <a onClick={() => handleDropdownClick("tanktops", "sub_category")}>Tanktops</a>
                        </div>
                        <div className="shop-dropdown-section">
                            <p className="dropdown-header">HEADWEAR</p>
                            <a onClick={() => handleDropdownClick("beanies", "sub_category")}>Beanies</a>
                            <a onClick={() => handleDropdownClick("baseball", "sub_category")}>Baseball Caps</a>
                            <a onClick={() => handleDropdownClick("snapbacks", "sub_category")}>Snapbacks</a>
                            <a onClick={() => handleDropdownClick("trucker", "sub_category")}>Trucker Hats</a>
                        </div>
                        <div className="shop-dropdown-section">
                            <p className="dropdown-header">ACCESSORIES</p>
                            <a onClick={() => handleDropdownClick("facemasks", "sub_category")}>Facemasks</a>
                            <a onClick={() => handleDropdownClick("phonecases", "sub_category")}>Phone Cases</a>
                            <a onClick={() => handleDropdownClick("mousepads", "sub_category")}>Mousepads</a>
                        </div>
                        <div className="shop-dropdown-section">
                            <p className="dropdown-header">DRINKWARE</p>
                            <a onClick={() => handleDropdownClick("mugs", "sub_category")}>Mugs</a>
                            <a onClick={() => handleDropdownClick("tumblers", "sub_category")}>Tumblers</a>
                            <a onClick={() => handleDropdownClick("waterbottles", "sub_category")}>Water Bottles</a>
                        </div>
                    </div>}
                </div>}
                <div className="nav-btn-container nav-btn-container-products">
                    <div 
                            onClick={(e) => {
                                e.stopPropagation(); 
                                props.setShowDropdown((prev) => prev === "new" ? null : "new")
                            }} 
                            className={`nav-btn-text nav-btn-text-new`}
                            >NEW MERCH<span className={`nav-arrow ${props.showDropdown === "new" ? 'nav-btn-arrow-spin' : ""}`}></span></div>
                                {props.showDropdown === "new" && dropdownProductsLoaded && <div className="nav-btn-dropdown products-dropdown">
                                <p>Our Freshest Designs</p>
                                <div className="dropdown-products-container">
                                    {mappedDropdownProducts}
                                </div>
                                <a 
                                    onClick={() => handleDropdownClick("new", "tag")}
                                    className="dropdown-see-more-btn"
                                    >See All New Merch</a>
                    </div>}
                </div>
                <div className="nav-btn-container nav-btn-container-new">
                    <div 
                            onClick={(e) => {
                                e.stopPropagation(); 
                                props.setShowDropdown((prev) => prev === "best" ? null : "best")
                            }} 
                            className={`nav-btn-text nav-btn-text-new`}
                            >BEST SELLING<span className={`nav-arrow ${props.showDropdown === "best" ? 'nav-btn-arrow-spin' : ""}`}></span></div>
                                {props.showDropdown === "best" && dropdownProductsLoaded && <div className="nav-btn-dropdown products-dropdown">
                                <p>Our dopest Synthwave Gear</p>
                                <div className="dropdown-products-container">
                                    {mappedDropdownProducts}
                                </div>
                                <a 
                                    onClick={() => handleDropdownClick("best", "tag")}
                                    className="dropdown-see-more-btn"
                                    >See All Best Sellers</a>
                    </div>}
                </div>
            </nav>
            <div className="nav-icon-container"  onClick={(e) => e.stopPropagation()}>
                {/* {props.currentUser && <p>Welcome back, {props.currentUser.name}</p>} */}
                {/* {props.beginSearch && 
                    <div className="search-bar-container">
                        <input className="search-bar" type="search" onChange={handleSearchInputChange} name="search" placeholder="Enter Search Keywords Here"/>
                        {searchResults.length > 0 && <div className="search-results">
                            {mappedSearchResults}
                        </div>}
                    </div>
                } */}
                <a onClick={() => props.setPage("search")}><SearchIcon /></a>
                <a className="shopping-cart-icon" onClick={() => props.setShowShoppingCart((prev) => !prev)}>
                    {props.shoppingCartContents.length > 0 && <div className={`shopping-cart-full ${animateCart}`}></div>}
                    <ShoppingCartOutlinedIcon />
                    <p 
                        className={`shopping-cart-icon-number ${animateCart}`}
                    >{props.shoppingCartContents.length > 0 ? props.shoppingCartContents.length : ""}</p>
                </a>
                {props.currentUser && <a onClick={() => props.setPage("profile")}><Person4OutlinedIcon /></a>}
                {!props.currentUser && <a onClick={() => props.setPage("login")}>Login</a>}
                {props.currentUser && props.currentUser.membership === "admin" && <a className="admin-link" onClick={() => props.setPage("admin")}>ADMIN CONSOLE</a>}
                {props.currentUser && <a className="logout-btn" onClick={() => setSendLogout(true)}>Logout</a>}
                <a onClick={() => props.setOpenSmallMenu((prev) => !prev)} className="hamburger-menu"><MenuIcon /></a>
            </div>
            {props.openSmallMenu && 
                <SmallMenu
                    handleDropdownClick={handleDropdownClick}
                    setOpenSmallMenu={props.setOpenSmallMenu}
                    setPage={props.setPage}
                    setSendLogout={setSendLogout}
                    currentUser={props.currentUser}
                    setShowShoppingCart={props.setShowShoppingCart}
                />}
        </header>
    )
}