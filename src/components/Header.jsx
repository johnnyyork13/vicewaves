import React from 'react';
import '../styles/header.css';

import SearchIcon from '@mui/icons-material/Search';
import Person4OutlinedIcon from '@mui/icons-material/Person4Outlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';

export default function Header(props) {

    const [sendLogout, setSendLogout] = React.useState(false);

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
                            <a>ITEM</a>
                            <a>ITEM</a>
                            <a>ITEM</a>
                            <a>ITEM</a>
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
                {props.currentUser && <p>Welcome back, {props.currentUser.name}</p>}
                <a><SearchIcon /></a>
                <a onClick={() => props.setShowShoppingCart((prev) => !prev)}><ShoppingCartOutlinedIcon /></a>
                <a onClick={() => {
                    props.currentUser ? props.setPage("profile") : props.setPage("login")
                    
                }}><Person4OutlinedIcon /></a>
                {props.currentUser && props.currentUser.membership === "admin" && <a className="admin-link" onClick={() => props.setPage("admin")}>ADMIN CONSOLE</a>}
                {props.currentUser && <a className="logout-btn" onClick={() => setSendLogout(true)}>Logout</a>}
            </div>
        </header>
    )
}