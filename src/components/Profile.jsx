import React from 'react';
import '../styles/profile.css';
import UpdatePassword from './UpdatePassword';
import EditProfile from './EditProfile';
import {v4 as uuidv4} from 'uuid';

export default function Profile(props) {

    const TAX_RATE = 0.10;

    const [user, setUser] = React.useState(null);
    const [orders, setOrders] = React.useState([]);
    const [showEditProfile, setShowEditProfile] = React.useState(false);
    const [showUpdatePassword, setShowUpdatePassword] = React.useState(false);
    const [selectedOrder, setSelectedOrder] = React.useState(null);
    const [viewProduct, setViewProduct] = React.useState(null);
    const [loadingSpinner, setLoadingSpinner] = React.useState(true);

    React.useEffect(() => {
        if (viewProduct) {
            try {
                async function getProductFromDatabase() {
                    const url = props.root + `/product/get-product-by-variant/${viewProduct}`;
                    await fetch(url, {
                        method: "GET",
                        mode: "cors",
                        credentials: "include",
                    }).then((res) => res.json())
                    .then((res) => {
                        props.setCurrentProduct(res);
                        props.setPage("viewProduct");
                    })
                }
                getProductFromDatabase();
            } catch(err) {
                console.log(err);
            }
        }
    }, [viewProduct])

    React.useEffect(() => {
        document.documentElement.scrollTop = 0;
    }, [selectedOrder])

    React.useEffect(() => {
        try {
            async function getProfileDetails() {
                const url = props.root + '/profile';
                await fetch(url, {
                    method: "POST",
                    mode: "cors",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: props.currentUser.username
                    })
                }).then((res) => res.json())
                .then((res) => {
                    setUser(res.user);
                    setOrders(res.orders);
                    setLoadingSpinner(false);
                }).catch((err) => console.log(err));
            }
            getProfileDetails();
        } catch(err) {
            console.log(err);
        }
    }, [showEditProfile])

    const mappedOrders = orders.map((order) => {
        let d = new Date(0);
        d.setUTCSeconds(order.result.created);
        const convertedDate = `${d.getUTCMonth() + 1}/${d.getUTCDay()}/${d.getUTCFullYear()}`
        return <div key={uuidv4()} className="profile-order">
                    <div className="profile-order-text-container">
                        <a className="profile-order-link"
                            onClick={() => setSelectedOrder({...order.result, date: convertedDate})}
                            >Order {order.result.external_id}
                        </a>
                        <p className="profile-order-text">
                            created on: {convertedDate} ({order.result.items.length} item{order.result.items.length > 1 ? "s" : ""})
                        </p>
                    </div>
                    <div 
                        onClick={() => setSelectedOrder({...order.result, date: convertedDate})}
                        className="profile-order-view-order-link"
                    >View</div>
                </div>
    })

    let totalOrderCost = 0;

    const mappedOrderCards = selectedOrder && selectedOrder.items.map((product) => {
        totalOrderCost += Number(product.retail_price) * product.quantity;
        return <div key={uuidv4()} className="profile-view-order-card">
            <img   
                onClick={() => setViewProduct(product.sync_variant_id)}
                src={product.files[1].thumbnail_url} 
            />
            <div className="profile-view-order-card-info">
                <p className="profile-view-order-card-info-header">{product.name}</p>
                <p className="profile-view-order-card-info-text">${product.retail_price}</p>
                <p className="profile-view-order-card-info-text">Quantity: {product.quantity}</p>
                <a 
                    onClick={() => setViewProduct(product.sync_variant_id)}
                    className="profile-view-order-card-info-text"
                >Go to Product Page</a>
            </div>
        </div>
    })


    return (
        <div className="profile-container">
            {selectedOrder && <div className="profile-view-order-background">
                <div className="profile-view-order">
                    <button 
                        className="close-profile-view-order-btn main-btn"
                        onClick={() => setSelectedOrder(null)}
                    >Close</button>
                    <p className="profile-view-order-header">Viewing Order {selectedOrder.external_id}</p>
                    <p className="profile-view-order-subheader">Created on {selectedOrder.date}</p>
                    <p className="profile-view-order-status">Order Status: <span>{selectedOrder.status}</span></p>
                    {mappedOrderCards}
                    <p className="profile-view-order-total">Order Total: <span>{Number(totalOrderCost * TAX_RATE + totalOrderCost).toFixed(2)}</span></p>
                    <button
                        onClick={() => setSelectedOrder(null)}
                        className="main-btn close-profile-view-order-btn-bottom"
                    >
                    Back to Profile
                    </button>
                </div>
            </div>}
            {showUpdatePassword && 
                <UpdatePassword 
                    root={props.root}
                    setShowUpdatePassword={setShowUpdatePassword}
                    user={user}
                />
            }
            {showEditProfile && 
                <EditProfile 
                    setShowEditProfile={setShowEditProfile}
                    setLoadingSpinner={setLoadingSpinner}
                    user={user}
                    root={props.root}
                />   
            }
            <p className="main-profile-header">My Profile</p>
            {loadingSpinner && 
                <div className="profile-loading-spinner-container">
                    <div className="profile-loading-spinner">
                    </div>
                    <span className="profile-loading-spinner-text">Loading Profile...</span>
                </div>
            }
            {!loadingSpinner && user && <div className="profile">
                <div className="profile-details">
                    <p className="profile-details-header">Account Details</p>
                    <p className="profile-header">Account Holder Name</p>
                    <div className="profile-text">
                        <p>{user.firstName} {user.lastName}</p>
                    </div>
                    <br></br>
                    <p className="profile-header">PHONE</p>
                    <div className="profile-text">
                        <p>{user.phone}</p>
                    </div>
                    <br></br>
                    <p className="profile-header">EMAIL</p>
                    <div className="profile-text">
                        <p>{user.email}</p>
                    </div>
                    <br></br>
                    <p className="profile-header">Shipping Address</p>
                    <div className="profile-text">
                        <p>{user.address1}</p>
                        {user.address2 && <p>{user.address2}</p>}
                        <p>{user.city}, {user.state_code} {user.zip}</p>
                    </div>
                    <button 
                        onClick={() => setShowEditProfile(true)}
                        className="profile-edit-btn main-btn"
                    >Edit Profile</button>
                    <button 
                        onClick={() => setShowUpdatePassword(true)}
                        className="profile-update-password-btn main-btn"
                    >Update Password</button>
                </div>
                <div className="order-details">
                    <p className="order-details-header">My Orders</p>
                    {orders ? mappedOrders : "No orders yet..."}
                </div>
            </div>
            }
        </div>
    )
}