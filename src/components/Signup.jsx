import React from 'react';
import '../styles/signup.css';

export default function Signup(props) {

    const [user, setUser] = React.useState({
        username: "",
        email: "",
        phone: "",
        name: "",
        address1: "",
        city: "",
        state_code: "",
        country_code: "",
        zip: "",
        password: "",
        confirmPassword: "",
    })
    const [error, setError] = React.useState({
        username: false,
        email: false,
        phone: false,
        name: false,
        address1: false,
        city: false,
        state_code: false,
        country_code: false,
        zip: false,
        password: false,
        confirmPassword: false,
    })
    const [signupUser, setSignupUser] = React.useState(false);
    const [showSignupModal, setShowSignupModal] = React.useState(false);

    React.useEffect(() => {
        if (signupUser) {
            try {
                async function attemptSignupUser() {
                    const url = props.root + '/sign-up';
                    await fetch(url, {
                        method: "POST",
                        mode: 'cors',
                        headers: {
                            "Content-Type":"application/json",
                        },
                        body: JSON.stringify(user),
                    }).then((res) => res.json())
                    .then((res) => {
                        setSignupUser(false);
                        setShowSignupModal(true);
                    }).catch((err) => {console.log(err); setSignupUser(false)})
                }
                attemptSignupUser();
            } catch(err) {  
                console.log(err);
            }
        }
    }, [signupUser])

    function handleSignupInputChange(e) {
        setUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.name === "country_code" || e.target.name === "state_code" ? e.target.value.toUpperCase() : e.target.value
        }))
    } 

    function validateInputFields(e) {
        e.preventDefault();
        let allFieldsHaveValues = true;
        for (const key in user) {
            if (user[key] === "") {
                allFieldsHaveValues = false;
                setError((prev) => ({
                    ...prev,
                    [key]: true,
                }))
            } else {
                setError((prev) => ({
                    ...prev,
                    [key]: false,
                }))
            }
        }
        
        if (allFieldsHaveValues) {
            if (user.password === user.confirmPassword) {
                setSignupUser(true);
            } else {
                setError((prev) => ({
                    ...prev,
                    confirmPassword: true,
                }))
            }
        }
    }

    return (
        <div className="signup-container">
            {showSignupModal && <div className="signup-modal-container">
                <div className="signup-modal">
                    <p className="signup-modal-header">Account Created!</p>
                    <button onClick={() => props.setPage("login")} type="button" className="main-btn">Take Me to Login Page</button>
                </div>
            </div>}
            <form className="signup">
                <p className="signup-header-main">Create an Account</p>
                <label htmlFor="username"><span>Username <span className="signup-error">{!error.username ? "" : "*Please enter a username"}</span></span>
                    <input
                        value={user.username}
                        onChange={handleSignupInputChange}
                        type="text"
                        name="username"
                        autoComplete="username"
                        />
                </label>
                <label htmlFor="email"><span>Email <span className="signup-error">{!error.email ? "" : "*Please enter an email"}</span></span>
                    <input
                        onChange={handleSignupInputChange}
                        value={user.email}
                        type="text"
                        name="email"
                        />
                </label>
                <label htmlFor="phone"><span>Phone Number <span className="signup-error">{!error.phone ? "" : "*Please enter a phone number"}</span></span>
                    <input
                        onChange={handleSignupInputChange}
                        value={user.phone}
                        type="tel"
                        name="phone"
                        />
                </label>
                <label htmlFor="name"><span>Full Name <span className="signup-error">{!error.name ? "" : "*Please enter your name"}</span></span>
                    <input
                        onChange={handleSignupInputChange}
                        value={user.name}
                        type="text"
                        name="name"
                        />
                </label>
                <label htmlFor="address1"><span>Street <span className="signup-error">{!error.address1 ? "" : "*Please enter a street address"}</span></span>
                    <input
                        onChange={handleSignupInputChange}
                        value={user.address1}
                        type="text"
                        name="address1"
                        autoComplete="address"
                        />
                </label>
                <label htmlFor="city"><span>City <span className="signup-error">{!error.city ? "" : "*Please enter a city"}</span></span>
                    <input
                        onChange={handleSignupInputChange}
                        value={user.city}
                        type="text"
                        name="city"
                        autoComplete="city"
                        />
                </label>
                <label htmlFor="state_code"><span>State <span className="signup-error">{!error.state_code ? "" : "*Please enter a state"}</span></span>
                    <input
                        onChange={handleSignupInputChange}
                        value={user.state_code}
                        type="text"
                        name="state_code"
                        maxLength="2"
                        autoComplete="state"
                        />
                </label>
                <label htmlFor="country_code"><span>Country <span className="signup-error">{!error.country_code ? "" : "*Please enter a country"}</span></span>
                    <input
                        onChange={handleSignupInputChange}
                        value={user.country_code}
                        type="text"
                        name="country_code"
                        maxLength="2"
                        autoComplete="country"
                        />
                </label>
                <label htmlFor="zip"><span>Postal Code <span className="signup-error">{!error.zip ? "" : "*Please enter a postal code"}</span></span>
                    <input
                        onChange={handleSignupInputChange}
                        value={user.zip}
                        type="number"
                        name="zip"
                        autoComplete="zip"
                        />
                </label>
                <label htmlFor="password"><span>Password <span className="signup-error">{!error.password ? "" : "*Please enter a password"}</span></span>
                    <input
                        onChange={handleSignupInputChange}
                        value={user.password}
                        type="password"
                        name="password"
                        autoComplete="new-password"
                        />
                </label>
                <label htmlFor="confirmPassword"><span>Confirm Password <span className="signup-error">{!error.confirmPassword ? "" : "*Passwords must match"}</span></span>
                    <input
                        onChange={handleSignupInputChange}
                        value={user.confirmPassword}
                        type="password"
                        name="confirmPassword"
                        autoComplete="new-password"
                        />
                </label>
                <button className="main-btn signup-btn" type="submit" onClick={validateInputFields}>Signup</button>
            </form>
        </div>
    )
}