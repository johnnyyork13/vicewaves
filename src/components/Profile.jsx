import React from 'react';
import '../styles/profile.css';
import UpdatePassword from './UpdatePassword';
import EditProfile from './EditProfile';
import { Update } from '@mui/icons-material';

export default function Profile(props) {

    const [user, setUser] = React.useState(null);
    const [orders, setOrders] = React.useState(null);
    const [showEditProfile, setShowEditProfile] = React.useState(false);
    const [showUpdatePassword, setShowUpdatePassword] = React.useState(false);

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
                    user={user}
                    root={props.root}
                />   
            }
            <p className="main-profile-header">My Account</p>
            {user && <div className="profile">
                <div className="profile-details">
                    <p className="profile-details-header">Account Details</p>
                    <p className="profile-header">Account Holder Name</p>
                    <div className="profile-text">
                        <p>{user.name}</p>
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
                        <p>{user.city}, {user.state_code}</p>
                        <p>{user.country_code} {user.zip}</p>
                    </div>
                    <button 
                        onClick={() => setShowEditProfile(true)}
                        className="profile-edit-btn main-btn"
                    >Edit Profile</button>
                    <button 
                        onClick={() => setShowUpdatePassword(true)}
                        className="profile-edit-btn main-btn"
                    >Update Password</button>
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