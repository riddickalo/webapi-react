import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Box, useMediaQuery } from '@mui/material';
import './shared/assets/css/Layout.css';
import './App.css';
import Header from './features/Header/Header';
import Sidebar from './features/Sidebar/Sidebar';
import NCStatus from './features/NC/NC_Status';
import NCMaintain from './features/NC/NC_Maintain';
// import NC_File from './pages/NC_File';
import NCUtilize from './features/NC/NC_Utilize';
import AlarmStatus from './features/Alarms/Alarm_Status';
import AlarmHistory from './features/Alarms/Alarm_History';
// import Order from './pages/Order';
import Report from './features/Reports/Report';
// import Setting_Item from './pages/Setting_Item';
import SettingMaintain from './features/General-settings/Setting_Maintain';
import SettingNCStatus from './features/General-settings/Setting_NCstatus';
// import Setting_PPmap from './pages/Setting_PPmap';
import SysAccount from './features/Sys-settings/Sys_Account';
import SysGeneral from './features/Sys-settings/Sys_General';
import SysNotification from './features/Sys-settings/Sys_Notification';

// import MenuItem from './components/MenuItem';

function App() {
  console.log("App Rendered");
  // sidebar state
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const loc = useLocation();                                // page changing listener
  const isXsScreen = useMediaQuery('(max-width: 600px');    // small resolution listener
  // const [isSidebarClosing, setIsSidebarClosing] = useState(false);

  const toggleSidebar = () => {
    // console.log(isSidebarOpen, isSidebarClosing);
    // if(!isSidebarClosing)
      setIsSidebarOpen(!isSidebarOpen);
  }

  const handleSidebarClose = () => {
    // setIsSidebarClosing(true);
    setIsSidebarOpen(false);
  }

  // const handleSidebarTransitionEnd = () => {
  //   setIsSidebarClosing(false);
  // }
  
  const [accordionState, setAccordionState] = useState(() => {    // define state for accordion
    const savedState = localStorage.getItem('accordionState');    // read previous state from storage
    return savedState? JSON.parse(savedState): {};                // return it as initial state
  });

  useEffect(() => {
    localStorage.setItem('accordionState', JSON.stringify(accordionState)); // write state into storage
  }, [accordionState]);
  
  useEffect(() => {
    if(isXsScreen) setIsSidebarOpen(false);
  }, [loc, isXsScreen])
  
  const sidebarWidth = 250;
  const refreshInterval = process.env.REACT_APP_REFRESH_INTERVAL || 3600000;

  return (
    <div className="App">
      <Sidebar sidebarWidth={sidebarWidth} isSidebarOpen={ isSidebarOpen } 
          handleClose={handleSidebarClose} /*handleTransitionEnd={handleSidebarTransitionEnd}*/
          accordionState={ accordionState } setAccordionState={ setAccordionState } />
      <Header isSidebarOpen={ isSidebarOpen } toggleSidebar={ toggleSidebar } />
      <div className={`Layout ${isSidebarOpen? 'SidebarOpen': ''}`}>
        <Box sx={{ bgcolor: '#5b5b99', width: '100%', minHeight: '100vh' }}>
          <Routes>
              <Route path='machine/status' element={ <NCStatus interval={refreshInterval} />}/>
              <Route path='machine/maintain' element={ <NCMaintain />}/>
              <Route path='machine/utilize' element={ <NCUtilize interval={refreshInterval} />}/>
              {/* <Route path='machine/ncfile' element={ <NC_File />}/> */}
              <Route path='alarm/status' element={ <AlarmStatus />}/>
              <Route path='alarm/history' element={ <AlarmHistory />}/>
              {/* <Route path='order' element={ <Order />}/> */}
              <Route path='report' element={ <Report />}/>
              <Route path='setting/machine' element={ <SettingNCStatus />}/>
              <Route path='setting/maintain' element={ <SettingMaintain />}/>
              {/* <Route path='/setting/item' element={ <Setting_Item />}/> */}
              {/* <Route path='/setting/pp_map' element={ <Setting_PPmap />}/> */}
              <Route path='sys/general' element={ <SysGeneral />}/>
              <Route path='sys/account' element={ <SysAccount />}/>
              <Route path='sys/notify' element={ <SysNotification />}/>
              <Route path='/' element={ <NCUtilize />}/>
          </Routes>
        </Box>
      </div>
    </div>  
  );
}

export default App;
