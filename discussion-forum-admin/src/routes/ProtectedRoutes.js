// import React from 'react'
// import { Outlet } from 'react-router-dom'
import Login from '../pages/Login';

// const ProtectedRoutes = () => {
//     if (true) {
//         return (
//             <>
//                 <Outlet />
//             </>
//         )
//     }
//     else{
//         <Login />
//     }
// }

// export default ProtectedRoutes

import { BusinessCenter, CarRental, CurrencyRupee, DirectionsCarFilled, Groups3, Sell } from '@mui/icons-material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import MenuIcon from '@mui/icons-material/Menu';
import MuiAppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import * as React from 'react';
import { Toaster } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { Link, Outlet, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
    const user = useSelector(state => state.auth.userInfo)
    const [active, setActive] = React.useState(false)
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const location = useLocation().pathname;
    console.log(location)
    if (Object.entries(user).length > 0) {
        return (
            <Box sx={{ display: 'flex' }}>
                <Toaster
                    position="top-right"
                    reverseOrder={false}
                />
                <CssBaseline />
                <AppBar position="fixed" open={open} sx={{ background: "White" }}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(open && { display: 'none' }) }}
                        >
                            <MenuIcon sx={{ color: "black" }} />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            <img src="https://americancomposers.org/wp-content/uploads/2020/04/aco-logo.png" alt="logo" style={{ width: "100%", height: "50px" }} />
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer
                    sx={{
                        width: drawerWidth,
                        flexShrink: 0,
                        '& .MuiDrawer-paper': {
                            width: drawerWidth,
                            boxSizing: 'border-box',
                        },
                    }}
                    variant="persistent"
                    anchor="left"
                    open={open}
                >
                    <DrawerHeader>
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                        </IconButton>
                    </DrawerHeader>
                    <Divider />
                    <List>
                        {[{
                            name: "Posts Management",
                            link: "Posts-Management",
                            icon: <DirectionsCarFilled sx={{ color: location === '/Posts-Management' ? "white" : "#757575", fontSize: 18 }} />,
                            isActive: location === '/Posts-Management' ? true : false
                        }
                            ,
                        {
                            name: "User Management",
                            link: "User-Management",
                            icon: <Groups3 sx={{ color: location === '/User-Management' ? "white" : "#757575", fontSize: 18 }} />,
                            isActive: location === '/User-Management' ? true : false

                        }
                        ].map((text, index) => (
                            <Link to={text.link} style={{ textDecoration: "none", color: text.isActive ? "white" : "#757575" }} >
                                <ListItem key={text.name} disablePadding style={{ backgroundColor: text.isActive ? "rgb(163,111,173)" : "white" }}>
                                    <ListItemButton>
                                        <ListItemIcon >
                                            {text.icon}
                                        </ListItemIcon>
                                        <ListItemText primary={text.name} sx={{ marginLeft: "-20px" }} />
                                    </ListItemButton>
                                </ListItem>
                            </Link>
                        ))}
                    </List>
                </Drawer>
                <Main open={open}>
                    <DrawerHeader />
                    <Outlet />
                </Main>
            </Box>
        );
    }
    else {
        return <Login />
    }
}