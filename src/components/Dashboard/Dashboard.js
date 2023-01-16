import React from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

function Dashboard() {
    return (
        <div className="dashboard">
            <div className="menu">
                <div>
                    <div className="log-icon">
                        <i className="fa-solid fa-power-off"></i>
                    </div>
                </div>
                <div className="user">
                    <div>
                        <center>
                            <img className="profile-pic" src={require('../../images/image.jpg')} width="130px" alt="Profile" />
                            <h2 className="username">Thushan D. Fernando</h2>
                            <h3 className="user-type">Administrator</h3>
                            <p className="edit-profile">
                                <Link to='/edit-profile'>Edit Profile</Link>
                            </p>
                        </center>
                    </div>
                </div>
                <div className="navigation">
                    <nav>
                        <ul>
                            <Link className='sections' to='/project-details'>Project Details</Link>
                            <Link className='sections' to='/customers'>Customers</Link>
                            <Link className='sections' to='/techleads'>Tech Leads</Link>
                            <Link className='sections' to='/reports'>Reports</Link>
                            <Link className='sections' to='/feedback-forms'>Feedback Forms</Link>
                            <Link className='sections' to='/newsletters'>Newsletters</Link>
                        </ul>
                    </nav>
                </div>
            </div>
            <div className="back">
                
            </div>
        </div>
    );
}

export default Dashboard;