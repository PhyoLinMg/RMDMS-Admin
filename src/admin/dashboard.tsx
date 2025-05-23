import React, { useState, useContext, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router';
import { AuthContext } from '../App';

import './dashboard.css';
import RoomsPage from './room/room_page';
import ParcelsPage from './parcel/parcel_page';
import UsersPage from './user/user_page';
import CreateRoomPage from './room/create_room_page';

const Dashboard: React.FC = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [drawerOpen, setDrawerOpen] = useState<boolean>(window.innerWidth >= 992);
  const [activeItem, setActiveItem] = useState<string>('rooms');
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 992);

  // Set initial active item based on the current path
  useEffect(() => {
    const path = location.pathname.split('/').pop() || 'rooms';
    setActiveItem(path);
  }, [location]);

  // Handle resize events
  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 992;
      setIsMobile(mobile);
      
      // Auto-close drawer on mobile, open on desktop
      if (mobile !== isMobile) {
        setDrawerOpen(!mobile);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobile]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleNavItemClick = (item: string) => {
    setActiveItem(item);
    navigate(`/dashboard/${item}`);
    
    // Auto-close drawer on mobile after navigation
    if (isMobile) {
      setDrawerOpen(false);
    }
  };

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <div className="dashboard-container">
      {/* Top Navigation Bar */}
      <header className="top-navbar">
        <div className="navbar-left">
          <button className="menu-toggle" onClick={toggleDrawer}>
            <span className="menu-icon"></span>
          </button>
          <h1>Admin Dashboard</h1>
        </div>
        <div className="navbar-right">
          <button className="logout-button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </header>

      <div className="dashboard-content">
        {/* Mobile Overlay */}
        {isMobile && (
          <div 
            className={`mobile-overlay ${drawerOpen ? 'visible' : ''}`}
            onClick={() => setDrawerOpen(false)}
          ></div>
        )}
        
        {/* Side Navigation Drawer */}
        <aside className={`side-drawer ${drawerOpen ? 'open' : 'closed'}`}>
          <nav className="drawer-nav">
            <ul>
              <li 
                className={activeItem === 'rooms' ? 'active' : ''} 
                onClick={() => handleNavItemClick('rooms')}
              >
                <span className="nav-icon rooms-icon"></span>
                <span className="nav-text">Rooms</span>
              </li>
              <li 
                className={activeItem === 'parcels' ? 'active' : ''} 
                onClick={() => handleNavItemClick('parcels')}
              >
                <span className="nav-icon parcels-icon"></span>
                <span className="nav-text">Parcels</span>
              </li>
              <li 
                className={activeItem === 'users' ? 'active' : ''} 
                onClick={() => handleNavItemClick('users')}
              >
                <span className="nav-icon users-icon"></span>
                <span className="nav-text">Users</span>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<RoomsPage />} />
            <Route path="/rooms" element={<RoomsPage />} />
            <Route path="/parcels" element={<ParcelsPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/rooms/create" element={<CreateRoomPage />} />
          </Routes>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;

