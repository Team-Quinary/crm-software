import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';

// material-ui imports
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import Divider from '@mui/material/Divider';

// local imports
import AppBarBody from './AppBarBody';
import DrawerBody from './DrawerBody';
import logo from '../../assets/logo.png';
import store from '../../store/_storeConfig';
import { logOut } from '../../store/loginHandle';
import { useSelector } from 'react-redux';
import { useStyles } from './Styles';

// drawer creation
const drawerWidth = 250;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const Drawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'isDrawerOpened',
})(({ theme, isDrawerOpened }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(isDrawerOpened && {
        ...openedMixin(theme),
        '& .MuiDrawer-paper': {
            ...openedMixin(theme),
        },
    }),
    ...(!isDrawerOpened && {
        ...closedMixin(theme),
        '& .MuiDrawer-paper': {
            ...closedMixin(theme)
        },
    }),
}));

// drawer header creation
const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

// appbar creation
const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'isDrawerOpened',
})(({ theme, isDrawerOpened }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    // Turn toggle on / off
    width: `calc(100% - ${!isDrawerOpened ? (parseInt(theme.spacing(8).replace(/\D/g, "")) + 1) : drawerWidth}px)`,
    ...(isDrawerOpened && {
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
    // boxShadow: '0px 5px 8px 5px rgba(0,0,0,0.2)',
}));

// appbar properties and behaviours
const handleSignOut = () => {
    store.dispatch(logOut());
};

const handleEditProfile = () => {
    console.log('edit profile');
};

const Layout = () => {
    const [isDrawerOpened, setIsDrawerOpened] = useState(false);

    const {
        firstName,
        lastName,
        role,
        pic
    } = useSelector(state => state.login.currentUser);

    const styles = useStyles();
    
    const name = `${firstName} ${lastName}`;

    return (
        <div className='layout'>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />

                <AppBar position="fixed" isDrawerOpened={isDrawerOpened} className={styles.appbar}>
                    <AppBarBody
                        name={name}
                        role={role}
                        pic={pic}
                        editProfileOnClick={handleEditProfile}
                        logOutOnClick={handleSignOut}
                    />
                </AppBar>

                <Drawer variant="permanent" isDrawerOpened={isDrawerOpened} className={styles.drawer}>
                    <DrawerHeader className={styles.drawerHeader}>
                        <IconButton
                            color="primary"
                            onClick={() => setIsDrawerOpened(!isDrawerOpened)}
                            edge="start"
                            sx={{
                                margin: 0,
                                marginLeft: 0.5
                            }}
                        >
                            {(isDrawerOpened) ? <ChevronLeftOutlinedIcon /> : <MenuIcon />}
                        </IconButton>
                        <div className={styles.logoContainer}>
                            {isDrawerOpened && <img src={logo} alt='logo' className={styles.logo} />}
                        </div>
                    </DrawerHeader>
                    <Divider />
                    <DrawerBody isDrawerOpened={isDrawerOpened} />
                </Drawer>

                <Box component="main" className={styles.layoutContent}>
                    <DrawerHeader />
                    <Outlet />
                </Box>
            </Box>
        </div>
    )
}

export default Layout;
