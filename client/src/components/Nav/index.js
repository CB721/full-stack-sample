import React from 'react';
import { useHistory } from "react-router-dom";
import "./style.scss";

function Nav(props) {
    let history = useHistory();
    function logout(event) {
        event.preventDefault();
        props.logout()
            .then(res => {
                if (res) {
                    history.push("/login");
                }
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <nav className="nav">
            <ul>
                <li onClick={() => history.push("/")}>
                    Home
                </li>
                {props.loggedIn.email ? (
                    <div>
                        <li onClick={() => history.push("/profile")}>
                            Profile
                        </li>
                        <li onClick={event => logout(event)}>
                            Logout
                        </li>
                    </div>
                ) : (
                    <div>

                        <li onClick={() => history.push("/signup")}>
                            Sign Up
                        </li>
                        <li onClick={() => history.push("/login")}>
                            Login
                        </li>
                    </div>
                    )}
            </ul>
        </nav>
    )
}

export default Nav;