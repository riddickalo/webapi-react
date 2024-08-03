import React from "react";

function Header({ isSidebarOpen, toggleSidebar }) {
    return (
        <div className={`Header ${isSidebarOpen? 'SidebarOpen': ''}`}>
            <button onClick={toggleSidebar} className="sidebar-toggle-button">
                {isSidebarOpen? 'hidden-sidebar': 'show-sidebar'}
            </button>
            <h1>War Room System</h1>
        </div>
    );
}

export default Header;