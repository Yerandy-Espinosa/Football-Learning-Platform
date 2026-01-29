import { useNavigate } from 'react-router-dom';
import { demoPlays, playerAnalytics } from '../../data/demoData';
import { PlayThumbnail } from '../../components/PlayThumbnail';
import './PlayerPages.css';

export function PlayerPlaysPage() {
    const navigate = useNavigate();

    const getMasteryLevel = (playId: string) => {
        const mastery = playerAnalytics.masteryByPlay.find(m => m.playId === playId)?.mastery || 50;
        if (mastery >= 80) return { level: 'high', value: mastery };
        if (mastery >= 60) return { level: 'medium', value: mastery };
        return { level: 'low', value: mastery };
    };

    return (
        <div className="player-plays-page animate-fade-in">
            <div className="page-header">
                <h1>Plays</h1>
                <p className="page-subtitle">Learn and master your playbook</p>
            </div>

            <div className="player-plays-grid">
                {demoPlays.filter(p => p.status === 'published').map(play => {
                    const mastery = getMasteryLevel(play.id);
                    return (
                        <div
                            key={play.id}
                            className="player-play-card card card-hover"
                            onClick={() => navigate(`/player/plays/${play.id}/learn`)}
                        >
                            <span className={`mastery-badge ${mastery.level}`}>
                                {mastery.value}%
                            </span>

                            <div className="play-mini-thumb">
                                <PlayThumbnail play={play} showPhase={false} />
                            </div>

                            <div className="play-mini-info">
                                <span className="play-name">{play.name}</span>
                                <span className="play-meta">{play.formation}</span>
                            </div>

                            <div className="progress" style={{ marginTop: 'var(--spacing-sm)' }}>
                                <div
                                    className="progress-bar"
                                    style={{ width: `${mastery.value}%` }}
                                ></div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
