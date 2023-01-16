import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import useFetch from './useFetch';
import GetData from './GetData';
import "./LoginPage.css";

function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [usernameError, setUsernameError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const navigate = useNavigate();

    function handleSubmit(event) {
        event.preventDefault();
        setUsernameError("");
        setPasswordError("");

        if(!(username && password)) {
            if(!username) 
                setUsernameError("Please enter a username");

            if(!password)
                setPasswordError("Please enter a password");

            return false;
        }
        else {
            const path = "LoginUser/GetUser/" + username;
            const data = GetData(path);

            if(data != null){
                var uname = data[0]["username"]

                if(data[0]["password"] === password){
                    event.preventDefault();
                    setUsername("");
                    setPassword("");

                    navigate('/dashboard');
                }
                
                setPasswordError("Password is incorrect..! Try again.");
                return false;
            }
            
            setUsernameError("User does not exist..! Try again.");
            return false;
        }
    }

    function handleClear(event) {
        event.preventDefault();
        setUsername("");
        setPassword("");
        setUsernameError("");
        setPasswordError("");

        return true;
    }

    return (
        <div className="loginpage">
            <div className="login-back">
                <img src={require('../images/login-back-1.webp')} alt="background" />
            </div>
            <div className="form-container">
                <form onSubmit={handleSubmit} className="frmLogIn">
                    <img
                        src={require('../images/user-vector-light.png')}
                        className="user-pic"
                        alt="user-pic"
                    />
                    <input
                        type="text"
                        value={username}
                        placeholder="Username"
                        onChange={(event) => setUsername(event.target.value)}
                        className="username"
                    />
                    <div>
                        <p className="errorMsg">{usernameError}</p>
                    </div>
                    <input
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(event) => setPassword(event.target.value)}
                        className="password"
                    />
                    <div>
                        <p className="errorMsg">{passwordError}</p>
                    </div>
                    <div className="btns">
                        <button type="submit" onClick={handleSubmit} className="btnSubmit">
                            Log In
                        </button>
                        <button type="button" onClick={handleClear} className="btnClear">
                            Clear
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
