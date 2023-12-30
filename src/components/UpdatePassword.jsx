import React from 'react';

import '../styles/update-password.css';

export default function UpdatePassword(props) {

    const [validatedUser, setValidatedUser] = React.useState(null);
    const [sendValidatedUser, setSendValidatedUser] = React.useState(false);
    const [updatePasswordError, setUpdatePasswordError] = React.useState({
        password: false,
        passwordNew: false,
        confirmNewPassword: false,
    })
    const [showPasswordUpdateSuccessModal, setShowPasswordUpdateSuccessModal] = React.useState(false);

    React.useEffect(() => {
        if (props.user) {
            setValidatedUser({
                username: props.user.username,
                password: "",
                passwordNew: "",
                confirmNewPassword: "",
            })
        }
    }, [props.user])

    React.useEffect(() => {
        try {
            if (sendValidatedUser) {
                async function verifyUser() {
                    const url = props.root + '/profile/update/password';
                    await fetch(url, {
                        method: "POST",
                        mode: 'cors',
                        headers: {
                            "Content-Type":"application/json",
                        },
                        body: JSON.stringify(validatedUser)})
                        .then((res) => res.json())
                        .then((res) => {
                            console.log(res.success);
                            if (res.success) {
                                setShowPasswordUpdateSuccessModal(true);
                            } else {
                                setUpdatePasswordError((prev) => ({
                                    ...prev,
                                    password: true,
                                }))
                            }
                            setSendValidatedUser(false);
                        })
                        .catch((err) => console.log(err));
                }
                verifyUser();
            }
        } catch(err) {
            console.log(err);
        }

    }, [sendValidatedUser])

    function handlePasswordChange(e) {
        setValidatedUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value,
        }))
    }

    function handlePasswordSubmit(e) {
        e.preventDefault();
        let allFieldsHaveValues = true;
        for (const key in validatedUser) {
            if (validatedUser[key] === "") {
                allFieldsHaveValues = false;
                setUpdatePasswordError((prev) => ({
                    ...prev,
                    [key]: true,
                }))
            } else {
                setUpdatePasswordError((prev) => ({
                    ...prev,
                    [key]: false,
                }))
            }
        }
        if (allFieldsHaveValues) {
            setSendValidatedUser(true);
        }
    }


    return (
        <div className="update-password-container">
            {showPasswordUpdateSuccessModal && 
                <div className="password-update-success-modal-background">
                    <div className="password-update-success-modal">
                        <p className="password-update-success-modal-header">Password updated successfully!</p>
                        <button 
                            onClick={() => props.setShowUpdatePassword(false)}
                            type="button" 
                            className="main-btn password-update-success-btn"
                        >Confirm</button>
                    </div>
                </div>
            }
            {validatedUser && <form className="update-password">
                <button 
                    onClick={() => props.setShowUpdatePassword(false)}
                    className="main-btn close-update-password-btn"
                >Close</button>
                <p className="update-password-header">Update Password</p>
                <label htmlFor='password'>
                    <span className="edit-profile-label-text">Enter Old Password
                    {updatePasswordError.password && <span className="edit-profile-label-error"> *Please enter a valid password</span>}</span>
                    <input 
                        onChange={handlePasswordChange}
                        value={validatedUser.password} 
                        type="password" name="password" 
                        className="edit-profile-input" />
                </label>
                <label htmlFor='passwordNew'>
                    <span className="edit-profile-label-text">Enter New Password
                    {updatePasswordError.passwordNew && <span className="edit-profile-label-error"> *Please enter your new password</span>}</span>
                    <input 
                        onChange={handlePasswordChange}
                        value={validatedUser.passwordNew} 
                        type="password" name="passwordNew" 
                        className="edit-profile-input" />
                </label>
                <label htmlFor='confirmNewPassword'>
                    <span className="edit-profile-label-text">Confirm New Password
                    {updatePasswordError.confirmNewPassword && <span className="edit-profile-label-error"> *Please confirm your new password</span>}</span>
                    <input 
                        onChange={handlePasswordChange}
                        value={validatedUser.confirmNewPassword} 
                        type="password" name="confirmNewPassword" 
                        className="edit-profile-input" />
                </label>
                <button 
                    className="main-btn update-password-confirm-btn"
                    type="submit" 
                    onClick={handlePasswordSubmit}
                >Confirm</button>
            </form>}
        </div>
    )
}