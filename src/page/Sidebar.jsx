import React from "react";
import logo from '../assets/img/JackTech banner logo.png';
import { Link } from 'react-router-dom';

function Sidebar({ isSidebarOpen }) {
    return (
        <div className={`Sidebar ${isSidebarOpen? 'side-open': ''}`}>
            <img className="jack-logo" src={ logo }></img>
            <ul>
                <li><Link to='/'>機台狀態</Link></li>
                <li><Link to='/alarm'>警報</Link></li>
                <li><Link to='/order'>工單</Link></li>
                <li><Link to='/setting'>基本設定</Link></li>
                <li><Link to='/sys'>系統設定</Link></li>
            </ul>
        </div>
    );
}

export default Sidebar;