import React, { useState } from "react";
import '../assets/css/Sidebar.css';
import logo from '../assets/img/mat logo.png';
import { Link } from 'react-router-dom';
import { Accordion, AccordionSummary, AccordionDetails, List, ListItemIcon, ListItemButton, ListItemText } from '@mui/material';
import { ExpandMore, MonitorRounded, ReportProblemRounded, FeedRounded, InsightsRounded, SettingsRounded, DisplaySettingsRounded } from '@mui/icons-material';

function Sidebar({ isSidebarOpen, accordionState, setAccordionState }) {
    const handleChange = (panel) => (event, isExpaned) => {
        const newState = {  // create a new state instance
            ...accordionState,
            [panel]: isExpaned,
        };
        setAccordionState(newState);    // set new state
        localStorage.setItem('accordionState', JSON.stringify(newState));   // write new state to localstorage
    }

    return (
        <div className={`Sidebar ${isSidebarOpen? 'side-open': ''}`}>
            <img className="jack-logo" src={ logo }></img>
            <List>
                <Accordion classes="ncSubmenu" 
                        disableGutters 
                        expanded={accordionState.nc}    // expand accordingly
                        onChange={handleChange('nc')}   // send new state using onChange()
                        sx={{bgcolor: '#dff1fb', margin: '0px'}} >
                    <AccordionSummary expandIcon={<ExpandMore />} >
                        <ListItemButton>
                            <ListItemIcon> <MonitorRounded fontSize="large"/> </ListItemIcon>
                            <ListItemText primary='機台' 
                                primaryTypographyProps={{ fontSize: 18, fontWeight: 'bold'}} />
                        </ListItemButton>
                    </AccordionSummary>
                    <AccordionDetails sx={{minHeight: 0}}>       
                        <List>
                            <ListItemButton components={Link} to={`/machine/status`}>
                                <ListItemText inset primary='機台狀態'
                                    primaryTypographyProps={{ fontSize: 18, fontWeight: 'bold'}} />
                            </ListItemButton>
                            <ListItemButton components={Link} to={`/machine/maintain`}>
                                <ListItemText inset primary='機台保養'
                                    primaryTypographyProps={{ fontSize: 18, fontWeight: 'bold'}} />
                            </ListItemButton>
                            <ListItemButton components={Link} to={`/machine/utilize`}>
                                <ListItemText inset primary='機台稼動率'
                                    primaryTypographyProps={{ fontSize: 18, fontWeight: 'bold'}} />
                            </ListItemButton>
                            <ListItemButton components={Link} to={`/machine/ncfile`}>
                                <ListItemText inset primary='加工程式'
                                    primaryTypographyProps={{ fontSize: 18, fontWeight: 'bold'}} />
                            </ListItemButton>
                        </List>
                    </AccordionDetails>     
                </Accordion>
                <Accordion classes="alarmSubmenu" 
                        disableGutters
                        expanded={accordionState.alarm} 
                        onChange={handleChange('alarm')} 
                        sx={{bgcolor: '#dff1fb'}} >
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <ListItemButton>
                            <ListItemIcon> <ReportProblemRounded fontSize="large" /> </ListItemIcon>
                            <ListItemText primary='警報'
                                    primaryTypographyProps={{ fontSize: 18, fontWeight: 'bold'}} />
                        </ListItemButton>
                    </AccordionSummary>
                    <AccordionDetails>       
                        <List>
                            <ListItemButton components={Link} to={`/alarm/status`}>
                                <ListItemText inset primary='即時警報'
                                        primaryTypographyProps={{ fontSize: 18, fontWeight: 'bold'}} />
                            </ListItemButton>
                            <ListItemButton components={Link} to={`/alarm/history`}>
                                <ListItemText inset primary='歷史警報'
                                        primaryTypographyProps={{ fontSize: 18, fontWeight: 'bold'}}/>
                            </ListItemButton>
                        </List>
                    </AccordionDetails>     
                </Accordion>
                <Accordion classes="order" disableGutters sx={{bgcolor: '#dff1fb'}}>
                    <AccordionSummary>
                        <ListItemButton components={Link} to={`/order`}>
                        <ListItemIcon> <FeedRounded fontSize="large" /> </ListItemIcon>
                        <ListItemText primary='工單'
                                primaryTypographyProps={{ fontSize: 18, fontWeight: 'bold'}} />
                        </ListItemButton>
                    </AccordionSummary>
                </Accordion>
                
                <Accordion classes="settingSubmenu" 
                        disableGutters
                        expanded={accordionState.setting} 
                        onChange={handleChange('setting')} 
                        sx={{bgcolor: '#dff1fb'}} >
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <ListItemButton>
                            <ListItemIcon> <SettingsRounded fontSize="large" /> </ListItemIcon>
                            <ListItemText primary='基本設定'
                                primaryTypographyProps={{ fontSize: 18, fontWeight: 'bold'}}/>
                        </ListItemButton>
                    </AccordionSummary>
                    <AccordionDetails>       
                        <List>
                            <ListItemButton components={Link} to={`/setting/machine`}>
                                <ListItemText inset primary='機台參數'
                                    primaryTypographyProps={{ fontSize: 18, fontWeight: 'bold'}} />
                            </ListItemButton>
                            <ListItemButton components={Link} to={`/setting/maintain`}>
                                <ListItemText inset primary='機台保養項目'
                                    primaryTypographyProps={{ fontSize: 18, fontWeight: 'bold'}} />
                            </ListItemButton>
                            <ListItemButton components={Link} to={`/setting/item`}>
                                <ListItemText inset primary='品項料號'
                                    primaryTypographyProps={{ fontSize: 18, fontWeight: 'bold'}} />
                            </ListItemButton>
                            <ListItemButton components={Link} to={`/setting/pp_map`}>
                                <ListItemText inset primary='加工程式與品項'
                                    primaryTypographyProps={{ fontSize: 18, fontWeight: 'bold'}} />
                            </ListItemButton>
                        </List>
                    </AccordionDetails>     
                </Accordion>
                <Accordion classes="sysSubmenu" 
                        disableGutters
                        expanded={accordionState.sys} 
                        onChange={handleChange('sys')} 
                        sx={{bgcolor: '#dff1fb'}} >
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <ListItemButton>
                            <ListItemIcon> <DisplaySettingsRounded fontSize="large" /> </ListItemIcon>
                            <ListItemText primary='系統設定'
                                primaryTypographyProps={{ fontSize: 18, fontWeight: 'bold'}} />
                        </ListItemButton>
                    </AccordionSummary>
                    <AccordionDetails>       
                        <List>
                            <ListItemButton components={Link} to={`/sys/general`}>
                                <ListItemText inset primary='一般設定'
                                    primaryTypographyProps={{ fontSize: 18, fontWeight: 'bold'}} />
                            </ListItemButton>
                            <ListItemButton components={Link} to={`/sys/account`}>
                                <ListItemText inset primary='使用者設定'
                                    primaryTypographyProps={{ fontSize: 18, fontWeight: 'bold'}} />
                            </ListItemButton>
                            <ListItemButton components={Link} to={`/sys/notify`}>
                                <ListItemText inset primary='通知設定'
                                    primaryTypographyProps={{ fontSize: 18, fontWeight: 'bold'}} />
                            </ListItemButton>                            
                        </List>
                    </AccordionDetails>     
                </Accordion>
            </List>
        </div>
    );
}

export default Sidebar;