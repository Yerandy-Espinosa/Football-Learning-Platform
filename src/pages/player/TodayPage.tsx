import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useGame } from '../../context/GameContext';
import { demoPlays, playerAnalytics, leaderboards } from '../../data/demoData';
import { PlayThumbnail } from '../../components/PlayThumbnail';
import './PlayerPages.css';

export function TodayPage() {
    const navigate = useNavigate();
    const { currentPlayer } = useAuth();
    const { leaderboardSettings } = useGame();

    if (!currentPlayer) return null;

    const stats = currentPlayer.stats;
    const rank = leaderboards.points.find(l => l.playerId === currentPlayer.id)?.rank || 0;

    return (
        <div className="today-page animate-fade-in">
            {/* Hero Section */}
            <div className="today-hero">
                <div className="greeting">
                    <h1>Hey, {currentPlayer.name}! 👋</h1>
                    <p>Ready to level up your game?</p>
                </div>

                <div className="stats-header">
                    <div className="stat-pill">
                        <span className="stat-icon">⭐</span>
                        <span className="stat-value">{stats.points.toLocaleString()}</span>
                        <span className="stat-label">Points</span>
                    </div>
                    <div className="stat-pill fire">
                        <span className="stat-icon">🔥</span>
                        <span className="stat-value">{stats.streak}</span>
                        <span className="stat-label">Day Streak</span>
                    </div>
                    <div className="stat-pill">
                        <span className="stat-icon">📊</span>
                        <span className="stat-value">{stats.mastery}%</span>
                        <span className="stat-label">Mastery</span>
                    </div>
                    {leaderboardSettings.enabled && (
                        <div className="stat-pill rank">
                            <span className="stat-icon">🏆</span>
                            <span className="stat-value">#{rank}</span>
                            <span className="stat-label">Rank</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Main CTA */}
            <div className="main-cta card">
                <div className="cta-content">
                    <h2>Daily Review</h2>
                    <p>5 plays • ~10 minutes</p>
                </div>
                <button
                    className="btn btn-primary btn-lg cta-button"
                    onClick={() => navigate('/player/plays')}
                >
                    Start Daily Review
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                </button>
            </div>

            {/* Due Today */}
            <div className="section">
                <h3>Due Today</h3>
                <div className="plays-row">
                    {demoPlays.slice(0, 3).map(play => (
                        <div
                            key={play.id}
                            className="play-mini-card card card-hover"
                            onClick={() => navigate(`/player/plays/${play.id}/learn`)}
                        >
                            <div className="play-mini-thumb">
                                <PlayThumbnail play={play} showPhase={false} />
                            </div>
                            <div className="play-mini-info">
                                <span className="play-name">{play.name}</span>
                                <span className="play-meta">{play.formation}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Strengths & Weaknesses */}
            <div className="section two-col">
                <div className="strength-card card">
                    <h3>💪 You're Best At</h3>
                    <ul>
                        {playerAnalytics.strengths.map((s, i) => (
                            <li key={i}>{s}</li>
                        ))}
                    </ul>
                </div>
                <div className="weakness-card card">
                    <h3>🎯 Needs Work</h3>
                    <ul>
                        {playerAnalytics.weaknesses.map((w, i) => (
                            <li key={i}>{w}</li>
                        ))}
                    </ul>
                    <button
                        className="btn btn-accent btn-lg w-full"
                        onClick={() => navigate('/player/practice')}
                    >
                        Start Focus Session
                    </button>
                </div>
            </div>

            {/* Quick Actions */}
            <div className="section">
                <h3>Quick Actions</h3>
                <div className="quick-actions">
                    <button className="quick-action card card-hover" onClick={() => navigate('/player/practice')}>
                        <span className="action-icon">🏋️</span>
                        <span className="action-label">Practice</span>
                    </button>
                    <button className="quick-action card card-hover" onClick={() => navigate('/player/game-ready')}>
                        <span className="action-icon">⚡</span>
                        <span className="action-label">Game Ready</span>
                    </button>
                    <button className="quick-action card card-hover" onClick={() => navigate('/player/progress')}>
                        <span className="action-icon">📈</span>
                        <span className="action-label">Progress</span>
                    </button>
                </div>
            </div>
        </div>
    );
}
