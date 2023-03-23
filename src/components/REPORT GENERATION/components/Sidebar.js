import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import DashboardIcon from '@mui/icons-material/Dashboard';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import SubjectIcon from '@mui/icons-material/Subject';
import SubscriptionsIcon from '@mui/icons-material/Subscriptions';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Dashboard } from '@mui/icons-material';

import { useState } from 'react';
import { useLocation } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import { Stack } from '@mui/material';

const drawerWidth = 220;

const listItem = {

  "&.Mui-selected": {
    backgroundColor: "#ff0000"
  }
}


export default function Sidebar() {
  const location = useLocation();

  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />

        <AppBar

          position="fixed"
          sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`}}
          elevation={0}
        >
          <Stack direction="row">
            <Toolbar>
              <Typography variant="h6" noWrap component="div">
                {location.pathname === '/'
                  ? "Dashboard"
                  : location.pathname.substring(1, 2).toUpperCase() + location.pathname.substring(2)}
              </Typography>

            </Toolbar>
            <Toolbar sx={{ marginLeft: "auto" }}>
              <Avatar>

              </Avatar>
            </Toolbar>
          </Stack>
        </AppBar>
        <Drawer
          PaperProps={{
            sx: {
              // backgroundColor: "#0091ea",
              color: "#000",

            }
          }}
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant="permanent"
          anchor="left"
        >
          <Toolbar />
          {/* <Divider /> */}
          <List>

            <ListItem disablePadding  >
              <ListItemButton href='/' selected={location.pathname === '/' ? true : false}>
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton href='/plans' selected={location.pathname === '/plans' ? true : false}>
                <ListItemIcon>
                  <SubscriptionsIcon />
                </ListItemIcon>
                <ListItemText primary="Plans" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton href='/questions' selected={location.pathname === '/questions' ? true : false}>
                <ListItemIcon>
                  <UploadFileIcon />
                </ListItemIcon>
                <ListItemText primary="Questions" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton href='/reports' selected={location.pathname === '/reports' ? true : false}>
                <ListItemIcon>
                  <SubjectIcon />
                </ListItemIcon>
                <ListItemText primary="Reports" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton href='/authentication' selected={location.pathname === '/authentication' ? true : false}>
                <ListItemIcon>
                  <PeopleIcon />
                </ListItemIcon>
                <ListItemText primary="Authentication" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton href='/statistics' selected={location.pathname === '/statistics' ? true : false}>
                <ListItemIcon>
                  <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Statistics" />
              </ListItemButton>
            </ListItem>
          </List>
          {/* <Divider /> */}

        </Drawer>
      </Box>

    </>
  );
}