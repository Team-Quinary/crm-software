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
import "./components/Chat/Message_App.css"
import store from './store/_storeConfig';
import { loadProjects } from './store/projectHandle';
import { loadUsers } from './store/userHandle';
import { loadCustomers } from './store/customerHandle';
import { loadEndusers, loadSales } from './store/saleHandle';
import { loadPayments } from './store/paymentHandle';
import Payments from './pages/Payments';
import Progress from './pages/Progress';
import MsgHome from "./components/Chat/Pages/MsgHome"
import MsgLogin from "./components/Chat/Pages/MsgLogin"
import MsgRegister from "./components/Chat/Pages/MsgRegister"
import MsgProfile from "./components/Chat/Pages/MsgProfile"
import Forms from "./components/form/Forms"
import Question_Home from "./components/form/Home"



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
                    <Route path='/progress' element={<Progress />} />
                    <Route path='/feedbacks' element={<Feedback />} />
                    <Route path='/newsletters' element={<Newsletters />} />
                    <Route path='/payments' element={<Payments />} />
                    <Route path='/*' element={<Test />} />

                    <Route path="/components/Chat/Pages/MsgHome" element={<MsgHome/>}/>
                    <Route path="/register" element={<MsgRegister/>}/>
                    <Route path="/components/Chat/Pages/MsgLogin" element={<MsgLogin/>}/>
                    <Route path="/profile" element={<MsgProfile />} />
                    <Route path="/components/form/Forms" element={<Forms />}/>
                    <Route path="/components/form/Question_Home" element={<Question_Home/> }/>
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