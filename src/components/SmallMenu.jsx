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
                                    <p onClick={() => props.handleDropdownClick("shirts", "sub_category")} className="mobile-nav-section-item">Shirts</p>
                                    <p onClick={() => props.handleDropdownClick("longsleeves", "sub_category")} className="mobile-nav-section-item">Long Sleeves</p>
                                    <p onClick={() => props.handleDropdownClick("hoodies", "sub_category")} className="mobile-nav-section-item">Hoodies</p>
                                    <p onClick={() => props.handleDropdownClick("sweatshirts", "sub_category")} className="mobile-nav-section-item">Sweatshirts</p>
                                    <p onClick={() => props.handleDropdownClick("tanktops", "sub_category")} className="mobile-nav-section-item">Tanktops</p>
                                </div>}
                            </div>

                            <div className="mobile-nav-section-dropdown-section">
                                <p onClick={() => handleOpenSubCat("bottoms")} className="mobile-nav-section-dropdown-section-header">HEADWEAR<span className={`nav-arrow-small ${openSubCat === "bottoms" ? 'nav-btn-arrow-small-spin' : ""}`}></span></p>
                                {openSubCat === "bottoms" && <div className="mobile-nav-section-item-container">
                                <p onClick={() => props.handleDropdownClick("beanies", "sub_category")} className="mobile-nav-section-item">Beanies</p>
                                <p onClick={() => props.handleDropdownClick("baseball", "sub_category")} className="mobile-nav-section-item">Baseball Caps</p>
                                <p onClick={() => props.handleDropdownClick("snapbacks", "sub_category")} className="mobile-nav-section-item">Snapbacks</p>
                                <p onClick={() => props.handleDropdownClick("trucker", "sub_category")} className="mobile-nav-section-item">Trucker Hats</p>
                                </div>}
                            </div>

                            <div className="mobile-nav-section-dropdown-section">
                                <p onClick={() => handleOpenSubCat("accessories")} className="mobile-nav-section-dropdown-section-header">ACCESSORIES<span className={`nav-arrow-small ${openSubCat === "accessories" ? 'nav-btn-arrow-small-spin' : ""}`}></span></p>
                                {openSubCat === "accessories" && <div className="mobile-nav-section-item-container">
                                <p onClick={() => props.handleDropdownClick("facemasks", "sub_category")} className="mobile-nav-section-item">Facemasks</p>
                                <p onClick={() => props.handleDropdownClick("phonecases", "sub_category")} className="mobile-nav-section-item">Phone Cases</p>
                                <p onClick={() => props.handleDropdownClick("mousepads", "sub_category")} className="mobile-nav-section-item">Mousepads</p>
                                </div>}
                            </div>

                            <div className="mobile-nav-section-dropdown-section">
                                <p onClick={() => handleOpenSubCat("home")} className="mobile-nav-section-dropdown-section-header">DRINKWARE<span className={`nav-arrow-small ${openSubCat === "home" ? 'nav-btn-arrow-small-spin' : ""}`}></span></p>
                                {openSubCat === "home" && <div className="mobile-nav-section-item-container">
                                <p onClick={() => props.handleDropdownClick("mugs", "sub_category")} className="mobile-nav-section-item">Mugs</p>
                                <p onClick={() => props.handleDropdownClick("tumblers", "sub_category")} className="mobile-nav-section-item">Tumblers</p>
                                <p onClick={() => props.handleDropdownClick("waterbottles", "sub_category")} className="mobile-nav-section-item">Water Bottles</p>
                                </div>}
                            </div>
                        </div>}
                        
                    </div>

                    <div className="mobile-nav-section">
                        <p onClick={() => props.handleDropdownClick("new", "tag")} className="mobile-nav-section-header">NEW MERCHANDISE</p>
                    </div>
                    <div className="mobile-nav-section">
                        <p onClick={() => props.handleDropdownClick("best", "tag")} className="mobile-nav-section-header">BEST SELLERS</p>
                    </div>

                    <div className="mobile-nav-section">
                        <p onClick={() => handlePageChange("search")} className="mobile-nav-section-header">SEARCH</p>
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