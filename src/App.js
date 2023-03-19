import { createBrowserRouter, createRoutesFromElements, RouterProvider, Route } 
    from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material';
import Layout from './components/Layout';
import Projects from './pages/Projects';
import Customers from './pages/Customers';
import Test from './test/Test';
import Feedback from './pages/Feedback';
import Newsletters from './pages/Newsletters';
import Users from './pages/Users';
import Dashboard from './pages/Dashboard';
import EndUsers from './pages/EndUsers';

import Login from './pages/Login';
import { useEffect } from 'react';

import store from './store/_storeConfig';
import { loadProjects } from './store/projectHandle';
import { loadUsers } from './store/userHandle';
import { loadCustomers } from './store/customerHandle';
import { loadEndusers, loadSales } from './store/saleHandle';
import { loadPayments } from './store/paymentHandle';
import Payments from './pages/Payments';

const theme = createTheme({
    palette: {
        secondary: {
            main: '#0069d9'
        }
    }
});

function App() {
    useEffect(() => {
        store.dispatch(loadCustomers());
        store.dispatch(loadUsers());
        store.dispatch(loadProjects());
        store.dispatch(loadSales());
        store.dispatch(loadEndusers());
        store.dispatch(loadPayments());
    }, []);

    const router = createBrowserRouter(
        createRoutesFromElements( 
            <>
                <Route path='/' element={<Login />} />
                <Route element={<Layout />}>
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/projects' element={<Projects />} />
                    <Route path='/customers' element={<Customers />} />
                    <Route path='/users' element={<Users />} />
                    <Route path='/end-users' element={<EndUsers />} />
                    <Route path='/feedbacks' element={<Feedback />} />
                    <Route path='/newsletters' element={<Newsletters />} />
                    <Route path='/payments' element={<Payments />} />
                    <Route path='/*' element={<Test />} />
                </Route>
            </>
        )
    );

    return (
        <div className="App">
            <ThemeProvider theme={theme}>
                <RouterProvider router={router}/>
            </ThemeProvider>
        </div>
    );
}

export default App;
