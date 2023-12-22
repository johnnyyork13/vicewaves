import React from 'react';

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
    })
    const [signupUser, setSignupUser] = React.useState(false);

    React.useEffect(() => {
        if (signupUser) {
            console.log("attempting signup");
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
                        console.log(res)
                        setSignupUser(false);
                    })
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
            [e.target.name]: e.target.value
        }))
    } 

    return (
        <div className="signup">
            <input
                value={user.username} 
                onChange={handleSignupInputChange}
                type="text" 
                name="username" 
                placeholder="Username" />
            <input
                onChange={handleSignupInputChange}
                value={user.email} 
                type="text" 
                name="email" 
                placeholder="Email" />
            <input
                onChange={handleSignupInputChange}
                value={user.phone} 
                type="tel" 
                name="phone" 
                placeholder="Phone" />
            <input
                onChange={handleSignupInputChange}
                value={user.name} 
                type="text" 
                name="name" 
                placeholder="Full Name" />
            <input
                onChange={handleSignupInputChange}
                value={user.address1} 
                type="text" 
                name="address1" 
                placeholder="Street" />
            <input
                onChange={handleSignupInputChange}
                value={user.city} 
                type="text" 
                name="city" 
                placeholder="City" />
            <input
                onChange={handleSignupInputChange}
                value={user.state_code} 
                type="text" 
                name="state_code" 
                placeholder="State" />
            <input
                onChange={handleSignupInputChange}
                value={user.country_code} 
                type="text" 
                name="country_code" 
                placeholder="Country" />
            <input
                onChange={handleSignupInputChange}
                value={user.zip} 
                type="text" 
                name="zip" 
                placeholder="Zip Code" />
            <input
                onChange={handleSignupInputChange}
                value={user.password} 
                type="text" 
                name="password" 
                placeholder="Password" />
            <button type="button" onClick={() => setSignupUser(true)}>Signup</button>
        </div>
    )
}