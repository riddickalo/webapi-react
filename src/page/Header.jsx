import React, { useState } from "react";
import '../assets/css/Header.css';
import { IconButton, Button, Box } from '@mui/material';
import { MenuRounded, CloseRounded } from '@mui/icons-material';
import Popover_Logout from '../components/Popover_Logout';
import Popover_Alarm from '../components/Popover_Alarm';

function Header({ isSidebarOpen, toggleSidebar }) {
    return (
        <Box className={`Header ${isSidebarOpen? 'SidebarOpen': ''}`}>
            <IconButton onClick={toggleSidebar} className="sidebar-toggle-button" size="large">
                { isSidebarOpen? <CloseRounded  />: <MenuRounded />}
            </IconButton>
            <h1>戰情中控台</h1>
            <Popover_Alarm />
            <Popover_Logout />
        </Box>
    );
}

export default Header;