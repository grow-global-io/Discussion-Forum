// import React from 'react'
// import { Outlet } from 'react-router-dom'
import Login from '../pages/Login'

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

import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { BusinessCenter, CarRental, CurrencyRupee, DirectionsCarFilled, Groups3, Sell } from '@mui/icons-material';
import { Toaster } from 'react-hot-toast';

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
    if (true) {
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
                            <svg width="170" height="66" viewBox="0 0 170 66" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M19.8982 16.5623L22.533 19.724L17 41.3291H31.2278L29.9104 37.9039H22.2695L24.3774 30.5266H28.2353L31.2994 27.1014H25.1678L27.0121 19.9875H32.5451L35.4434 16.8258L19.8982 16.5623Z" fill="#151A24" />
                                <path d="M43.0842 18.1432H38.6051L32.5451 41.3291H39.659L37.5512 38.6944L43.0842 18.1432Z" fill="#151A24" />
                                <path d="M54.4137 26.311H43.6112L40.186 39.7483L41.5034 41.3291H50.1981L47.8268 37.9039H43.6112L44.9286 34.2153H52.5694L54.4137 26.311Z" fill="#151A24" />
                                <path d="M53.3598 41.3291L59.6833 16.5623L63.3719 21.0414L59.1563 36.5865L57.8389 41.3291H53.3598Z" fill="#151A24" />
                                <path d="M79.971 26.311L80.7614 21.0414L84.4501 24.4666L83.9231 26.311H89.4562L86.031 29.2092H83.1327L80.7614 38.1674H83.3962L88.1388 41.5926H77.5997L76.0188 40.0117L78.6536 29.2092H74.1745L77.3362 26.311H79.971Z" fill="#151A24" />
                                <path d="M102.63 26.311H90.7735L92.0909 29.2092L89.1927 41.5926H93.1448L96.0431 29.7361H99.4683L98.9413 32.6344L103.42 30.7901L103.947 28.1553L102.63 26.311Z" fill="#151A24" />
                                <path d="M109.744 25.784H105.792L101.313 41.5926H105.792L109.744 25.784Z" fill="#151A24" />
                                <path d="M111.325 20.5145H106.846L106.055 24.7301H110.271L111.325 20.5145Z" fill="#151A24" />
                                <path d="M123.445 18.9336L121.337 16.2988H136.619L138.199 18.9336L136.619 24.7301H132.403L133.193 20.5145H127.66L122.918 37.6405L128.451 37.9039L130.295 31.5805H126.606L127.66 28.1553H135.301L132.403 39.7483L130.295 41.5926H119.229L117.912 39.2213L123.445 18.9336Z" fill="#151A24" />
                                <path d="M138.726 27.8918L140.834 26.311H151.373L152.164 28.1553L149.792 39.7483L147.158 41.5926H137.409L135.828 39.4848L138.726 27.8918Z" fill="#151A24" />
                                <path d="M46.5094 28.4185L45.4555 31.8437H50.1981L51.252 28.4185H46.5094Z" fill="#F9FDF9" />
                                <path d="M141.276 30.8172L142.364 29.9995H147.804L148.211 30.9535L146.988 36.9499L145.628 37.9038H140.596L139.78 36.8136L141.276 30.8172Z" fill="#F9FDF9" />
                                <path d="M111.253 32.7036L111.956 32.4219H115.471L115.734 32.7506L114.943 34.8169L114.065 35.1456H110.814L110.287 34.7699L111.253 32.7036Z" fill="#151A24" />
                                <path d="M61.2099 56.9312C60.8929 56.6046 66.4169 38.0862 66.229 37.2913C66.0394 36.4965 60.1853 34.025 59.9026 32.6283C59.6183 31.2315 76.9531 12.9494 77.2619 13.3558C77.5691 13.7622 66.901 30.4656 67.0481 31.0598C67.1968 31.6515 71.9722 32.6552 72.1519 34.1343C72.3333 35.6134 61.5252 57.2579 61.2099 56.9312Z" fill="url(#paint0_linear_1617_2064)" />
                                <defs>
                                    <linearGradient id="paint0_linear_1617_2064" x1="71.4135" y1="18.791" x2="54.0496" y2="27.6104" gradientUnits="userSpaceOnUse">
                                        <stop offset="0.149329" stopColor="#87E1C7" />
                                        <stop offset="1" stopColor="#22605D" />
                                    </linearGradient>
                                </defs>
                            </svg>
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
                                <ListItem key={text.name} disablePadding style={{ backgroundColor: text.isActive ? "#45C9A0" : "white" }}>
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
        <Login />
    }
}