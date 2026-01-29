import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { PlayerStats, Achievement, LeaderboardSettings } from '../types';

interface GameContextType {
    // Points & Stats
    points: number;
    streak: number;
    bestStreak: number;

    // Actions
    addPoints: (amount: number, reason: string) => void;
    incrementStreak: () => void;
    resetStreak: () => void;

    // Leaderboard Settings (Coach)
    leaderboardSettings: LeaderboardSettings;
    updateLeaderboardSettings: (settings: Partial<LeaderboardSettings>) => void;

    // Achievements
    achievements: Achievement[];
    unlockAchievement: (achievementId: string) => void;

    // Recent Activity
    recentActivity: { action: string; points: number; timestamp: Date }[];
}

const GameContext = createContext<GameContextType | undefined>(undefined);

const defaultLeaderboardSettings: LeaderboardSettings = {
    enabled: true,
    anonymous: false,
    scope: 'team',
    types: ['points', 'accuracy', 'performance', 'mostImproved']
};

const allAchievements: Achievement[] = [
    { id: 'perfect-week', name: 'Perfect Week', description: 'Complete daily reviews for 7 days straight', icon: '🔥' },
    { id: 'accuracy-master', name: 'Accuracy Master', description: 'Achieve 90% accuracy in any mode', icon: '🎯' },
    { id: 'game-ready', name: 'Game Ready Specialist', description: 'Complete 50 Game Ready sessions', icon: '⚡' },
    { id: 'most-improved', name: 'Most Improved', description: 'Improve mastery by 20% in one week', icon: '📈' },
    { id: 'quiz-master', name: 'Quiz Master', description: 'Answer 100 questions correctly', icon: '🧠' },
    { id: 'speed-demon', name: 'Speed Demon', description: 'Average reaction time under 1 second', icon: '💨' },
];

export function GameProvider({ children }: { children: ReactNode }) {
    const [points, setPoints] = useState(0);
    const [streak, setStreak] = useState(0);
    const [bestStreak, setBestStreak] = useState(0);
    const [leaderboardSettings, setLeaderboardSettings] = useState(defaultLeaderboardSettings);
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [recentActivity, setRecentActivity] = useState<{ action: string; points: number; timestamp: Date }[]>([]);

    const addPoints = useCallback((amount: number, reason: string) => {
        setPoints(prev => prev + amount);
        setRecentActivity(prev => [
            { action: reason, points: amount, timestamp: new Date() },
            ...prev.slice(0, 9)
        ]);
    }, []);

    const incrementStreak = useCallback(() => {
        setStreak(prev => {
            const newStreak = prev + 1;
            if (newStreak > bestStreak) {
                setBestStreak(newStreak);
            }
            return newStreak;
        });
    }, [bestStreak]);

    const resetStreak = useCallback(() => {
        setStreak(0);
    }, []);

    const updateLeaderboardSettings = useCallback((settings: Partial<LeaderboardSettings>) => {
        setLeaderboardSettings(prev => ({ ...prev, ...settings }));
    }, []);

    const unlockAchievement = useCallback((achievementId: string) => {
        const achievement = allAchievements.find(a => a.id === achievementId);
        if (achievement && !achievements.find(a => a.id === achievementId)) {
            setAchievements(prev => [...prev, { ...achievement, unlockedAt: new Date() }]);
        }
    }, [achievements]);

    return (
        <GameContext.Provider value={{
            points,
            streak,
            bestStreak,
            addPoints,
            incrementStreak,
            resetStreak,
            leaderboardSettings,
            updateLeaderboardSettings,
            achievements,
            unlockAchievement,
            recentActivity
        }}>
            {children}
        </GameContext.Provider>
    );
}

export function useGame() {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
}

// Scoring constants
export const SCORING = {
    LEARN_CORRECT: 10,
    PRACTICE_CORRECT: 20,
    PRACTICE_PARTIAL: 10,
    REDRAW_SUCCESS: 25,
    GAME_READY_CORRECT: 30,
    GAME_READY_SPEED_BONUS_MAX: 20,
    DAILY_REVIEW_COMPLETE: 50
};
