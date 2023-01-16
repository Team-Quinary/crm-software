import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import Login from './components/Login/Login';
import LoginPage from './components/Login/LoginPage';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={ <LoginPage /> } />
                    <Route path="/login" element={ <Login /> } />
                    <Route path="/dashboard" element={ <Dashboard /> } />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
