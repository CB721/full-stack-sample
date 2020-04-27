import React from 'react';
import { useHistory } from "react-router-dom";
import "./style.scss";

function Nav(props) {
    let history = useHistory();
    
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
                        <li onClick={() => history.push("/logout")}>
                            Logout
                        </li>
                    </div>
                ) : (
                        <li onClick={() => history.push("/login")}>
                            Login
                        </li>
                    )}
            </ul>
        </nav>
    )
}

export default Nav;