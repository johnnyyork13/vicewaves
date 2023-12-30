import React from 'react';

import '../styles/edit-profile.css';

export default function EditProfile(props) {

    const [updatedUser, setUpdatedUser] = React.useState(null)
    const [editUserError, setEditUserError] = React.useState({
        email: false,
        phone: false,
        name: false,
        address1: false,
        city: false,
        state_code: false,
        country_code: false,
        zip: false,
    })
    const [sendUpdatedUser, setSendUpdatedUser] = React.useState(false);
    const [showUpdateSuccessModal, setShowUpdateSuccessModal] = React.useState(false);

    React.useEffect(() => {
        if (props.user) {
            setUpdatedUser({
                username: props.user.username,
                email: props.user.email,
                phone: props.user.phone,
                name: props.user.name,
                address1: props.user.address1,
                city: props.user.city,
                state_code: props.user.state_code,
                country_code: props.user.country_code,
                zip: props.user.zip,
            })
        }
    }, [props.user])

    React.useEffect(() => {
        if (sendUpdatedUser) {
            async function postUpdatedUser() {
                const url = props.root + '/profile/update';
                await fetch(url, {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        "Content-Type":"application/json",
                    },
                    body: JSON.stringify(updatedUser)
                }).then((res) => res.json())
                .then(() => setShowUpdateSuccessModal(true))
                .catch((err) => console.log(err));
            }
            postUpdatedUser();
        }
    }, [sendUpdatedUser])

    function handleEditProfileChange(e) {
        setUpdatedUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    function handleEditProfileSubmit() {
        let allFieldsHaveValues = true;
        for (const key in updatedUser) {
            if (updatedUser[key] === "") {
                allFieldsHaveValues = false;
                setEditUserError((prev) => ({
                    ...prev,
                    [key]: true,
                }))
            } else {
                setEditUserError((prev) => ({
                    ...prev,
                    [key]: false,
                }))
            }
        }

        if (allFieldsHaveValues) {
            setSendUpdatedUser(true);
        }
    }

    return (
        <div className="edit-profile-container">
                    {showUpdateSuccessModal && 
                        <div className="update-profile-success-modal-background">
                            <div className="update-profile-success-modal">
                                <p className="update-profile-success-modal-header">Profile Updated Successfully</p>
                                <button 
                                    onClick={() => {
                                        props.setShowEditProfile(false)
                                    }}
                                    className="main-btn update-profile-success-modal-btn"
                                    >Back to Profile</button>
                            </div>
                        </div>
                    }
                    {updatedUser && <div className="edit-profile">
                        <button 
                            onClick={() => props.setShowEditProfile(false)}
                            type="button"
                            className="main-btn close-edit-profile-btn"
                        >Close</button>
                        <p className="edit-profile-header">Edit Profile</p>
                        <label htmlFor='email'>
                            <span className="edit-profile-label-text">Email
                            {editUserError.email && <span className="edit-profile-label-error"> *Please enter an email</span>}</span>
                            <input 
                                onChange={handleEditProfileChange}
                                value={updatedUser.email} 
                                type="email" name="email" 
                                className="edit-profile-input" />
                        </label>
                        <label htmlFor='phone'>
                            <span className="edit-profile-label-text">Phone Number
                            {editUserError.phone && <span className="edit-profile-label-error"> *Please enter a phone number</span>}</span>
                            <input 
                                onChange={handleEditProfileChange}
                                value={updatedUser.phone} 
                                type="tel" 
                                name="phone" 
                                className="edit-profile-input" />
                        </label>
                        <label htmlFor='name'>
                            <span className="edit-profile-label-text">Full Name
                            {editUserError.name && <span className="edit-profile-label-error"> *Please enter a name</span>}</span>
                            <input 
                                onChange={handleEditProfileChange}
                                value={updatedUser.name} 
                                type="text" 
                                name="name" 
                                className="edit-profile-input" />
                        </label>
                        <label htmlFor='address1'>
                            <span className="edit-profile-label-text">Street Address
                            {editUserError.address1 && <span className="edit-profile-label-error"> *Please enter a street address</span>}</span>
                            <input 
                                onChange={handleEditProfileChange}
                                value={updatedUser.address1} 
                                type="text" 
                                name="address1" 
                                className="edit-profile-input" />
                        </label>
                        <label htmlFor='city'>
                            <span className="edit-profile-label-text">City
                            {editUserError.city && <span className="edit-profile-label-error"> *Please enter a city</span>}</span>
                            <input 
                                onChange={handleEditProfileChange}
                                value={updatedUser.city} 
                                type="text" 
                                name="city" 
                                className="edit-profile-input" />
                        </label>
                        <label htmlFor='state_code'>
                            <span className="edit-profile-label-text">State
                            {editUserError.state_code && <span className="edit-profile-label-error"> *Please enter a state</span>}</span>
                            <input 
                                onChange={handleEditProfileChange}
                                value={updatedUser.state_code} 
                                type="text" 
                                name="state_code" 
                                maxLength="2"
                                className="edit-profile-input" />
                        </label>
                        <label htmlFor='country_code'>
                            <span className="edit-profile-label-text">Country
                            {editUserError.country_code && <span className="edit-profile-label-error"> *Please enter a country</span>}</span>
                            <input 
                                onChange={handleEditProfileChange}
                                value={updatedUser.country_code} 
                                type="text" 
                                name="country_code" 
                                maxLength="2"
                                className="edit-profile-input" />
                        </label>
                        <label htmlFor='zip'>
                            <span className="edit-profile-label-text">Postal Code
                            {editUserError.zip && <span className="edit-profile-label-error"> *Please enter a postal code</span>}</span>
                            <input 
                                onChange={handleEditProfileChange}
                                value={updatedUser.zip} 
                                type="number" 
                                name="zip" 
                                className="edit-profile-input" />
                        </label>
                        
                        <button 
                            onClick={handleEditProfileSubmit}
                            className="main-btn edit-profile-btn"
                            type="button"
                        >Update Profile</button>
                    </div>}
                </div>
    )
}