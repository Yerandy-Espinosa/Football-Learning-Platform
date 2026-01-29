import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { GameProvider } from './context/GameContext';
import { LoginPage } from './pages/LoginPage';
import { Layout } from './layouts/Layout';

// Coach Pages
import { PlaysPage } from './pages/coach/PlaysPage';
import { PlayBuilder } from './pages/coach/PlayBuilder';
import { DictionaryPage } from './pages/coach/DictionaryPage';
import { DashboardPage } from './pages/coach/DashboardPage';
import { TeamPage } from './pages/coach/TeamPage';

// Player Pages
import { TodayPage } from './pages/player/TodayPage';
import { PlayerPlaysPage } from './pages/player/PlayerPlaysPage';
import { PracticeMode } from './pages/player/PracticeMode';
import { GameReadyMode } from './pages/player/GameReadyMode';
import { ProgressPage } from './pages/player/ProgressPage';
import { LearnMode } from './pages/player/LearnMode';

import './index.css';

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}

function RoleBasedRedirect() {
  const { role } = useAuth();

  if (role === 'coach') {
    return <Navigate to="/coach/plays" replace />;
  }

  return <Navigate to="/player/today" replace />;
}

function AppRoutes() {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={
        isAuthenticated ? <RoleBasedRedirect /> : <LoginPage />
      } />

      <Route path="/" element={
        <ProtectedRoute>
          <Layout />
        </ProtectedRoute>
      }>
        {/* Coach Routes */}
        <Route path="coach/plays" element={<PlaysPage />} />
        <Route path="coach/plays/:playId" element={<PlayBuilder />} />
        <Route path="coach/plays/new" element={<PlayBuilder />} />
        <Route path="coach/dictionary" element={<DictionaryPage />} />
        <Route path="coach/dashboard" element={<DashboardPage />} />
        <Route path="coach/team" element={<TeamPage />} />

        {/* Player Routes */}
        <Route path="player/today" element={<TodayPage />} />
        <Route path="player/plays" element={<PlayerPlaysPage />} />
        <Route path="player/plays/:playId/learn" element={<LearnMode />} />
        <Route path="player/practice" element={<PracticeMode />} />
        <Route path="player/game-ready" element={<GameReadyMode />} />
        <Route path="player/progress" element={<ProgressPage />} />

        {/* Default redirect */}
        <Route index element={<RoleBasedRedirect />} />
      </Route>

      {/* Catch all */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <GameProvider>
          <AppRoutes />
        </GameProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
