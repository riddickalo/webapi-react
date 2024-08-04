import React from "react";
import '../assets/css/Header.css';
import { IconButton } from '@mui/material';
import { MenuRounded, CloseRounded, SmsFailedRounded, AccountBoxRounded } from '@mui/icons-material';

function Header({ isSidebarOpen, toggleSidebar }) {
    const icon_size = '32px';
    return (
        <div className={`Header ${isSidebarOpen? 'SidebarOpen': ''}`}>
            <IconButton onClick={toggleSidebar} className="sidebar-toggle-button">
                { isSidebarOpen? <CloseRounded fontSize={icon_size} />: <MenuRounded fontSize={icon_size} />}
            </IconButton>
            <h1>戰情中控台</h1>
            <IconButton className="alarm-button" size="large">
                <SmsFailedRounded fontSize={icon_size} />
            </IconButton>
            <IconButton className="login-button" size="large">
                <AccountBoxRounded fontSize={icon_size} />
            </IconButton>
        </div>
    );
}

export default Header;