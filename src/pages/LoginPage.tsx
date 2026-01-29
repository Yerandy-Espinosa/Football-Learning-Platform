import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { demoPlayers } from '../data/demoData';
import { LeaderboardList } from '../components/LeaderboardList';
import './LoginPage.css';

export function LoginPage() {
    const { loginAsCoach, loginAsPlayer } = useAuth();
    const [showPlayerSelector, setShowPlayerSelector] = useState(false);
    const [mobileView, setMobileView] = useState<'login' | 'leaderboard'>('login');
    const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 1024);

    useEffect(() => {
        const handleResize = () => setIsDesktop(window.innerWidth >= 1024);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Mobile View: Leaderboard Only
    if (!isDesktop && mobileView === 'leaderboard') {
        return (
            <div className="login-page mobile-leaderboard-view animate-fade-in">
                <div className="mobile-header">
                    <button
                        className="btn btn-ghost"
                        onClick={() => setMobileView('login')}
                    >
                        ← Back to Login
                    </button>
                    <h3>Leaderboards</h3>
                </div>
                <div className="mobile-leaderboard-content">
                    <LeaderboardList />
                </div>
            </div>
        );
    }

    // Default View (Desktop Split or Mobile Login)
    return (
        <div className="login-page">
            <div className="login-background">
                <div className="field-lines"></div>
                <div className="glow-effect"></div>
            </div>

            <div className="login-container">
                {/* Left Panel: Login Form */}
                <div className="login-panel animate-slide-up">
                    <div className="login-logo">
                        <span className="logo-icon">🏈</span>
                        <div className="logo-text-group">
                            <h1 className="logo-title">NSTAL</h1>
                            <p className="logo-subtitle">Sports Learning Platform</p>
                        </div>
                    </div>

                    <div className="login-card glass-panel">
                        <h2>Welcome Back</h2>
                        <p className="login-description">
                            Master your playbook with active learning.
                        </p>

                        <div className="login-options">
                            <button
                                className="login-option player-option"
                                onClick={() => setShowPlayerSelector(true)}
                            >
                                <div className="option-icon">🎮</div>
                                <div className="option-content">
                                    <h3>Player</h3>
                                    <p>Learn plays & compete</p>
                                </div>
                            </button>

                            <button
                                className="login-option coach-option"
                                onClick={loginAsCoach}
                            >
                                <div className="option-icon">📋</div>
                                <div className="option-content">
                                    <h3>Coach</h3>
                                    <p>Manage team & insights</p>
                                </div>
                            </button>
                        </div>

                        {!isDesktop && (
                            <button
                                className="btn btn-ghost btn-block mt-4"
                                onClick={() => setMobileView('leaderboard')}
                                style={{ marginTop: '1.5rem', border: '1px solid var(--color-border)' }}
                            >
                                <span>🏆</span> View Leaderboards
                            </button>
                        )}
                    </div>
                    <p className="demo-note">Demo Mode - No password required</p>
                </div>

                {/* Right Panel: Leaderboard (Desktop Only) */}
                {isDesktop && (
                    <div className="leaderboard-panel animate-slide-up" style={{ animationDelay: '0.1s' }}>
                        <div className="glass-panel leaderboard-container">
                            <div className="leaderboard-header">
                                <span className="trophy-icon">🏆</span>
                                <h2>Top Performers</h2>
                                <p>This Week's Rankings</p>
                            </div>
                            <LeaderboardList />
                        </div>
                    </div>
                )}
            </div>

            {/* Role selector in top-right */}
            <div className="quick-selector">
                <button className="quick-btn" onClick={loginAsCoach}>Coach</button>
                <div className="quick-divider">|</div>
                <button className="quick-btn" onClick={() => setShowPlayerSelector(true)}>Player</button>
            </div>

            {/* Player Selector Modal */}
            {showPlayerSelector && (
                <div className="modal-overlay" onClick={() => setShowPlayerSelector(false)} style={{ zIndex: 1000 }}>
                    <div
                        className="player-selector-modal"
                        onClick={e => e.stopPropagation()}
                        style={{ zIndex: 1001, position: 'relative' }}
                    >
                        <div className="modal-header">
                            <h3>Select Profile</h3>
                            <button className="close-btn-icon" onClick={() => setShowPlayerSelector(false)}>✕</button>
                        </div>
                        <div className="player-list">
                            {demoPlayers.map(player => (
                                <button
                                    key={player.id}
                                    className="player-card"
                                    onClick={() => {
                                        console.log('Clicked player:', player.id);
                                        loginAsPlayer(player.id);
                                    }}
                                >
                                    <div className="player-avatar">{player.name[0]}</div>
                                    <div className="player-info">
                                        <span className="player-name">{player.name}</span>
                                        <span className="player-position">{player.position}</span>
                                    </div>
                                    <div className="player-stats-preview">
                                        <div className="stat-badge">
                                            <span className="value">{player.stats.mastery}%</span>
                                            <span className="label">Mastery</span>
                                        </div>
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
