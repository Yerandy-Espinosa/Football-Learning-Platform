import { useState } from 'react';
import type { LeaderboardType } from '../types';
import { leaderboards } from '../data/demoData';
import './LeaderboardList.css';

interface LeaderboardListProps {
    className?: string;
    compact?: boolean;
}

export function LeaderboardList({ className = '', compact = false }: LeaderboardListProps) {
    const [activeLeaderboard, setActiveLeaderboard] = useState<LeaderboardType>('points');

    const toggleTypes: { value: LeaderboardType; label: string; icon: string }[] = [
        { value: 'points', label: 'Points', icon: '⭐' },
        { value: 'streak', label: 'Streak', icon: '🔥' },
        { value: 'accuracy', label: 'Accuracy', icon: '🎯' }, // Changed from weekly_gain
        { value: 'reaction_time', label: 'Reaction', icon: '⚡' },
    ];

    const currentLeaderboard = leaderboards[activeLeaderboard] || [];

    // Sort valid entries
    const sortedLeaderboard = [...currentLeaderboard].sort((a, b) => a.rank - b.rank);

    // Limit if compact view
    const displayEntries = compact ? sortedLeaderboard.slice(0, 5) : sortedLeaderboard;

    return (
        <div className={`leaderboard-list-container ${className}`}>
            <div className="leaderboard-header">
                {!compact && <h2>Leaderboards</h2>}
                <div className="leaderboard-tabs">
                    {toggleTypes.map(type => (
                        <button
                            key={type.value}
                            className={`leaderboard-tab ${activeLeaderboard === type.value ? 'active' : ''}`}
                            onClick={() => setActiveLeaderboard(type.value)}
                            title={type.label}
                        >
                            <span className="tab-icon">{type.icon}</span>
                            {!compact && <span className="tab-label">{type.label}</span>}
                        </button>
                    ))}
                </div>
            </div>

            <div className="leaderboard-content animate-fade-in">
                {displayEntries.length > 0 ? (
                    <div className="leaderboard-entries">
                        {displayEntries.map((entry) => (
                            <div key={entry.playerId} className={`leaderboard-entry rank-${entry.rank}`}>
                                <div className="rank-badge">
                                    {entry.rank <= 3 ? (
                                        <span className="medal">
                                            {entry.rank === 1 ? '🥇' : entry.rank === 2 ? '🥈' : '🥉'}
                                        </span>
                                    ) : (
                                        <span className="rank-number">#{entry.rank}</span>
                                    )}
                                </div>
                                <div className="player-info">
                                    <span className="player-name">{entry.playerName}</span>
                                    {/* Fake team name for demo */}
                                    <span className="player-team">Varsity</span>
                                </div>
                                <div className="score-value">
                                    <span className="value">{entry.value.toLocaleString()}</span>
                                    {activeLeaderboard === 'reaction_time' && <span className="unit">ms</span>}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="empty-state">
                        <p>No players ranked yet.</p>
                    </div>
                )}

                {compact && sortedLeaderboard.length > 5 && (
                    <div className="leaderboard-footer">
                        <span>+ {sortedLeaderboard.length - 5} more</span>
                    </div>
                )}
            </div>
        </div>
    );
}
