import React from "react";
import '../assets/css/Header.css';
import { IconButton, Button } from '@mui/material';
import { MenuRounded, CloseRounded, SmsFailedRounded, AccountBoxRounded } from '@mui/icons-material';

function Header({ isSidebarOpen, toggleSidebar }) {
    const login_ID = 'Admin';
    const icon_size = '32px';
    return (
        <div className={`Header ${isSidebarOpen? 'SidebarOpen': ''}`}>
            <IconButton onClick={toggleSidebar} className="sidebar-toggle-button" size="large">
                { isSidebarOpen? <CloseRounded  />: <MenuRounded />}
            </IconButton>
            <h1>戰情中控台</h1>
            <Button className="alarm-button" 
                size="large"
                startIcon={<SmsFailedRounded  />} >
            </Button>
            <Button className="login-button" 
                size="large"
                startIcon={<AccountBoxRounded />}
                sx={{ fontSize: 18, textTransform: 'none' }} >
                {login_ID}
            </Button>
        </div>
    );
}

export default Header;