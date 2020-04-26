import React, { useEffect, useState } from 'react';
import { useHistory } from "react-router-dom";
import "./style.scss";

function Home(props) {
    return (
        <div className="home">
            <div className="page-section">
                <p className="page-name">
                    Sample App
                </p>
            </div>
        </div>
    )
}

export default Home;