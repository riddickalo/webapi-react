import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './assets/css/webapi-react.css'
import Header from './page/Header';
import Sidebar from './page/Sidebar';
import NC_Alarm from './page/NC_Alarm';
import NC_Status from './page/NC_Status';
import Order from './page/Order';
import BasicSetting from './page/BasicSetting';
import SysSetting from './page/SysSetting';
// import MenuItem from './components/MenuItem';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = ()=>{
    setIsSidebarOpen(!isSidebarOpen);
  }

  return (
    <Router>
      <div className="App">
        <Header isSidebarOpen={ isSidebarOpen } toggleSidebar={ toggleSidebar } />
        <div className={`main-content ${isSidebarOpen? 'SidebarOpen': ''}`}>
          <Sidebar isSidebarOpen={ isSidebarOpen }>
          <div className='page-content'>
              <Routes>
                <Route path='/' element={ <NC_Status/> }/>
                <Route path='/alarm' element={ <NC_Alarm/> }/>
                <Route path='/order/' element={ <Order/> }/>
                <Route path='/setting' element={ <BasicSetting/> }/>
                <Route path='/sys' element={ <SysSetting/> }/>
              </Routes>
          </div>
          </Sidebar>
        </div>
        
      </div>
    </Router>    
  );
}

export default App;
