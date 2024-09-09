import React from "react";
import logo from '../assets/img/mat logo.png';
import { List, Box } from '@mui/material';
import { FilePresentRounded, MonitorRounded, ReportProblemRounded, FeedRounded, SettingsRounded, DisplaySettingsRounded } from '@mui/icons-material';
import { SidebarDrawer, SidebarAccordion } from "../components/StyledSidebar";

export default function Sidebar({ sidebarWidth, isSidebarOpen, handleClose, handleTransitionEnd, accordionState, setAccordionState }) {
    const base_name = process.env.REACT_APP_BASE_NAME || '';
    const accordionContents = [
        {
            className: "NcSubMenu",
            summary: "機台",
            icon: <MonitorRounded fontSize="large"/>,
            details: ['機台稼動率', '機台狀態', '機台保養', '加工程式'],
            links: [`${base_name}/machine/utilize`, `${base_name}/machine/status`, `${base_name}/machine/maintain`, `${base_name}/machine/ncfile`]
        },
        {
            className: "AlarmSubMenu",
            summary: "警報",
            icon: <ReportProblemRounded fontSize="large" />,
            details: ['即時警報', '歷史警報'],
            links: [`${base_name}/alarm/status`, `${base_name}/alarm/history`],
        },
        {
            className: "OrderMenu",
            summary: "工單",
            icon: <FeedRounded fontSize="large" />,
            details: null,
            links: `${base_name}/order`,
        },
        {
            className: "ReportMenu",
            summary: "報表下載",
            icon: <FilePresentRounded fontSize="large" />,
            details: null,
            links: `${base_name}/report`,
        },
        {
            className: "SettingMenu",
            summary: "基本設定",
            icon: <SettingsRounded fontSize="large" />,
            details: ['機台參數', '機台保養項目', '品項料號', '加工程式與品項'],
            links: [`${base_name}/setting/machine`, `${base_name}/setting/maintain`, `${base_name}/setting/item`, `${base_name}/setting/pp_map`],
        },
        {
            className: "SysMenu",
            summary: "系統設定",
            icon: <DisplaySettingsRounded fontSize="large" />,
            details: ['一般設定', '使用者設定', '通知設定'],
            links: [`${base_name}/sys/general`, `${base_name}/sys/account`, `${base_name}/sys/notify`],
        },
    ];

    const handleChange = (panel) => (event, isExpaned) => {
        const newState = {  // create a new state instance
            ...accordionState,
            [panel]: isExpaned,
        };
        setAccordionState(newState);    // set new state
        localStorage.setItem('accordionState', JSON.stringify(newState));   // write new state to localstorage
    }

    return (
        <Box className='Sidebar'>
            {/* Desktop */}
            <SidebarDrawer variant="persistent" anchor="left" open={isSidebarOpen} disableScrollLock
                sx={{ width: sidebarWidth, display: { xs: 'none', sm: 'block' } }} >           
                <img className="Sidebar-Logo" src={ logo }></img>
                <List>
                    <SidebarAccordion content={accordionContents} accordionState={accordionState} onChange={handleChange} />
                </List>
            </SidebarDrawer>  
            {/* Mobile */}
            <SidebarDrawer variant='temporary' anchor="left" open={isSidebarOpen} disableScrollLock
                /*onTransitionEnd={handleTransitionEnd}*/ onClose={handleClose}
                sx={{ width: sidebarWidth, display: { xs: 'block', sm: 'none' } }} >           
                <img className="Sidebar-Logo" src={ logo }></img>
                <List>
                    <SidebarAccordion content={accordionContents} accordionState={accordionState} onChange={handleChange} />
                </List>
            </SidebarDrawer> 
        </Box>      
    );
}