import React from 'react';
import '../styles/login.css';

export default function Login(props) {

    const [user, setUser] = React.useState({
        username: "",
        password: "",
    })
    const [error, setError] = React.useState({
        username: false,
        password: false,
    })
    const [loginUser, setLoginUser] = React.useState(false);

    React.useEffect(() => {
        if (loginUser) {
            try {
                const url = props.root + '/login';
                async function attemptUserLogin() {
                    await fetch(url, {
                        method: "POST",
                        mode: 'cors',
                        credentials: 'include',
                        headers: {
                            "Content-Type":"application/json",
                        },
                        body: JSON.stringify(user),
                    }).then((res) => res.json())
                    .then((res) => {
                        if (res) {
                            props.setCurrentUser(res);
                            props.setPage("home");
                        } else {
                            alert("Invalid Login Credentials");
                        }
                        setLoginUser(false);
                    })
                    .catch((err) => setLoginUser(false));
                }
                attemptUserLogin();
            } catch(err) {
                console.log(err);
            }
        }
    }, [loginUser])

    function handleLoginInputChange(e) {
        setUser((prev) => ({
            ...prev,
            [e.target.name]: e.target.value
        }))
    }

    function handleLoginSubmit(e) {
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
            setLoginUser(true);
        }
    }

    return (
        <div className="login">
            <form className="login-form">
                <p className="login-header-main">Login to SynthMerch</p>
                <label htmlFor="username"><span>Username <span className="login-error">{!error.username ? "" : "*Please enter a username"}</span></span>
                    <input
                        onChange={handleLoginInputChange}
                        value={user.username}
                        type="text"
                        name="username"
                        className="login-input"
                        autoComplete="username"
                    />
                </label>
                <label htmlFor="password"><span>Password <span className="login-error">{!error.password ? "" : "*Please enter a password"}</span></span>
                    <input
                        onChange={handleLoginInputChange}
                        value={user.password}
                        type="password"
                        name="password"
                        className="login-input"
                        autoComplete="password"
                    />
                </label>
                <button 
                    className="main-btn"
                    type="submit" 
                    onClick={handleLoginSubmit}>Login</button>
            </form>
            <a className="new-user-btn" onClick={() => props.setPage('signup')}>New user? Make an account</a>
        </div>
    )
}