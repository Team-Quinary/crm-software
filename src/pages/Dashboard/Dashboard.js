import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

// local imports
import Admin from './_Admin';
import Customer from './_Customer';
import TechLead from './_TechLead';
import store from '../../store/_storeConfig';
import { loadDashboardData } from '../../store/loginHandle';
import { loadCustomers } from '../../store/customerHandle';
import { loadUsers } from '../../store/userHandle';
import { loadProjects } from '../../store/projectHandle';
import { loadSales, loadEndusers } from '../../store/saleHandle';
import { loadPayments } from '../../store/paymentHandle';
import { loadFeedbackForms } from '../../store/feedbackFormHandle';

export default function Dashboard() {
    const role = useSelector(state => state.login.currentUser.role);

    useEffect(() => {
        store.dispatch(loadDashboardData());
        store.dispatch(loadCustomers());
        store.dispatch(loadUsers());
        store.dispatch(loadProjects());
        store.dispatch(loadSales());
        store.dispatch(loadEndusers());
        store.dispatch(loadPayments());
        store.dispatch(loadFeedbackForms());
    }, []);

    return (
        <div className='dashboard' style={{ padding: '20px' }}>
            {
                (role === 'Admin') ? <Admin />
                    : (role === 'Tech Lead') ? <TechLead />
                        : (role === 'Customer') ? <Customer /> : null
            }
        </div>
    )
}
