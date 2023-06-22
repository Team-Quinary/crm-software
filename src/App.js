import React from 'react';
import { createRoutesFromElements, createBrowserRouter, Route, RouterProvider } from 'react-router-dom';
import { ThemeProvider } from 'react-jss';

// local imports
import './App.scss';
import { Layout } from './components';
import { Customer, User, Login, Dashboard, Project, EndUser, Payment, Progress, FeedbackForm,
    FeedbackDashboard, Newsletter
} from './pages';

// default theme
const theme = {
    palette: {
        primary: {
            main: '#6954FA',
            light: '#64b5f6',
            dark: '#1976d2'
        },
        secondary: {
            main: '#f50057',
            light: '#ff4081',
            dark: '#c51162'
        },
        background: {
            primary: '#331c7a',
            secondary: '#CDD0D9',
            paper: '#E6E8EC',
            hover: '#ff6962',
            warn: '#fff4e5',
        },
        text: {
            default: '#482890',
            primary: '#ffffff',
            secondary: '#99A1B2',
            red: '#FF615A',
            warn: '#b28704'
        },
    },
    typography: {
        fontFamily: ['Roboto', 'sans-serif'].join(','),
        fontSize: 14,
        h1: {
            fontSize: '2.5rem',
            fontWeight: 700
        },
        h2: {
            fontSize: '2rem',
            fontWeight: 700
        },
        h3: {
            fontSize: '1.75rem',
            fontWeight: 700
        },
        body1: {
            fontSize: '1rem',
            fontWeight: 400
        },
        body2: {
            fontSize: '0.875rem',
            fontWeight: 400
        },
        button: {
            textTransform: 'uppercase',
            fontWeight: 700
        }
    }
};

export default function App() {
    const router = createBrowserRouter(
        createRoutesFromElements(
            <>
                <Route path='/' element={<Login />} />
                <Route element={<Layout />}>
                    <Route path='/' element={<Customer />} />
                    <Route path='/dashboard' element={<Dashboard />} />
                    <Route path='/projects' element={<Project />} />
                    <Route path='/users' element={<User />} />
                    <Route path='/end-users' element={<EndUser />} />
                    {/* <Route path='/reports' element={<Report/>} /> */}
                    <Route path='/progress' element={<Progress />} />
                    <Route path='/feedbackform' element={<FeedbackForm />} />
                    <Route path='/feedbackDashboard' element={<FeedbackDashboard/>}/>
                    <Route path='/newsletters' element={<Newsletter />} />
                    <Route path='/payments' element={<Payment />} />
                    <Route path='/*' element={<Customer />} />
                </Route>
            </>
        )
    );

    return (
        <div className='app'>
            <ThemeProvider theme={theme}>
                <RouterProvider router={router} />
            </ThemeProvider>
        </div>
    )
}
