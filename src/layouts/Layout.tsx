import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Sidebar, BottomNav, MobileHeader } from '../components/navigation';
import './Layout.css';

export function Layout() {
    const { role } = useAuth();

    return (
        <div className={`app-layout ${role}-layout`}>
            <Sidebar />
            <MobileHeader />

            <main className="main-content">
                <Outlet />
            </main>

            {role === 'player' && <BottomNav />}
        </div>
    );
}
