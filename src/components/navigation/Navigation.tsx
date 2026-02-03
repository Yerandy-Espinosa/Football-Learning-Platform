import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import './Navigation.css';

// Icons as simple SVG components
const Icons = {
    plays: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <path d="M9 12l2 2 4-4" />
        </svg>
    ),
    dictionary: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
            <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
        </svg>
    ),
    dashboard: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="3" width="7" height="9" />
            <rect x="14" y="3" width="7" height="5" />
            <rect x="14" y="12" width="7" height="9" />
            <rect x="3" y="16" width="7" height="5" />
        </svg>
    ),
    team: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
            <circle cx="9" cy="7" r="4" />
            <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
            <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
    ),
    today: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 6v6l4 2" />
        </svg>
    ),
    practice: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
        </svg>
    ),
    gameReady: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
        </svg>
    ),
    progress: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M18 20V10" />
            <path d="M12 20V4" />
            <path d="M6 20v-6" />
        </svg>
    ),
    logout: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
    ),
    menu: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
    ),
    close: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
    ),
    moon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
    ),
    sun: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
    )
};

const coachNavItems = [
    { path: '/coach/plays', label: 'Plays', icon: Icons.plays },
    { path: '/coach/dictionary', label: 'Dictionary', icon: Icons.dictionary },
    { path: '/coach/dashboard', label: 'Dashboard', icon: Icons.dashboard },
    { path: '/coach/team', label: 'Team / Settings', icon: Icons.team },
];

const playerNavItems = [
    { path: '/player/today', label: 'Today', icon: Icons.today },
    { path: '/player/plays', label: 'Plays', icon: Icons.plays },
    { path: '/player/practice', label: 'Practice', icon: Icons.practice },
    { path: '/player/game-ready', label: 'Game Ready', icon: Icons.gameReady },
    { path: '/player/progress', label: 'Progress', icon: Icons.progress },
    { path: '/player/leaderboard', label: 'Leaderboard', icon: Icons.dashboard },
];

// Theme Toggle Component
const ThemeToggle = () => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem('theme') || 'dark';
    });

    useEffect(() => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return (
        <button className="nav-item theme-btn" onClick={toggleTheme} title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}>
            {theme === 'dark' ? Icons.sun : Icons.moon}
            <span>{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
    );
};

// Desktop Sidebar
export function Sidebar() {
    const { role, currentPlayer, logout } = useAuth();
    const navItems = role === 'coach' ? coachNavItems : playerNavItems;

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <div className="logo">
                    <span className="logo-icon">🏈</span>
                    <span className="logo-text">NSTAL</span>
                </div>
                {role === 'player' && currentPlayer && (
                    <div className="user-info">
                        <div className="avatar">{currentPlayer.name[0]}</div>
                        <div className="user-details">
                            <span className="user-name">{currentPlayer.name}</span>
                            <span className="user-position">{currentPlayer.position}</span>
                        </div>
                    </div>
                )}
                {role === 'coach' && (
                    <div className="user-info">
                        <div className="avatar avatar-coach">C</div>
                        <div className="user-details">
                            <span className="user-name">Demo Coach</span>
                            <span className="user-position">Head Coach</span>
                        </div>
                    </div>
                )}
            </div>

            <nav className="sidebar-nav">
                {navItems.map(item => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

            <div className="sidebar-footer">
                <ThemeToggle />
                <button className="nav-item logout-btn" onClick={logout}>
                    {Icons.logout}
                    <span>Logout</span>
                </button>
            </div>
        </aside>
    );
}

// Mobile Bottom Navigation (Player)
export function BottomNav() {
    return (
        <nav className="bottom-nav">
            {playerNavItems.map(item => (
                <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) => `bottom-nav-item ${isActive ? 'active' : ''}`}
                >
                    {item.icon}
                    <span>{item.label}</span>
                </NavLink>
            ))}
        </nav>
    );
}

// Mobile Hamburger Menu (Coach)
export function HamburgerMenu() {
    const [isOpen, setIsOpen] = React.useState(false);
    const { logout } = useAuth();

    return (
        <>
            <button className="hamburger-btn" onClick={() => setIsOpen(true)}>
                {Icons.menu}
            </button>

            {isOpen && (
                <div className="mobile-menu-overlay" onClick={() => setIsOpen(false)}>
                    <div className="mobile-menu" onClick={e => e.stopPropagation()}>
                        <div className="mobile-menu-header">
                            <div className="logo">
                                <span className="logo-icon">🏈</span>
                                <span className="logo-text">NSTAL</span>
                            </div>
                            <button className="close-btn" onClick={() => setIsOpen(false)}>
                                {Icons.close}
                            </button>
                        </div>

                        <nav className="mobile-menu-nav">
                            {coachNavItems.map(item => (
                                <NavLink
                                    key={item.path}
                                    to={item.path}
                                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                                    onClick={() => setIsOpen(false)}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </NavLink>
                            ))}
                        </nav>

                        <div className="mobile-menu-footer">
                            <ThemeToggle />
                            <button className="nav-item logout-btn" onClick={logout}>
                                {Icons.logout}
                                <span>Logout</span>
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

// Header for mobile
export function MobileHeader() {
    const { role, currentPlayer } = useAuth();
    const location = useLocation();

    // Get current page title
    const getPageTitle = () => {
        const path = location.pathname;
        const allItems = [...coachNavItems, ...playerNavItems];
        const item = allItems.find(i => path.startsWith(i.path));
        return item?.label || 'NSTAL';
    };

    return (
        <header className="mobile-header">
            {role === 'coach' && <HamburgerMenu />}
            <h1 className="page-title">{getPageTitle()}</h1>
            {role === 'player' && currentPlayer && (
                <div className="avatar avatar-sm">{currentPlayer.name[0]}</div>
            )}
        </header>
    );
}
