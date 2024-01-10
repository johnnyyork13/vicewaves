import React from 'react';
import '../styles/signup.css';

export default function Signup(props) {

    const [user, setUser] = React.useState({
        username: "",
        email: "",
        phone: "",
        firstName: "",
        lastName: "",
        address1: "",
        address2: "",
        city: "",
        state_code: "AL",
        country_code: "US",
        zip: "",
        password: "",
        confirmPassword: "",
    })
    const [error, setError] = React.useState({
        username: false,
        email: false,
        phone: false,
        firstName: false,
        lastName: false,
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
    const [usernameExistsModal, setShowUsernameExistsModal] = React.useState(false);

    React.useEffect(() => {
        document.documentElement.scrollTop = 0;
    }, [signupUser])

    React.useEffect(() => {
        if (signupUser) {
            try {
                async function attemptSignupUser() {
                    console.log('signing up user');
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
                        if (res.success) {
                            setSignupUser(false);
                            setShowSignupModal(true);
                        } else {
                            setShowUsernameExistsModal(true);
                            setSignupUser(false);
                        }
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
        const phoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im
        e.preventDefault();
        let allFieldsHaveValues = true;
        for (const key in user) {
            if (key !== "address2" && user[key] === "" || (key === "password" && user[key].length < 8)) {
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

        if (!phoneRegex.test(user.phone)) {
            setError((prev) => ({
                ...prev,
                phone: true,
            }))
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
            {usernameExistsModal && <div className="signup-modal-container">
                <div className="signup-modal">
                    <p className="signup-modal-header">Username already exists!</p>
                    <button onClick={() => setShowUsernameExistsModal(false)} type="button" className="main-btn">Continue</button>
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
                        type="email"
                        name="email"
                        />
                </label>
                <label htmlFor="phone"><span>Phone Number <span className="signup-error">{!error.phone ? "" : "*Please enter a valid phone number"}</span></span>
                    <input
                        onChange={handleSignupInputChange}
                        value={user.phone}
                        type="tel"
                        name="phone"
                        />
                </label>
                <label htmlFor="firstName"><span>First Name <span className="signup-error">{!error.firstName ? "" : "*Please enter your first name"}</span></span>
                    <input
                        onChange={handleSignupInputChange}
                        value={user.firstName}
                        type="text"
                        name="firstName"
                        />
                </label>
                <label htmlFor="lastName"><span>Last Name <span className="signup-error">{!error.lastName ? "" : "*Please enter last your name"}</span></span>
                    <input
                        onChange={handleSignupInputChange}
                        value={user.lastName}
                        type="text"
                        name="lastName"
                        />
                </label>
                <label htmlFor="address1"><span>Street Address<span className="signup-error">{!error.address1 ? "" : "*Please enter a street address"}</span></span>
                    <input
                        onChange={handleSignupInputChange}
                        value={user.address1}
                        type="text"
                        name="address1"
                        autoComplete="address"
                        />
                </label>
                <label htmlFor="address2"><span>Apartment, Suite, or Building {'(Optional)'}</span>
                    <input
                        onChange={handleSignupInputChange}
                        value={user.address2}
                        type="text"
                        name="address2"
                        autoComplete="address2"
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
                    <select
                        onChange={handleSignupInputChange}
                        value={user.state_code}
                        type="text"
                        name="state_code"
                        maxLength="2"
                        autoComplete="state"
                    >
                        <option value="AL">Alabama</option>
                        <option value="AK">Alaska</option>
                        <option value="AZ">Arizona</option>
                        <option value="AR">Arkansas</option>
                        <option value="CA">California</option>
                        <option value="CO">Colorado</option>
                        <option value="CT">Connecticut</option>
                        <option value="DE">Delaware</option>
                        <option value="DC">District Of Columbia</option>
                        <option value="FL">Florida</option>
                        <option value="GA">Georgia</option>
                        <option value="HI">Hawaii</option>
                        <option value="ID">Idaho</option>
                        <option value="IL">Illinois</option>
                        <option value="IN">Indiana</option>
                        <option value="IA">Iowa</option>
                        <option value="KS">Kansas</option>
                        <option value="KY">Kentucky</option>
                        <option value="LA">Louisiana</option>
                        <option value="ME">Maine</option>
                        <option value="MD">Maryland</option>
                        <option value="MA">Massachusetts</option>
                        <option value="MI">Michigan</option>
                        <option value="MN">Minnesota</option>
                        <option value="MS">Mississippi</option>
                        <option value="MO">Missouri</option>
                        <option value="MT">Montana</option>
                        <option value="NE">Nebraska</option>
                        <option value="NV">Nevada</option>
                        <option value="NH">New Hampshire</option>
                        <option value="NJ">New Jersey</option>
                        <option value="NM">New Mexico</option>
                        <option value="NY">New York</option>
                        <option value="NC">North Carolina</option>
                        <option value="ND">North Dakota</option>
                        <option value="OH">Ohio</option>
                        <option value="OK">Oklahoma</option>
                        <option value="OR">Oregon</option>
                        <option value="PA">Pennsylvania</option>
                        <option value="RI">Rhode Island</option>
                        <option value="SC">South Carolina</option>
                        <option value="SD">South Dakota</option>
                        <option value="TN">Tennessee</option>
                        <option value="TX">Texas</option>
                        <option value="UT">Utah</option>
                        <option value="VT">Vermont</option>
                        <option value="VA">Virginia</option>
                        <option value="WA">Washington</option>
                        <option value="WV">West Virginia</option>
                        <option value="WI">Wisconsin</option>
                        <option value="WY">Wyoming</option>
                    </select>
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
                <label htmlFor="country_code"><span>Country <span className="signup-error">{!error.country_code ? "" : "*Please enter a country"}</span></span>
                    <input
                        className="input-country-code"
                        type="text"
                        name="country_code"
                        maxLength="2"
                        autoComplete="country"
                        readOnly={true}
                        placeholder='United States'
                        />
                </label>
                <label htmlFor="password"><span>Password {'(minimum 8 characters)'}<span className="signup-error">{!error.password ? "" : "*Please enter a valid password"}</span></span>
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