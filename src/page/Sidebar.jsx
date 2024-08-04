import React, { useState } from "react";
import '../assets/css/Sidebar.css';
import logo from '../assets/img/JackTech banner logo.png';
import { useAccordion } from "../components/AccordionContext";
import { Link } from 'react-router-dom';
import { Accordion, AccordionSummary, AccordionDetails, List, ListItemIcon, ListItemButton, ListItemText } from '@mui/material';
import { ExpandMore, MonitorRounded, ReportProblemRounded, FeedRounded, InsightsRounded, SettingsRounded, DisplaySettingsRounded } from '@mui/icons-material';

function Sidebar({ isSidebarOpen }) {
    const { accordionState, toggleAccordion } = useAccordion();

    return (
        <div className={`Sidebar ${isSidebarOpen? 'side-open': ''}`}>
            <img className="jack-logo" src={ logo }></img>
            <List>
                <Accordion classes="ncSubmenu" 
                        disableGutters
                        expanded={accordionState.nc}
                        onChange={() => toggleAccordion('nc')} >
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <ListItemButton>
                            <ListItemIcon> <MonitorRounded /> </ListItemIcon>
                            <ListItemText primary='機台' sx={{ fontWeight: 'bold' }} />
                        </ListItemButton>
                    </AccordionSummary>
                    <AccordionDetails>       
                        <List>
                            <ListItemButton components={Link} to='/machine/status'>
                                <ListItemText inset primary='機台狀態' />
                            </ListItemButton>
                            <ListItemButton components={Link} to='/machine/maintain'>
                                <ListItemText inset primary='機台保養'/>
                            </ListItemButton>
                            <ListItemButton components={Link} to='/machine/utilize'>
                                <ListItemText inset primary='機台稼動率'/>
                            </ListItemButton>
                            <ListItemButton components={Link} to='/machine/ncfile'>
                                <ListItemText inset primary='加工程式'/>
                            </ListItemButton>
                        </List>
                    </AccordionDetails>     
                </Accordion>
                <Accordion classes="alarmSubmenu" 
                        disableGutters
                        expanded={accordionState.alarm}
                        onChange={() => toggleAccordion('alarm')} >
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <ListItemButton>
                            <ListItemIcon> <ReportProblemRounded /> </ListItemIcon>
                            <ListItemText primary='警報'/>
                        </ListItemButton>
                    </AccordionSummary>
                    <AccordionDetails>       
                        <List>
                            <ListItemButton components={Link} to='/alarm/status'>
                                <ListItemText inset primary='即時警報'/>
                            </ListItemButton>
                            <ListItemButton components={Link} to='/alarm/history'>
                                <ListItemText inset primary='歷史警報'/>
                            </ListItemButton>
                        </List>
                    </AccordionDetails>     
                </Accordion>
                <Accordion classes="order">
                    <AccordionSummary>
                        <ListItemButton components={Link} to='/order'>
                        <ListItemIcon> <FeedRounded /> </ListItemIcon>
                        <ListItemText primary='工單'/>
                        </ListItemButton>
                    </AccordionSummary>
                </Accordion>
                
                <Accordion classes="settingSubmenu" 
                        disableGutters
                        expanded={accordionState.setting}
                        onChange={() => toggleAccordion('setting')} >
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <ListItemButton>
                            <ListItemIcon> <SettingsRounded /> </ListItemIcon>
                            <ListItemText primary='基本設定'/>
                        </ListItemButton>
                    </AccordionSummary>
                    <AccordionDetails>       
                        <List>
                            <ListItemButton components={Link} to='/setting/machine'>
                                <ListItemText inset primary='機台參數'/>
                            </ListItemButton>
                            <ListItemButton components={Link} to='/setting/maintain'>
                                <ListItemText inset primary='機台保養項目'/>
                            </ListItemButton>
                            <ListItemButton components={Link} to='/setting/item'>
                                <ListItemText inset primary='品項料號'/>
                            </ListItemButton>
                            <ListItemButton components={Link} to='/setting/pp_map'>
                                <ListItemText inset primary='加工程式與品項'/>
                            </ListItemButton>
                        </List>
                    </AccordionDetails>     
                </Accordion>
                <Accordion classes="sysSubmenu" 
                        disableGutters
                        expanded={accordionState.sys}
                        onChange={() => toggleAccordion('sys')} >
                    <AccordionSummary expandIcon={<ExpandMore />}>
                        <ListItemButton>
                            <ListItemIcon> <DisplaySettingsRounded /> </ListItemIcon>
                            <ListItemText primary='系統設定'/>
                        </ListItemButton>
                    </AccordionSummary>
                    <AccordionDetails>       
                        <List>
                            <ListItemButton components={Link} to='/sys/general'>
                                <ListItemText inset primary='一般設定'/>
                            </ListItemButton>
                            <ListItemButton components={Link} to='/sys/account'>
                                <ListItemText inset primary='使用者設定'/>
                            </ListItemButton>
                            <ListItemButton components={Link} to='/sys/notify'>
                                <ListItemText inset primary='通知設定'/>
                            </ListItemButton>                            
                        </List>
                    </AccordionDetails>     
                </Accordion>
            </List>
        </div>
    );
}

export default Sidebar;