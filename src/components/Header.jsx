import React from 'react';
import '../styles/header.css';

import SearchIcon from '@mui/icons-material/Search';
import Person4OutlinedIcon from '@mui/icons-material/Person4Outlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

export default function Header(props) {

    function handleDropdownClick(value) {
        props.setPage("viewTag");
        props.setViewTag(value);
    }

    
    return (
        <header>
            <nav>
                <div className="nav-btn-container">
                    <div className="nav-btn-text" onClick={() => props.setPage("home")}>HOME</div>
                </div>
                <div className="nav-btn-container">
                    <div className="nav-btn-text nav-btn-text-shop">SHOP <span className="nav-arrow"></span></div>
                    <div className="nav-btn-dropdown shop-dropdown">
                        <div className="shop-dropdown-section">
                            <p>TOPS</p>
                            <a onClick={() => handleDropdownClick("tshirts")}>T-Shirts</a>
                            <a onClick={() => handleDropdownClick("long sleeve shirts")}>Long Sleeves</a>
                            <p>ITEM</p>
                            <p>ITEM</p>
                            <p>ITEM</p>
                            <p>ITEM</p>
                            <p>ITEM</p>
                            <p>ITEM</p>
                            <p>ITEM</p>
                        </div>
                        <div className="shop-dropdown-section">
                            <p>BOTTOMS</p>
                            <p onClick={() => handleDropdownClick("sweatpants")}>Sweatpants</p>
                            <p>ITEM</p>
                            <p>ITEM</p>
                            <p>ITEM</p>
                            <p>ITEM</p>
                            <p>ITEM</p>
                            <p>ITEM</p>
                            <p>ITEM</p>
                            <p>ITEM</p>
                        </div>
                        <div className="shop-dropdown-section">
                            <p>ACCESSORIES</p>
                            <p>ITEM</p>
                            <p>ITEM</p>
                            <p>ITEM</p>
                            <p>ITEM</p>
                            <p>ITEM</p>
                            <p>ITEM</p>
                            <p>ITEM</p>
                            <p>ITEM</p>
                            <p>ITEM</p>
                        </div>
                        <div className="shop-dropdown-section">
                            <p>HOME</p>
                            <a onClick={() => handleDropdownClick("mugs")}>Mugs</a>
                            <a onClick={() => handleDropdownClick("posters")}>Posters</a>
                            <p>ITEM</p>
                            <p>ITEM</p>
                            <p>ITEM</p>
                            <p>ITEM</p>
                            <p>ITEM</p>
                            <p>ITEM</p>
                            <p>ITEM</p>
                            <p>ITEM</p>
                        </div>
                    </div>
                </div>
                <div className="nav-btn-container">
                    <div className="nav-btn-text">NEW MERCH</div>
                </div>
                <div className="nav-btn-container">
                    <div className="nav-btn-text">BEST SELLERS </div>
                </div>
            </nav>
            <div className="nav-icon-container">
                <SearchIcon />
                <Person4OutlinedIcon />
                <a onClick={() => props.setShowShoppingCart((prev) => !prev)}><ShoppingCartOutlinedIcon /></a>
                <a onClick={() => props.setPage("admin")}>ADMIN</a>
            </div>
        </header>
    )
}