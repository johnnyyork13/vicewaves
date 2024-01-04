import React from 'react';
import '../styles/small-menu.css';

export default function SmallMenu(props) {

    const [openMainCat, setOpenMainCat] = React.useState(null);
    const [openSubCat, setOpenSubCat] = React.useState(null);

    function handleOpenMainCat(str) {
        if (str === openMainCat) {
            setOpenMainCat(null);
            setOpenSubCat(null);
        } else {
            setOpenMainCat(str);
        }
    }

    function handleOpenSubCat(str) {
        if (str === openSubCat) {
            setOpenSubCat(null);
        } else {
            setOpenSubCat(str);
        }
    }

    function handlePageChange(str) {
        props.setOpenSmallMenu(false);
        props.setPage(str);
    }

    return (
        <div className="mobile-nav-container" onClick={(e) => e.stopPropagation()}>
                <div className="mobile-nav">
                    <div className="mobile-nav-section">
                        <p onClick={() => handlePageChange("home")} className="mobile-nav-section-header">HOME</p>
                    </div>
                    <div className="mobile-nav-section">
                        <p onClick={() => props.setShowShoppingCart(true)} className="mobile-nav-section-header">SHOPPING CART</p>
                    </div>
                    {props.currentUser && <div className="mobile-nav-section">
                        <p onClick={() => handlePageChange("profile")} className="mobile-nav-section-header">PROFILE</p>
                    </div>}


                    <div className="mobile-nav-section">
                        <p onClick={() => handleOpenMainCat("shop")} className="mobile-nav-section-header">SHOP<span className={`nav-arrow-small ${openMainCat === "shop" ? 'nav-btn-arrow-small-spin' : ""}`}></span></p>
                        {openMainCat === "shop" && <div className="mobile-nav-section-dropdown">

                            <div className="mobile-nav-section-dropdown-section">
                                <p onClick={() => handleOpenSubCat("tops")} className="mobile-nav-section-dropdown-section-header">TOPS<span className={`nav-arrow-small ${openSubCat === "tops" ? 'nav-btn-arrow-small-spin' : ""}`}></span></p>
                                {openSubCat === "tops" && <div className="mobile-nav-section-item-container">
                                    <p onClick={() => props.handleDropdownClick("tshirts")} className="mobile-nav-section-item">T-Shirts</p>
                                    <p className="mobile-nav-section-item">Item</p>
                                    <p className="mobile-nav-section-item">Item</p>
                                    <p className="mobile-nav-section-item">Item</p>
                                    <p className="mobile-nav-section-item">Item</p>
                                    <p className="mobile-nav-section-item">Item</p>
                                </div>}
                            </div>

                            <div className="mobile-nav-section-dropdown-section">
                                <p onClick={() => handleOpenSubCat("bottoms")} className="mobile-nav-section-dropdown-section-header">BOTTOMS<span className={`nav-arrow-small ${openSubCat === "bottoms" ? 'nav-btn-arrow-small-spin' : ""}`}></span></p>
                                {openSubCat === "bottoms" && <div className="mobile-nav-section-item-container">
                                    <p className="mobile-nav-section-item">Item</p>
                                    <p className="mobile-nav-section-item">Item</p>
                                    <p className="mobile-nav-section-item">Item</p>
                                    <p className="mobile-nav-section-item">Item</p>
                                    <p className="mobile-nav-section-item">Item</p>
                                </div>}
                            </div>

                            <div className="mobile-nav-section-dropdown-section">
                                <p onClick={() => handleOpenSubCat("accessories")} className="mobile-nav-section-dropdown-section-header">ACCESSORIES<span className={`nav-arrow-small ${openSubCat === "accessories" ? 'nav-btn-arrow-small-spin' : ""}`}></span></p>
                                {openSubCat === "accessories" && <div className="mobile-nav-section-item-container">
                                    <p className="mobile-nav-section-item">Item</p>
                                    <p className="mobile-nav-section-item">Item</p>
                                    <p className="mobile-nav-section-item">Item</p>
                                    <p className="mobile-nav-section-item">Item</p>
                                    <p className="mobile-nav-section-item">Item</p>
                                </div>}
                            </div>

                            <div className="mobile-nav-section-dropdown-section">
                                <p onClick={() => handleOpenSubCat("home")} className="mobile-nav-section-dropdown-section-header">HOME<span className={`nav-arrow-small ${openSubCat === "home" ? 'nav-btn-arrow-small-spin' : ""}`}></span></p>
                                {openSubCat === "home" && <div className="mobile-nav-section-item-container">
                                    <p className="mobile-nav-section-item">Item</p>
                                    <p className="mobile-nav-section-item">Item</p>
                                    <p className="mobile-nav-section-item">Item</p>
                                    <p className="mobile-nav-section-item">Item</p>
                                    <p className="mobile-nav-section-item">Item</p>
                                </div>}
                            </div>
                        </div>}
                        
                    </div>

                    <div className="mobile-nav-section">
                        <p className="mobile-nav-section-header">NEW MERCHANDISE</p>
                    </div>
                    <div className="mobile-nav-section">
                        <p className="mobile-nav-section-header">BEST SELLERS</p>
                    </div>

                    <div className="mobile-nav-section">
                        <p className="mobile-nav-section-header">SEARCH</p>
                    </div>
                    {!props.currentUser && <div className="mobile-nav-section">
                        <p onClick={() => handlePageChange("login")} className="mobile-nav-section-header">LOGIN</p>
                    </div>}
                    {props.currentUser && <div className="mobile-nav-section">
                        <p onClick={() => props.setSendLogout(true)} className="mobile-nav-section-header">LOGOUT</p>
                    </div>}

                </div>
            </div>
    )
}