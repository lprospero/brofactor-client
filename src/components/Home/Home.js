import React, { useState } from "react";
import { useCookies } from "react-cookie";
import Login from "./Login";

const Home = () => {
    const [cookies, setCookie] = useCookies(null);
    if (cookies.user) {
        return (
            <div>
                <h1>Home</h1>
            </div>
        );
    } else {
        return (<Login />)
    }
}

export default Home;