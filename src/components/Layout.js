import React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftOutlinedIcon from '@mui/icons-material/ChevronLeftOutlined';
import { AppBarBody } from './AppBar';
import { DrawerBody } from './Drawer';
import { Divider } from '@mui/material';
import { useStyles } from '../Styles';
import { Outlet } from 'react-router-dom';

const drawerWidth = 240;

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

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer+1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    // Turn toggle on / off
    width: `calc(100% - ${!open ? (parseInt(theme.spacing(8).replace(/\D/g, "")) + 1) : drawerWidth}px)`,
    // width: `calc(100% - ${!open ? theme.spacing(8) : drawerWidth+'px'})`,
    ...(open && {
        marginLeft: drawerWidth,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { 
    shouldForwardProp: (prop) => prop !== 'open' 
})(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function Layout() {
    const [open, setOpen] = React.useState(false);
    const { classes } = useStyles();

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <AppBar position="fixed" open={open} className={classes.toolbar}>                    
                <AppBarBody />
            </AppBar>

            <Drawer variant="permanent" open={open} className={classes.drawer}>
                <DrawerHeader className={classes.drawerHead}>
                    <IconButton
                        color="primary"
                        aria-label="open drawer"
                        onClick={() => setOpen(!open)}
                        edge="start"
                        className={classes.drawerIcon}
                        sx={{
                            margin: 0,
                            marginLeft: 0.5
                        }}
                    >
                        {(open) ? <ChevronLeftOutlinedIcon /> : <MenuIcon />}
                    </IconButton>
                    <div className={classes.logoContainer}>
                        {open && <img src={require('../images/logo.png')} alt='logo' className={classes.logo} />}
                    </div>
                </DrawerHeader>
                <Divider />
                <DrawerBody open={open} />
            </Drawer>

            <Box component="main" className={classes.layoutContent}>
                <DrawerHeader />
                <Outlet />
            </Box>
        </Box>
    );
}