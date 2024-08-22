import React, { useState } from "react";
import '../assets/css/Sidebar.css';
import logo from '../assets/img/mat logo.png';
import { useAccordion } from "../components/AccordionContext";
import { Link } from 'react-router-dom';
import { Accordion, AccordionSummary, AccordionDetails, List, ListItemIcon, ListItemButton, ListItemText } from '@mui/material';
import { ExpandMore, MonitorRounded, ReportProblemRounded, FeedRounded, InsightsRounded, SettingsRounded, DisplaySettingsRounded } from '@mui/icons-material';

function Sidebar({ isSidebarOpen }) {
    const { accordionState, toggleAccordion } = useAccordion();
    const page_host = '/webapi-react';

    return (
        <div className={`Sidebar ${isSidebarOpen? 'side-open': ''}`}>
            <img className="jack-logo" src={ logo }></img>
            <List>
                <Accordion classes="ncSubmenu" 
                        disableGutters
                        expanded={accordionState.nc}
                        onChange={() => toggleAccordion('nc')}
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
                            <ListItemButton components={Link} to={`${page_host}/machine/status`}>
                                <ListItemText inset primary='機台狀態'
                                    primaryTypographyProps={{ fontSize: 18, fontWeight: 'bold'}} />
                            </ListItemButton>
                            <ListItemButton components={Link} to={`${page_host}/machine/maintain`}>
                                <ListItemText inset primary='機台保養'
                                    primaryTypographyProps={{ fontSize: 18, fontWeight: 'bold'}} />
                            </ListItemButton>
                            <ListItemButton components={Link} to={`${page_host}/machine/utilize`}>
                                <ListItemText inset primary='機台稼動率'
                                    primaryTypographyProps={{ fontSize: 18, fontWeight: 'bold'}} />
                            </ListItemButton>
                            <ListItemButton components={Link} to={`${page_host}/machine/ncfile`}>
                                <ListItemText inset primary='加工程式'
                                    primaryTypographyProps={{ fontSize: 18, fontWeight: 'bold'}} />
                            </ListItemButton>
                        </List>
                    </AccordionDetails>     
                </Accordion>
                <Accordion classes="alarmSubmenu" 
                        disableGutters
                        expanded={accordionState.alarm}
                        onChange={() => toggleAccordion('alarm')}
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
                            <ListItemButton components={Link} to={`${page_host}/alarm/status`}>
                                <ListItemText inset primary='即時警報'
                                        primaryTypographyProps={{ fontSize: 18, fontWeight: 'bold'}} />
                            </ListItemButton>
                            <ListItemButton components={Link} to={`${page_host}/alarm/history`}>
                                <ListItemText inset primary='歷史警報'
                                        primaryTypographyProps={{ fontSize: 18, fontWeight: 'bold'}}/>
                            </ListItemButton>
                        </List>
                    </AccordionDetails>     
                </Accordion>
                <Accordion classes="order" disableGutters sx={{bgcolor: '#dff1fb'}}>
                    <AccordionSummary>
                        <ListItemButton components={Link} to={`${page_host}/order`}>
                        <ListItemIcon> <FeedRounded fontSize="large" /> </ListItemIcon>
                        <ListItemText primary='工單'
                                primaryTypographyProps={{ fontSize: 18, fontWeight: 'bold'}} />
                        </ListItemButton>
                    </AccordionSummary>
                </Accordion>
                
                <Accordion classes="settingSubmenu" 
                        disableGutters
                        expanded={accordionState.setting}
                        onChange={() => toggleAccordion('setting')}
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
                            <ListItemButton components={Link} to={`${page_host}/setting/machine`}>
                                <ListItemText inset primary='機台參數'
                                    primaryTypographyProps={{ fontSize: 18, fontWeight: 'bold'}} />
                            </ListItemButton>
                            <ListItemButton components={Link} to={`${page_host}/setting/maintain`}>
                                <ListItemText inset primary='機台保養項目'
                                    primaryTypographyProps={{ fontSize: 18, fontWeight: 'bold'}} />
                            </ListItemButton>
                            <ListItemButton components={Link} to={`${page_host}/setting/item`}>
                                <ListItemText inset primary='品項料號'
                                    primaryTypographyProps={{ fontSize: 18, fontWeight: 'bold'}} />
                            </ListItemButton>
                            <ListItemButton components={Link} to={`${page_host}/setting/pp_map`}>
                                <ListItemText inset primary='加工程式與品項'
                                    primaryTypographyProps={{ fontSize: 18, fontWeight: 'bold'}} />
                            </ListItemButton>
                        </List>
                    </AccordionDetails>     
                </Accordion>
                <Accordion classes="sysSubmenu" 
                        disableGutters
                        expanded={accordionState.sys}
                        onChange={() => toggleAccordion('sys')}
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
                            <ListItemButton components={Link} to={`${page_host}/sys/general`}>
                                <ListItemText inset primary='一般設定'
                                    primaryTypographyProps={{ fontSize: 18, fontWeight: 'bold'}} />
                            </ListItemButton>
                            <ListItemButton components={Link} to={`${page_host}/sys/account`}>
                                <ListItemText inset primary='使用者設定'
                                    primaryTypographyProps={{ fontSize: 18, fontWeight: 'bold'}} />
                            </ListItemButton>
                            <ListItemButton components={Link} to={`${page_host}/sys/notify`}>
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