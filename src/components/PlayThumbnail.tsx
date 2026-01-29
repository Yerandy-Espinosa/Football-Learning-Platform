import React from 'react';
import type { Play, PlayPlayer } from '../types';
import './PlayThumbnail.css';

interface PlayThumbnailProps {
    play: Play;
    className?: string;
    showPhase?: boolean;
}

export const PlayThumbnail: React.FC<PlayThumbnailProps> = ({ play, className = '', showPhase = true }) => {
    return (
        <div className={`play-thumbnail-container ${className}`}>
            <div className="field-preview">
                {/* Mini field lines */}
                <div className="field-lines-mini"></div>
                <div className="field-hash-marks"></div>

                {/* Routes */}
                <svg className="routes-overlay" viewBox="0 0 100 100" preserveAspectRatio="none">
                    {play.routes.map(route => {
                        // Create path string from coordinates
                        const d = route.path.map((pt, i) =>
                            `${i === 0 ? 'M' : 'L'} ${pt.x} ${pt.y}`
                        ).join(' ');

                        return (
                            <path
                                key={route.id}
                                d={d}
                                stroke={route.style === 'dashed' ? '#F4F7F5' : '#F4F7F5'}
                                strokeWidth="2"
                                fill="none"
                                strokeDasharray={route.style === 'dashed' ? '4,4' : 'none'}
                                opacity="0.8"
                            />
                        );
                    })}
                </svg>

                {/* Players */}
                {play.players.map((player) => (
                    <div
                        key={player.id}
                        className={`player-dot ${play.phase === 'offense' ? 'offense' : 'defense'}`}
                        style={{
                            left: `${player.x}%`,
                            top: `${player.y}%`
                        }}
                        title={`${player.position} (${player.id})`}
                    />
                ))}
            </div>

            {showPhase && (
                <div className="play-thumbnail-phase">
                    <div className={`phase-indicator ${play.phase}`}></div>
                </div>
            )}
        </div>
    );
};
