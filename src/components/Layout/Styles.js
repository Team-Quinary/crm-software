import { createUseStyles } from 'react-jss';
// import { pageBackground } from '../../assets';

// styles
export const useStyles = createUseStyles((theme) => ({
    // Layout
    appbar: {
        alignItems: 'flex-end',
        justifyContent: 'flex-end',
        backgroundColor: theme.palette.background.paper,
        color: theme.palette.text.red,
    },
    drawer: {
        '& .MuiDrawer-paper': {
            backgroundColor: theme.palette.background.primary,
        },
    },
    drawerHeader: {
        backgroundColor: 'transparent',

        '& .MuiIconButton-root': {
            color: theme.palette.text.red,

            '&:hover': {
                backgroundColor: theme.palette.text.red,
                color: theme.palette.text.primary,
            }
        },
    },
    logoContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        width: '50%',
        marginRight: '15%',
        padding: 0,
    },
    layoutContent: {
        flexGrow: 1,
        minHeight: '100vh',
        // backgroundImage: `url(${pageBackground})`,
        // backgroundRepeat: 'no-repeat',
        // backgroundSize: 'cover',
        backgroundColor: '#fff',
    },

    // Drawer
    drawerList: {
        paddingTop: 0,

        '& .MuiListItem-root': {
            color: theme.palette.text.primary,

            '&:hover': {
                backgroundColor: theme.palette.background.hover,

                '& $drawerIcon': {
                    color: theme.palette.text.primary,
                }
            }
        },
    },
    drawerIcon: {
        color: theme.palette.text.red,
        transition: 'color 0.3s ease-out',
    },
    drawerListItemActive: {
        backgroundColor: theme.palette.background.hover,

        '& $drawerIcon': {
            color: theme.palette.text.primary,
        }
    },
    listItemButton: {
        '& $drawerIcon': {
            color: theme.palette.text.primary,
        }
    },

    // Appbar
    '.MuiToolbar-root': {
        alignItems: 'center',
        justifyContent: 'flex-end',
        backgroundColor: 'transparent',
        paddingRight: '24px',
    },

    usernameArea: {
        display: 'grid',
        gridTemplateColumns: '1fr 40px',
        alignItems: 'center',
    },

    username: {
        cursor: 'pointer',
        marginRight: '10px',
        minWidth: '150px',
    },

    userProfile: {
        marginLeft: '16px',
    },

    // User Menu
    hiddenMenu: {
        '& .MuiMenu-list': {
            padding: 0,
        },

        '& .MuiMenu-paper': {
            marginTop: '10px',
            backgroundColor: theme.palette.background.paper,
        },
    },

    userType: {
        bottom: '-5px',

        '& .MuiTypography-root': {
            fontSize: '1rem',
            paddingBottom: 0,
            paddingTop: '5px',
            textAlign: 'center',
            width: '100%',
        }
    },
}));