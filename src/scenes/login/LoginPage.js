import React from 'react';
import Navbar from "../../components/navbar/Navbar";
import LoginForm from "../../components/login/LoginForm";

const LoginPage = () => {

    return (
        <div id="home-container">
            <Navbar/>
            <hr id="fade_hr"/>
            <LoginForm/>
        </div>
    );
};

export default LoginPage;