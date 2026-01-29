import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { demoPlays } from '../../data/demoData';
import type { Play, PlayPhase } from '../../types';
import { PlayThumbnail } from '../../components/PlayThumbnail';
import './PlaysPage.css';

const phaseFilters: { value: PlayPhase | 'all'; label: string }[] = [
    { value: 'all', label: 'All Plays' },
    { value: 'offense', label: 'Offense' },
    { value: 'defense', label: 'Defense' },
    { value: 'special', label: 'Special Teams' },
];

export function PlaysPage() {
    const navigate = useNavigate();
    const [search, setSearch] = useState('');
    const [phaseFilter, setPhaseFilter] = useState<PlayPhase | 'all'>('all');

    const filteredPlays = useMemo(() => {
        return demoPlays.filter(play => {
            const matchesSearch = play.name.toLowerCase().includes(search.toLowerCase()) ||
                play.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
            const matchesPhase = phaseFilter === 'all' || play.phase === phaseFilter;
            return matchesSearch && matchesPhase;
        });
    }, [search, phaseFilter]);

    const handlePlayClick = (play: Play) => {
        const isMobile = window.innerWidth < 768;
        if (isMobile) {
            // Mobile: view only
            navigate(`/coach/plays/${play.id}?view=true`);
        } else {
            navigate(`/coach/plays/${play.id}`);
        }
    };

    return (
        <div className="plays-page animate-fade-in">
            <div className="page-header">
                <div>
                    <h1>Playbook</h1>
                    <p className="page-subtitle">{demoPlays.length} plays in your library</p>
                </div>
                <button
                    className="btn btn-primary btn-lg hide-mobile"
                    onClick={() => navigate('/coach/plays/new')}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="12" y1="5" x2="12" y2="19" />
                        <line x1="5" y1="12" x2="19" y2="12" />
                    </svg>
                    New Play
                </button>
            </div>

            <div className="plays-filters">
                <div className="search-box">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8" />
                        <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                        type="text"
                        className="input search-input"
                        placeholder="Search plays or tags..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                    />
                </div>

                <div className="tabs phase-tabs">
                    {phaseFilters.map(filter => (
                        <button
                            key={filter.value}
                            className={`tab ${phaseFilter === filter.value ? 'active' : ''}`}
                            onClick={() => setPhaseFilter(filter.value)}
                        >
                            {filter.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="plays-grid">
                {filteredPlays.map((play, index) => (
                    <div
                        key={play.id}
                        className="play-card card card-hover"
                        onClick={() => handlePlayClick(play)}
                        style={{ animationDelay: `${index * 50}ms` }}
                    >
                        <div className="play-thumbnail">
                            <div className="play-thumbnail-content">
                                <PlayThumbnail play={play} showPhase={false} />
                            </div>
                            <span className={`badge badge-${play.status === 'published' ? 'success' : 'warning'}`}>
                                {play.status}
                            </span>
                        </div>

                        <div className="play-info">
                            <h3 className="play-name">{play.name}</h3>
                            <p className="play-formation">{play.formation}</p>

                            <div className="play-tags">
                                {play.tags.slice(0, 3).map(tag => (
                                    <span key={tag} className="chip">{tag}</span>
                                ))}
                            </div>
                        </div>

                        <div className="play-meta">
                            <span className={`phase-badge ${play.phase}`}>
                                {play.phase}
                            </span>
                        </div>
                    </div>
                ))}
            </div>

            {filteredPlays.length === 0 && (
                <div className="empty-state">
                    <div className="empty-icon">📋</div>
                    <h3>No plays found</h3>
                    <p>Try adjusting your search or filters</p>
                </div>
            )}

            {/* Mobile FAB */}
            <button
                className="fab hide-tablet-up"
                onClick={() => navigate('/coach/plays/new')}
            >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="12" y1="5" x2="12" y2="19" />
                    <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
            </button>
        </div>
    );
}
