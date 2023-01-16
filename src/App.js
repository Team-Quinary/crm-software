import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css';
import LoginPage from './components/LoginPage';
import Dashboard from './components/Dashboard';

function App() {
    return (
        <div className="App">
            <Router>
                <Routes>
                    <Route path="/" element={ <LoginPage /> } />
                    <Route path="/dashboard" element={ <Dashboard /> } />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
