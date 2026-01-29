import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { playerAnalytics } from '../../data/demoData';
import './PlayerPages.css';

export function ProgressPage() {
    const { currentPlayer } = useAuth();
    if (!currentPlayer) return null;

    const achievements = [
        { id: 'perfect-week', name: 'Perfect Week', icon: '🔥', desc: '7 day streak', unlocked: true },
        { id: 'accuracy-master', name: 'Accuracy Master', icon: '🎯', desc: '90% accuracy', unlocked: true },
        { id: 'game-ready', name: 'Game Ready Pro', icon: '⚡', desc: '50 sessions', unlocked: false },
        { id: 'speed-demon', name: 'Speed Demon', icon: '💨', desc: '<1s reaction', unlocked: false },
    ];

    const sessions = [
        { type: 'Learn', date: 'Today', accuracy: 92, points: 50, icon: '📖' },
        { type: 'Practice', date: 'Today', accuracy: 78, points: 80, icon: '🏋️' },
        { type: 'Game Ready', date: 'Yesterday', accuracy: 85, points: 120, icon: '⚡' },
    ];

    return (
        <div className="progress-page animate-fade-in">
            <div className="page-header">
                <h1>Your Progress</h1>
                <p className="page-subtitle">Track your learning journey</p>
            </div>

            <div className="progress-grid">
                <div className="progress-section">
                    <h3>Mastery by Play</h3>
                    <div className="mastery-list">
                        {playerAnalytics.masteryByPlay.map(item => (
                            <div key={item.playId} className="mastery-item">
                                <span className="name">{item.playName}</span>
                                <div className="progress"><div className="progress-bar" style={{ width: `${item.mastery}%` }}></div></div>
                                <span className="value">{item.mastery}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="progress-section">
                    <h3>Mastery by Concept</h3>
                    <div className="mastery-list">
                        {playerAnalytics.masteryByConcept.map(item => (
                            <div key={item.concept} className="mastery-item">
                                <span className="name">{item.concept}</span>
                                <div className="progress"><div className="progress-bar" style={{ width: `${item.mastery}%` }}></div></div>
                                <span className="value">{item.mastery}%</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="progress-section">
                    <h3>Recent Sessions</h3>
                    <div className="session-history">
                        {sessions.map((s, i) => (
                            <div key={i} className="session-item">
                                <div className="session-icon">{s.icon}</div>
                                <div className="session-info">
                                    <span className="session-type">{s.type}</span>
                                    <span className="session-date">{s.date}</span>
                                </div>
                                <div className="session-result">
                                    <span className="session-accuracy">{s.accuracy}%</span>
                                    <span className="session-points">+{s.points}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="progress-section">
                    <h3>Achievements</h3>
                    <div className="achievements-grid">
                        {achievements.map(a => (
                            <div key={a.id} className={`achievement-card ${!a.unlocked ? 'locked' : ''}`}>
                                <span className="icon">{a.icon}</span>
                                <span className="name">{a.name}</span>
                                <span className="desc">{a.desc}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
