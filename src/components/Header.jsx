import React, { useState } from "react";
import '../assets/css/Header.css';
import { IconButton, Button, Box, Typography } from '@mui/material';
import { MenuRounded, CloseRounded } from '@mui/icons-material';
import Popover_Logout from './Popover_Logout';
import Popover_Alarm from './Popover_Alarm';

function Header({ isSidebarOpen, toggleSidebar }) {
    return (
        <Box className={`Header ${isSidebarOpen? 'SidebarOpen': ''}`}
            sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center',
                '& button': { color: '#4CAF50', marginLeft: '10px', marginRight: '10px', padding: '10px', border: 'none' },
                '& button: hover': { color: '#60e065' },
            }}>
            <IconButton onClick={toggleSidebar} size="large">
                { isSidebarOpen? <CloseRounded  />: <MenuRounded />}
            </IconButton>
            <Typography component='div' sx={{ color: '#7171c1', textAlign: 'center', flex: 'auto', whiteSpace: 'nowrap',
                typography: { xs: 'h6', sm: 'h5', md: 'h4' }}} >
                <Box sx={{ fontWeight: 'bold' }}>戰情中控台</Box>
            </Typography>
            <Popover_Alarm />
            <Popover_Logout />
        </Box>
    );
}

export default Header;