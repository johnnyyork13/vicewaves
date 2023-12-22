import React from 'react';
import '../styles/profile.css';

export default function Profile(props) {

    const [user, setUser] = React.useState(null);
    const [orders, setOrders] = React.useState(null);

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
                .then((res) => setUser(res))
                .catch((err) => console.log(err));
            }
            getProfileDetails();
        } catch(err) {
            console.log(err);
        }
    }, [])

    return (
        <div className="profile-container">
            <p className="main-profile-header">My Account</p>
            {user && <div className="profile">
                <div className="profile-details">
                    <p className="profile-details-header">Account Details</p>
                    <p className="profile-header">Account Holder Name</p>
                    <p className="profile-text">
                        <p>{user.name}</p>
                    </p>
                    <br></br>
                    <p className="profile-header">Shipping Address</p>
                    <p className="profile-text">
                        <p>{user.address1}</p>
                        <p>{user.city}, {user.state_code}</p>
                        <p>{user.country_code} {user.zip}</p>
                    </p>
                    <button 
                        className="profile-edit-btn main-btn"
                    >Edit</button>
                </div>
                <div className="order-details">
                    <p className="profile-header">Order Details</p>
                    {orders ? "orders go here" : "No orders yet..."}
                </div>
            </div>
            }
        </div>
    )
}