import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import AdminDb from '../components/Dashboard/AdminDb';
import TechLeadDB from '../components/Dashboard/TechLeadDB';
import CustomerDB from '../components/Dashboard/CustomerDB';
import store from '../store/_storeConfig';
import { loadDashboardData } from '../store/loginHandle';
import { makeStyles } from "tss-react/mui";

export default function Dashboard() {
    const role = useSelector(state => state.login.currentUser.role);

    useEffect(() => {
        store.dispatch(loadDashboardData());
    }, []);

    const useStyles = makeStyles()((theme) => {
        const cardstyles = {
            backgroundColor: '#E0E0E0',
            borderRadius: '10px',
            padding: '20px',
            marginRight: '20px',
            boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.5)',
        };
    
        return {
            container: {
                display: 'grid',
                gridTemplateColumns: '3fr 1fr',
                columnGap: '20px',
            },
            requirements: {
    
            },
            cardContainer: {
                display: 'grid',
                gridTemplateColumns: '270px 1fr',
            },
            card: {
                ...cardstyles,
                width: '250px',
            },
            cardNumber: {
                fontSize: '50px',
                textAlign: 'center',
                fontWeight: 'bold',
            },
            summaryCount: {
                fontWeight: 'bold',
                color: '#000',
            },
            projectSummary: {
                backgroundColor: '#F5F5F5',
                padding: '10px 20px',
                '& .MuiTypography-root:not(:first-of-type)': {
                    marginTop: '10px',
                },
                color: 'gray',
                borderRadius: '16px',
                border: '1px solid rgba(0,0,0,0.3)',
            },
            secondaryCards: {
                display: 'flex'
            },
            chartContainer: {
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                marginTop: '20px',
            },
            chart: {
                ...cardstyles,
                paddingLeft: 0,
                paddingBottom: 10,
            }
        }
    });

    return (
        <div className='home'>
            {
                (role === 'Admin') ? <AdminDb useStyles={useStyles} />
                : (role === 'Tech Lead') ? <TechLeadDB useStyles={useStyles} />
                    : (role === 'Customer') ? <CustomerDB useStyles={useStyles} /> : null
            }
        </div>
    )
}
