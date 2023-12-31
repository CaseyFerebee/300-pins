import React, { useState } from "react"
import { Link, useNavigate,  } from "react-router-dom";
import "./Login.css"

export const Login = () => {
    const [email, set] = useState("CaseyF@gmail.com")
    const navigate = useNavigate()
;

    const handleLogin = (e) => {
        e.preventDefault();

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then((res) => res.json())
            .then((foundUsers) => {
                console.log(foundUsers); // Log the foundUsers array for debugging

                if (foundUsers.length === 1) {
                    const user = foundUsers[0];
                    const userId = user.id // Capture the user ID

                    localStorage.setItem("bowler_user", JSON.stringify({ id: userId, name: user.name, email: user.email }));

                
                    navigate(`/user/${userId}`);
                    navigate("/");
                } else {
                    window.alert("Invalid login");
                }
            });
    };

    
    return (
        <main className="container--login">
            <section>
                <form className="form--login" onSubmit={handleLogin}>
                    <h1>Lets Bowl</h1>
                    <h2>Please sign in</h2>
                    <fieldset>
                        <label htmlFor="inputEmail"> Email address </label>
                        <input type="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            required autoFocus />
                    </fieldset>
                    <fieldset>
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                </form>
            </section>
            <section className="link--register">
                <Link to="/register">Not a member yet?</Link>
            </section>
        </main>
    
    )
}

