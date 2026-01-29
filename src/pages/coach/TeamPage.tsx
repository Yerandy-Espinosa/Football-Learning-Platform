import { useState } from 'react';
import { useGame } from '../../context/GameContext';
import { demoPlayers } from '../../data/demoData';
import './TeamPage.css';

export function TeamPage() {
    const { leaderboardSettings, updateLeaderboardSettings } = useGame();
    const [activeTab, setActiveTab] = useState<'roster' | 'settings'>('roster');

    return (
        <div className="team-page animate-fade-in">
            <div className="page-header">
                <h1>Team & Settings</h1>
            </div>

            <div className="tabs page-tabs">
                <button
                    className={`tab ${activeTab === 'roster' ? 'active' : ''}`}
                    onClick={() => setActiveTab('roster')}
                >
                    Roster
                </button>
                <button
                    className={`tab ${activeTab === 'settings' ? 'active' : ''}`}
                    onClick={() => setActiveTab('settings')}
                >
                    Settings
                </button>
            </div>

            {activeTab === 'roster' && (
                <div className="roster-section animate-fade-in">
                    <div className="section-header">
                        <h2>Team Roster</h2>
                        <button className="btn btn-primary">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" y2="12" />
                            </svg>
                            Add Player
                        </button>
                    </div>

                    <div className="roster-table">
                        <div className="table-header">
                            <span>Player</span>
                            <span>Position</span>
                            <span>Mastery</span>
                            <span>Streak</span>
                            <span>Points</span>
                            <span>Actions</span>
                        </div>
                        {demoPlayers.map(player => (
                            <div key={player.id} className="table-row">
                                <div className="player-cell">
                                    <div className="avatar">{player.name[0]}</div>
                                    <span>{player.name}</span>
                                </div>
                                <span className="badge badge-accent">{player.position}</span>
                                <span>{player.stats.mastery}%</span>
                                <span>{player.stats.streak}🔥</span>
                                <span>{player.stats.points.toLocaleString()}</span>
                                <div className="actions-cell">
                                    <button className="btn btn-icon btn-secondary" title="Edit">✏️</button>
                                    <button className="btn btn-icon btn-secondary" title="Remove">🗑️</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {activeTab === 'settings' && (
                <div className="settings-section animate-fade-in">
                    <div className="settings-card card">
                        <h2>Leaderboard Settings</h2>
                        <p className="settings-description">
                            Control how leaderboards are displayed to your players
                        </p>

                        <div className="setting-item">
                            <div className="setting-info">
                                <span className="setting-label">Enable Leaderboards</span>
                                <span className="setting-desc">Show rankings to players</span>
                            </div>
                            <label className="toggle">
                                <input
                                    type="checkbox"
                                    checked={leaderboardSettings.enabled}
                                    onChange={e => updateLeaderboardSettings({ enabled: e.target.checked })}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>

                        <div className="setting-item">
                            <div className="setting-info">
                                <span className="setting-label">Anonymous Mode</span>
                                <span className="setting-desc">Hide player names on leaderboards</span>
                            </div>
                            <label className="toggle">
                                <input
                                    type="checkbox"
                                    checked={leaderboardSettings.anonymous}
                                    onChange={e => updateLeaderboardSettings({ anonymous: e.target.checked })}
                                />
                                <span className="toggle-slider"></span>
                            </label>
                        </div>

                        <div className="setting-item">
                            <div className="setting-info">
                                <span className="setting-label">Scope</span>
                                <span className="setting-desc">Group rankings by team or position</span>
                            </div>
                            <select
                                className="input"
                                value={leaderboardSettings.scope}
                                onChange={e => updateLeaderboardSettings({ scope: e.target.value as any })}
                            >
                                <option value="team">Entire Team</option>
                                <option value="position">By Position</option>
                            </select>
                        </div>

                        <div className="setting-item column">
                            <div className="setting-info">
                                <span className="setting-label">Ranking Types</span>
                                <span className="setting-desc">Select which leaderboards to show</span>
                            </div>
                            <div className="checkbox-group">
                                {['points', 'accuracy', 'performance', 'mostImproved'].map(type => (
                                    <label key={type} className="checkbox-item">
                                        <input
                                            type="checkbox"
                                            checked={leaderboardSettings.types.includes(type as any)}
                                            onChange={e => {
                                                if (e.target.checked) {
                                                    updateLeaderboardSettings({
                                                        types: [...leaderboardSettings.types, type as any]
                                                    });
                                                } else {
                                                    updateLeaderboardSettings({
                                                        types: leaderboardSettings.types.filter(t => t !== type)
                                                    });
                                                }
                                            }}
                                        />
                                        <span>{type === 'mostImproved' ? 'Most Improved' : type.charAt(0).toUpperCase() + type.slice(1)}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="settings-card card">
                        <h2>Team Settings</h2>

                        <div className="setting-item">
                            <div className="setting-info">
                                <span className="setting-label">Team Name</span>
                            </div>
                            <input className="input" defaultValue="Demo Team" />
                        </div>

                        <div className="setting-item">
                            <div className="setting-info">
                                <span className="setting-label">Season</span>
                            </div>
                            <input className="input" defaultValue="2024 Spring" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
