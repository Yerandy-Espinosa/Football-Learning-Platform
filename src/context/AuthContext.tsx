import React, { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { UserRole, Player } from '../types';
import { demoPlayers } from '../data/demoData';

interface AuthContextType {
    isAuthenticated: boolean;
    role: UserRole | null;
    currentPlayer: Player | null;
    loginAsCoach: () => void;
    loginAsPlayer: (playerId: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [role, setRole] = useState<UserRole | null>(null);
    const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

    const loginAsCoach = useCallback(() => {
        setIsAuthenticated(true);
        setRole('coach');
        setCurrentPlayer(null);
    }, []);

    const loginAsPlayer = useCallback((playerId: string) => {
        console.log('Attempting to log in as player:', playerId);
        const player = demoPlayers.find(p => p.id === playerId);
        if (player) {
            console.log('Player found, setting state:', player.name);
            setIsAuthenticated(true);
            setRole('player');
            setCurrentPlayer(player);
        } else {
            console.error('Player not found in demoPlayers:', playerId, demoPlayers);
        }
    }, []);

    const logout = useCallback(() => {
        setIsAuthenticated(false);
        setRole(null);
        setCurrentPlayer(null);
    }, []);

    return (
        <AuthContext.Provider value={{
            isAuthenticated,
            role,
            currentPlayer,
            loginAsCoach,
            loginAsPlayer,
            logout
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
