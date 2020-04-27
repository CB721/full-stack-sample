import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import "./style.scss";

function Login(props) {
    let history = useHistory();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function handleInputChange(event) {
        const { value, name } = event.target;
        if (name === "username") {
            setEmail(value);
        } else {
            setPassword(value);
        }
    }
    function loginUser(event) {
        props.login(event, { email, password })
            .then(res => {
                if (res) {
                    history.push("/profile");
                }
            })
            .catch(err => console.log(err));
    }
    return (
        <div className="login">
            <form>
                <div className="form-header">
                    Login
                </div>
                <div className="input-section">
                    <div className="input-name">
                        Email
                    </div>
                    <input
                        className="cust-input"
                        type="text"
                        name="username"
                        value={email}
                        onChange={handleInputChange}
                        placeholder="Your email address"
                        autoComplete="email"
                    />
                    <div className="input-name">
                        Password
                    </div>
                    <input
                        className="cust-input"
                        type="password"
                        name="password"
                        value={password}
                        onChange={handleInputChange}
                        placeholder="Your password"
                        autoComplete="current-password"
                    />
                    <button
                        onClick={loginUser}
                        disabled={!email || !password}
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Login;