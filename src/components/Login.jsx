import React from 'react';
import '../styles/login.css';

export default function Login(props) {

    const [user, setUser] = React.useState({
        username: "",
        password: "",
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
                        setLoginUser(false)
                        props.setCurrentUser(res);
                        props.setPage("home");
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

    return (
        <div className="login">
            <div className="login-form">
                <label htmlFor="username">Username
                    <input
                        onChange={handleLoginInputChange}
                        value={user.username}
                        type="text"
                        name="username"
                        className="login-input"
                    />
                </label>
                <label htmlFor="password">Password
                    <input
                        onChange={handleLoginInputChange}
                        value={user.password}
                        type="password"
                        name="password"
                        className="login-input"
                    />
                </label>
                <button 
                    className="main-btn"
                    type="button" 
                    onClick={() => setLoginUser(true)}>Login</button>
            </div>
            <a onClick={() => props.setPage('signup')}>New user? Make an account</a>
        </div>
    )
}