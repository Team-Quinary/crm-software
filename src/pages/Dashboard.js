import React from 'react';
import { useSelector } from 'react-redux';
import AdminDb from '../components/Dashboard/AdminDb';
import TechLeadDB from '../components/Dashboard/TechLeadDB';
import CustomerDB from '../components/Dashboard/CustomerDB';

export default function Dashboard() {
    const role = 'Admin' // useSelector(state => state.login.currentUser.role);

    return (
        <div className='home'>
            {
                (role === 'Admin') ? <AdminDb />
                : (role === 'Tech Lead') ? <TechLeadDB />
                    : (role === 'Customer') ? <CustomerDB /> : null
            }
        </div>
    )
}
