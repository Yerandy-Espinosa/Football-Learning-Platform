import React, { useState } from 'react';
import { demoPlayers, teamAnalytics, playerAnalytics, leaderboards } from '../../data/demoData';
import type { Player, LeaderboardType } from '../../types';
import './DashboardPage.css';

export function DashboardPage() {
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const [activeLeaderboard, setActiveLeaderboard] = useState<LeaderboardType>('points');

    const leaderboardLabels: Record<LeaderboardType, string> = {
        points: 'Points',
        accuracy: 'Accuracy %',
        performance: 'Performance',
        mostImproved: 'Most Improved'
    };

    return (
        <div className="dashboard-page animate-fade-in">
            <div className="page-header">
                <div>
                    <h1>Team Dashboard</h1>
                    <p className="page-subtitle">Monitor player progress and team analytics</p>
                </div>
            </div>

            <div className="dashboard-grid">
                {/* Team Overview */}
                <div className="dashboard-section overview-section">
                    <h2>Team Overview</h2>

                    <div className="stat-cards-row">
                        <div className="stat-card large">
                            <div className="stat-value text-success">{teamAnalytics.overallMastery}%</div>
                            <div className="stat-label">Overall Mastery</div>
                            <div className="progress">
                                <div className="progress-bar" style={{ width: `${teamAnalytics.overallMastery}%` }}></div>
                            </div>
                        </div>
                    </div>

                    <h3>Mastery by Position</h3>
                    <div className="position-mastery">
                        {teamAnalytics.masteryByPosition.map(pos => (
                            <div key={pos.position} className="position-item">
                                <div className="position-header">
                                    <span className="position-name">{pos.position}</span>
                                    <span className="position-value">{pos.mastery}%</span>
                                </div>
                                <div className="progress">
                                    <div
                                        className="progress-bar"
                                        style={{
                                            width: `${pos.mastery}%`,
                                            background: pos.mastery >= 80 ? 'var(--color-success)' :
                                                pos.mastery >= 60 ? 'var(--color-warning)' : 'var(--color-error)'
                                        }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Lowest Mastery Plays */}
                <div className="dashboard-section">
                    <h2>Needs Attention</h2>

                    <h3>Lowest Mastery Plays</h3>
                    <div className="attention-list">
                        {teamAnalytics.lowestMasteryPlays.map(play => (
                            <div key={play.playId} className="attention-item">
                                <div className="attention-icon">📋</div>
                                <div className="attention-content">
                                    <span className="attention-name">{play.playName}</span>
                                    <span className="attention-value text-error">{play.mastery}% mastery</span>
                                </div>
                                <button className="btn btn-secondary btn-sm">Create Focus</button>
                            </div>
                        ))}
                    </div>

                    <h3 style={{ marginTop: 'var(--spacing-lg)' }}>Players Not Studying</h3>
                    <div className="attention-list">
                        {teamAnalytics.playersNotStudying.map(player => (
                            <div key={player.playerId} className="attention-item">
                                <div className="avatar">{player.playerName[0]}</div>
                                <div className="attention-content">
                                    <span className="attention-name">{player.playerName}</span>
                                    <span className="attention-value text-warning">
                                        Last active: {new Date(player.lastActive).toLocaleDateString()}
                                    </span>
                                </div>
                                <button className="btn btn-secondary btn-sm">Remind</button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Leaderboards */}
                <div className="dashboard-section leaderboard-section">
                    <h2>Leaderboards</h2>

                    <div className="tabs leaderboard-tabs">
                        {Object.entries(leaderboardLabels).map(([type, label]) => (
                            <button
                                key={type}
                                className={`tab ${activeLeaderboard === type ? 'active' : ''}`}
                                onClick={() => setActiveLeaderboard(type as LeaderboardType)}
                            >
                                {label}
                            </button>
                        ))}
                    </div>

                    <div className="leaderboard-list">
                        {leaderboards[activeLeaderboard].map((entry, index) => (
                            <div
                                key={entry.playerId}
                                className={`leaderboard-item ${index === 0 ? 'first' : ''}`}
                            >
                                <span className="rank">
                                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : entry.rank}
                                </span>
                                <div className="avatar">{entry.playerName[0]}</div>
                                <div className="player-info">
                                    <span className="player-name">{entry.playerName}</span>
                                    <span className="player-position">{entry.position}</span>
                                </div>
                                <div className="player-score">
                                    <span className="score-value">
                                        {activeLeaderboard === 'accuracy' || activeLeaderboard === 'performance'
                                            ? `${entry.value}%`
                                            : activeLeaderboard === 'mostImproved'
                                                ? `+${entry.value}%`
                                                : entry.value.toLocaleString()
                                        }
                                    </span>
                                    {entry.change !== undefined && entry.change !== 0 && (
                                        <span className={`change ${entry.change > 0 ? 'up' : 'down'}`}>
                                            {entry.change > 0 ? '↑' : '↓'} {Math.abs(entry.change)}
                                        </span>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Player List */}
                <div className="dashboard-section players-section">
                    <h2>All Players</h2>

                    <div className="players-list">
                        {demoPlayers.map(player => (
                            <div
                                key={player.id}
                                className={`player-row card card-hover ${selectedPlayer?.id === player.id ? 'selected' : ''}`}
                                onClick={() => setSelectedPlayer(player)}
                            >
                                <div className="avatar">{player.name[0]}</div>
                                <div className="player-details">
                                    <span className="player-name">{player.name}</span>
                                    <span className="player-position">{player.position}</span>
                                </div>
                                <div className="player-quick-stats">
                                    <div className="quick-stat">
                                        <span className="value">{player.stats.mastery}%</span>
                                        <span className="label">Mastery</span>
                                    </div>
                                    <div className="quick-stat">
                                        <span className="value">{player.stats.streak}🔥</span>
                                        <span className="label">Streak</span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Player Detail Modal */}
            {selectedPlayer && (
                <div className="modal-overlay" onClick={() => setSelectedPlayer(null)}>
                    <div className="player-detail-modal card animate-slide-up" onClick={e => e.stopPropagation()}>
                        <div className="modal-header">
                            <div className="player-header">
                                <div className="avatar avatar-lg">{selectedPlayer.name[0]}</div>
                                <div>
                                    <h2>{selectedPlayer.name}</h2>
                                    <span className="player-position">{selectedPlayer.position}</span>
                                </div>
                            </div>
                            <button className="close-btn" onClick={() => setSelectedPlayer(null)}>×</button>
                        </div>

                        <div className="modal-content">
                            <div className="stats-grid">
                                <div className="stat-card">
                                    <div className="stat-value">{selectedPlayer.stats.mastery}%</div>
                                    <div className="stat-label">Mastery</div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-value">{selectedPlayer.stats.accuracy}%</div>
                                    <div className="stat-label">Accuracy</div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-value">{selectedPlayer.stats.reactionTime}s</div>
                                    <div className="stat-label">Avg Reaction</div>
                                </div>
                                <div className="stat-card">
                                    <div className="stat-value">{selectedPlayer.stats.streak}🔥</div>
                                    <div className="stat-label">Streak</div>
                                </div>
                            </div>

                            <div className="detail-section">
                                <h3>Accuracy by Mode</h3>
                                <div className="accuracy-bars">
                                    {playerAnalytics.accuracyByMode.map(mode => (
                                        <div key={mode.mode} className="accuracy-bar-item">
                                            <span className="mode-label">{mode.mode}</span>
                                            <div className="progress" style={{ flex: 1 }}>
                                                <div className="progress-bar" style={{ width: `${mode.accuracy}%` }}></div>
                                            </div>
                                            <span className="mode-value">{mode.accuracy}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="detail-section two-col">
                                <div>
                                    <h3>💪 Strengths</h3>
                                    <ul className="strength-list">
                                        {playerAnalytics.strengths.map((s, i) => (
                                            <li key={i} className="text-success">{s}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div>
                                    <h3>🎯 Needs Work</h3>
                                    <ul className="weakness-list">
                                        {playerAnalytics.weaknesses.map((w, i) => (
                                            <li key={i} className="text-warning">{w}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="detail-section">
                                <h3>🏆 Achievements</h3>
                                <div className="achievements-list">
                                    {selectedPlayer.stats.achievements.map(a => (
                                        <div key={a.id} className="achievement-item">
                                            <span className="achievement-icon">{a.icon}</span>
                                            <div>
                                                <span className="achievement-name">{a.name}</span>
                                                <span className="achievement-desc">{a.description}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="modal-actions">
                            <button className="btn btn-primary btn-lg w-full">
                                Create Focus Session
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
