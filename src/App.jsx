import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import { AccordionProvider } from './components/AccordionContext';
import './assets/css/Layout.css';
import './App.css';
import Header from './page/Header';
import Sidebar from './page/Sidebar';
import NC_Status from './page/NC_Status';
import NC_Maintain from './page/NC_Maintain';
import NC_File from './page/NC_File';
import NC_Utilize from './page/NC_Utilize';
import Alarm_Status from './page/Alarm_Status';
import Alarm_History from './page/Alarm_History';
import Order from './page/Order';
import Setting_Item from './page/Setting_Item';
import Setting_Maintain from './page/Setting_Maintain';
import Setting_NCStatus from './page/Setting_NCstatus';
import Setting_PPmap from './page/Setting_PPmap';
import Sys_Account from './page/Sys_Account';
import Sys_General from './page/Sys_General';
import Sys_Notification from './page/Sys_Notification';

// import MenuItem from './components/MenuItem';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = ()=>{
    setIsSidebarOpen(!isSidebarOpen);
  }


  return (
    <AccordionProvider>
      <div className="App">
        <Sidebar isSidebarOpen={ isSidebarOpen }></Sidebar>
        <Header isSidebarOpen={ isSidebarOpen } toggleSidebar={ toggleSidebar } />
        <div className={`Layout ${isSidebarOpen? 'SidebarOpen': ''}`}>
            <Box sx={{ bgcolor: '#5b5b99', width: '100%', height: '100%' }}>
              <Routes>
                  <Route path={`/machine/status`} element={ <NC_Status />}/>
                  <Route path={`/machine/maintain`} element={ <NC_Maintain />}/>
                  <Route path={`/machine/utilize`} element={ <NC_Utilize />}/>
                  <Route path={`/machine/ncfile`} element={ <NC_File />}/>
                  <Route path={`/alarm/status`} element={ <Alarm_Status />}/>
                  <Route path={`/alarm/history`} element={ <Alarm_History />}/>
                  <Route path={`/order`} element={ <Order />}/>
                  <Route path={`/setting/machine`} element={ <Setting_NCStatus />}/>
                  <Route path={`/setting/maintain`} element={ <Setting_Maintain />}/>
                  <Route path={`/setting/item`} element={ <Setting_Item />}/>
                  <Route path={`/setting/pp_map`} element={ <Setting_PPmap />}/>
                  <Route path={`/sys/general`} element={ <Sys_General />}/>
                  <Route path={`/sys/account`} element={ <Sys_Account />}/>
                  <Route path={`/sys/notify`} element={ <Sys_Notification />}/>
                  <Route path={`/`} element={ <NC_Status />}/>
                <Route/>
              </Routes>
            </Box>
        </div>

        
      </div>  
    </AccordionProvider>
  );
}

export default App;
