import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import AdminDb from '../components/Dashboard/AdminDb';
import TechLeadDB from '../components/Dashboard/TechLeadDB';
import CustomerDB from '../components/Dashboard/CustomerDB';
import store from '../store/_storeConfig';
import { loadDashboardData } from '../store/loginHandle';

export default function Dashboard() {
    const role = useSelector(state => state.login.currentUser.role);

    useEffect(() => {
        store.dispatch(loadDashboardData());
    }, []);

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
