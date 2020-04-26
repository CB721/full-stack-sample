import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import "./style.scss";

function Profile(props) {
    const [content, setContent] = useState("");
    function handleInputChange(event) {
        setContent(event.target.value);
    }
    function selectApp() {
        console.log("assign application");
    }
    return (
        <div className="profile">
            <div className="user-info">
                <div className="info-header">
                    Your Info
                </div>
                <div className="info">
                    Email
                </div>
                <div className="info">
                    First name
                </div>
                <div className="info">
                    Last name
                </div>
            </div>
            {/* conditionally show depending on if the user is an admin */}
            <div className="applications">
                <div className="info-header">
                    Your application
                </div>
                <div className="info">
                    Submitted on:
                </div>
                <div className="info">
                    Status:
                </div>
                <div className="info">
                    Content:
                </div>
            </div>
            <div className="applications">
                <div className="info-header">
                    Your applications
                </div>
                <div className="single-app">
                    <div className="info">
                        User name:
                    </div>
                    <div className="info">
                        Submitted on:
                    </div>
                    <div className="info">
                        Assigned on:
                    </div>
                </div>
            </div>
            <div className="applications">
                <div className="info-header">
                    Select an application
                </div>
                <div className="single-app" onClick={selectApp}>
                    <div className="info">
                        User name:
                    </div>
                    <div className="info">
                        Submitted on:
                    </div>
                </div>
            </div>
            <div className="applications">
                <div className="info-header">
                    Submit an application
                </div>
                <div className="single-app">
                    <form>
                        <div className="input-section">
                            <div className="input-name">
                                Content
                            </div>
                            <textarea
                                className="cust-input"
                                rows="10"
                                cols="30"
                                type="text"
                                name="content"
                                value={content}
                                onChange={handleInputChange}
                                placeholder="Your application"
                            />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Profile;