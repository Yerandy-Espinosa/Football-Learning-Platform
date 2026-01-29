import { useState, useRef, useEffect } from 'react';
import type { MouseEvent } from 'react';
import { useParams, useNavigate, useSearchParams } from 'react-router-dom';
import { demoPlays } from '../../data/demoData';
import type { Play, PlayPlayer } from '../../types';
import './PlayBuilder.css';

type Tool = 'select' | 'pan' | 'route-solid' | 'route-dashed' | 'route-dotted' | 'arrow' | 'eraser';

const tools: { id: Tool; icon: string; label: string }[] = [
    { id: 'select', icon: '👆', label: 'Select' },
    { id: 'pan', icon: '✋', label: 'Pan' },
    { id: 'route-solid', icon: '━', label: 'Solid Route' },
    { id: 'route-dashed', icon: '┄', label: 'Dashed Route' },
    { id: 'route-dotted', icon: '⋯', label: 'Dotted Route' },
    { id: 'arrow', icon: '➜', label: 'Arrow' },
    { id: 'eraser', icon: '🧹', label: 'Eraser' },
];

export function PlayBuilder() {
    const { playId } = useParams();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const isViewOnly = searchParams.get('view') === 'true' || window.innerWidth < 768;

    const existingPlay = playId ? demoPlays.find(p => p.id === playId) : null;
    const [play, setPlay] = useState<Play>(existingPlay || {
        id: 'new',
        name: 'New Play',
        phase: 'offense',
        status: 'draft',
        formation: '',
        tags: [],
        routes: [],
        coverages: [],
        coachingPoints: [],
        conditionals: [],
        optionRoutes: [],
        players: [
            { id: 'qb', position: 'QB', x: 50, y: 75 },
            { id: 'wr1', position: 'WR', x: 10, y: 65 },
            { id: 'wr2', position: 'WR', x: 90, y: 65 },
            { id: 'rb', position: 'RB', x: 50, y: 65 },
            { id: 'te', position: 'TE', x: 70, y: 70 },
        ],
        createdAt: new Date(),
        updatedAt: new Date()
    });

    const [activeTool, setActiveTool] = useState<Tool>('select');
    const [selectedPlayer, setSelectedPlayer] = useState<PlayPlayer | null>(null);
    const [showSidebar, setShowSidebar] = useState(true);
    const [zoom, setZoom] = useState(1);
    const canvasRef = useRef<HTMLDivElement>(null);
    const [drawnRoutes, setDrawnRoutes] = useState<{ id: string; points: { x: number; y: number }[]; style: string }[]>([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [currentRoute, setCurrentRoute] = useState<{ x: number; y: number }[]>([]);

    // Autosave simulation
    const [lastSaved, setLastSaved] = useState<Date>(new Date());

    useEffect(() => {
        const interval = setInterval(() => {
            setLastSaved(new Date());
        }, 30000);
        return () => clearInterval(interval);
    }, []);

    const handlePlayerDrag = (playerId: string, newX: number, newY: number) => {
        if (isViewOnly) return;

        setPlay(prev => ({
            ...prev,
            players: prev.players.map(p =>
                p.id === playerId ? { ...p, x: Math.max(0, Math.min(100, newX)), y: Math.max(0, Math.min(100, newY)) } : p
            )
        }));
    };

    const handleCanvasMouseDown = (e: MouseEvent) => {
        if (isViewOnly) return;
        if (activeTool.startsWith('route-')) {
            const rect = canvasRef.current?.getBoundingClientRect();
            if (!rect) return;

            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;

            setIsDrawing(true);
            setCurrentRoute([{ x, y }]);
        }
    };

    const handleCanvasMouseMove = (e: MouseEvent) => {
        if (!isDrawing || isViewOnly) return;

        const rect = canvasRef.current?.getBoundingClientRect();
        if (!rect) return;

        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        setCurrentRoute(prev => [...prev, { x, y }]);
    };

    const handleCanvasMouseUp = () => {
        if (isDrawing && currentRoute.length > 1) {
            const style = activeTool.replace('route-', '');
            setDrawnRoutes(prev => [...prev, {
                id: `route-${Date.now()}`,
                points: currentRoute,
                style
            }]);
        }
        setIsDrawing(false);
        setCurrentRoute([]);
    };

    const undo = () => {
        if (drawnRoutes.length > 0) {
            setDrawnRoutes(prev => prev.slice(0, -1));
        }
    };

    const redo = () => {
        // Implement redo functionality
    };

    const fitToScreen = () => {
        setZoom(1);
    };

    if (isViewOnly && window.innerWidth < 768) {
        return (
            <div className="play-builder-mobile animate-fade-in">
                <div className="mobile-notice">
                    <div className="notice-icon">📱</div>
                    <h2>View Only Mode</h2>
                    <p>Editing requires a larger screen. Use a tablet or desktop to edit this play.</p>
                </div>

                <div className="play-view-card card">
                    <h3>{play.name}</h3>
                    <p className="formation">{play.formation}</p>

                    <div className="mini-canvas">
                        <div className="field-bg">
                            {play.players.map(player => (
                                <div
                                    key={player.id}
                                    className={`player-token ${play.phase}`}
                                    style={{ left: `${player.x}%`, top: `${player.y}%` }}
                                >
                                    {player.position}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="coaching-points">
                        <h4>Coaching Points</h4>
                        <ul>
                            {play.coachingPoints.map((point, i) => (
                                <li key={i}>{point}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <button className="btn btn-secondary w-full" onClick={() => navigate(-1)}>
                    Back to Plays
                </button>
            </div>
        );
    }

    return (
        <div className="play-builder animate-fade-in">
            {/* Left Sidebar - Plays List */}
            <aside className={`builder-sidebar ${showSidebar ? 'open' : 'collapsed'}`}>
                <div className="sidebar-toggle" onClick={() => setShowSidebar(!showSidebar)}>
                    {showSidebar ? '◀' : '▶'}
                </div>
                {showSidebar && (
                    <>
                        <h3>Plays</h3>
                        <div className="plays-mini-list">
                            {demoPlays.map(p => (
                                <div
                                    key={p.id}
                                    className={`play-mini-item ${p.id === play.id ? 'active' : ''}`}
                                    onClick={() => navigate(`/coach/plays/${p.id}`)}
                                >
                                    <span className="play-mini-name">{p.name}</span>
                                    <span className={`phase-dot ${p.phase}`}></span>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </aside>

            {/* Main Canvas Area */}
            <main className="builder-main">
                <div className="builder-toolbar">
                    <div className="toolbar-group">
                        {tools.map(tool => (
                            <button
                                key={tool.id}
                                className={`tool-btn ${activeTool === tool.id ? 'active' : ''}`}
                                onClick={() => setActiveTool(tool.id)}
                                title={tool.label}
                            >
                                {tool.icon}
                            </button>
                        ))}
                    </div>

                    <div className="toolbar-group">
                        <button className="tool-btn" onClick={undo} title="Undo">↩️</button>
                        <button className="tool-btn" onClick={redo} title="Redo">↪️</button>
                    </div>

                    <div className="toolbar-group">
                        <button className="tool-btn" onClick={() => setZoom(z => Math.min(2, z + 0.1))} title="Zoom In">🔍+</button>
                        <button className="tool-btn" onClick={() => setZoom(z => Math.max(0.5, z - 0.1))} title="Zoom Out">🔍-</button>
                        <button className="tool-btn" onClick={fitToScreen} title="Fit to Screen">⊡</button>
                    </div>

                    <div className="toolbar-spacer"></div>

                    <div className="autosave-indicator">
                        <span className="save-dot"></span>
                        Saved {lastSaved.toLocaleTimeString()}
                    </div>
                </div>

                <div
                    className="canvas-container"
                    ref={canvasRef}
                    onMouseDown={handleCanvasMouseDown}
                    onMouseMove={handleCanvasMouseMove}
                    onMouseUp={handleCanvasMouseUp}
                    onMouseLeave={handleCanvasMouseUp}
                    style={{ transform: `scale(${zoom})` }}
                >
                    <div className="football-field">
                        {/* Yard lines */}
                        {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(yard => (
                            <div key={yard} className="yard-line" style={{ top: `${yard}%` }}>
                                {yard > 0 && yard < 100 && (
                                    <span className="yard-number">{yard <= 50 ? yard : 100 - yard}</span>
                                )}
                            </div>
                        ))}

                        {/* Hash marks */}
                        <div className="hash-marks left"></div>
                        <div className="hash-marks right"></div>

                        {/* Drawn routes */}
                        <svg className="routes-layer">
                            {drawnRoutes.map(route => (
                                <path
                                    key={route.id}
                                    d={`M ${route.points.map(p => `${p.x} ${p.y}`).join(' L ')}`}
                                    className={`route-path ${route.style}`}
                                    fill="none"
                                />
                            ))}
                            {isDrawing && currentRoute.length > 0 && (
                                <path
                                    d={`M ${currentRoute.map(p => `${p.x} ${p.y}`).join(' L ')}`}
                                    className={`route-path ${activeTool.replace('route-', '')} drawing`}
                                    fill="none"
                                />
                            )}
                        </svg>

                        {/* Players */}
                        {play.players.map(player => (
                            <div
                                key={player.id}
                                className={`player-token ${play.phase} ${selectedPlayer?.id === player.id ? 'selected' : ''}`}
                                style={{
                                    left: `${player.x}%`,
                                    top: `${player.y}%`,
                                    cursor: activeTool === 'select' ? 'move' : 'default'
                                }}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    if (activeTool === 'select') {
                                        setSelectedPlayer(player);
                                    }
                                }}
                                draggable={activeTool === 'select' && !isViewOnly}
                                onDragEnd={(e) => {
                                    const rect = canvasRef.current?.getBoundingClientRect();
                                    if (!rect) return;
                                    const x = ((e.clientX - rect.left) / rect.width) * 100;
                                    const y = ((e.clientY - rect.top) / rect.height) * 100;
                                    handlePlayerDrag(player.id, x, y);
                                }}
                            >
                                {player.position}
                            </div>
                        ))}
                    </div>
                </div>
            </main>

            {/* Right Inspector Panel */}
            <aside className="builder-inspector">
                <div className="inspector-header">
                    <input
                        type="text"
                        className="input play-name-input"
                        value={play.name}
                        onChange={e => setPlay({ ...play, name: e.target.value })}
                        placeholder="Play Name"
                    />
                    <select
                        className="input"
                        value={play.phase}
                        onChange={e => setPlay({ ...play, phase: e.target.value as any })}
                    >
                        <option value="offense">Offense</option>
                        <option value="defense">Defense</option>
                        <option value="special">Special Teams</option>
                    </select>
                </div>

                {selectedPlayer ? (
                    <div className="player-inspector animate-fade-in">
                        <h4>
                            {selectedPlayer.position} Assignment
                            <button className="close-inspector" onClick={() => setSelectedPlayer(null)}>×</button>
                        </h4>

                        <div className="inspector-field">
                            <label>Assignment Type</label>
                            <select className="input">
                                <option value="route">Route</option>
                                <option value="block">Block</option>
                                <option value="coverage">Coverage</option>
                            </select>
                        </div>

                        <div className="inspector-field">
                            <label>Route Type</label>
                            <select className="input">
                                <option value="">Select route...</option>
                                <option value="slant">Slant</option>
                                <option value="out">Out</option>
                                <option value="curl">Curl</option>
                                <option value="post">Post</option>
                                <option value="corner">Corner</option>
                                <option value="seam">Seam</option>
                            </select>
                        </div>

                        <div className="inspector-field">
                            <label>Depth (yards)</label>
                            <input type="number" className="input" placeholder="10" />
                        </div>

                        <div className="inspector-field">
                            <label>Technique Notes</label>
                            <textarea className="input" rows={2} placeholder="Release inside, stem to corner..."></textarea>
                        </div>

                        <div className="inspector-field">
                            <label>Coaching Points</label>
                            <textarea className="input" rows={3} placeholder="Key coaching points for this assignment..."></textarea>
                        </div>

                        <div className="inspector-section">
                            <h5>Conditionals</h5>
                            <div className="conditional-item">
                                <input className="input" placeholder="If defense shows..." />
                                <input className="input" placeholder="Then do..." />
                            </div>
                            <button className="btn btn-secondary btn-sm">+ Add Conditional</button>
                        </div>

                        <div className="inspector-section">
                            <h5>Option Routes</h5>
                            <div className="option-route-preview">
                                <span className="read-label">LB Read:</span>
                                <div className="options">
                                    <span className="option">Sit</span>
                                    <span className="option">Continue</span>
                                </div>
                            </div>
                            <button className="btn btn-secondary btn-sm">+ Add Option Route</button>
                        </div>
                    </div>
                ) : (
                    <div className="play-inspector">
                        <div className="inspector-field">
                            <label>Formation</label>
                            <input
                                type="text"
                                className="input"
                                value={play.formation}
                                onChange={e => setPlay({ ...play, formation: e.target.value })}
                                placeholder="e.g., Shotgun Trips"
                            />
                        </div>

                        <div className="inspector-field">
                            <label>Tags</label>
                            <div className="tags-input">
                                {play.tags.map(tag => (
                                    <span key={tag} className="chip">
                                        {tag}
                                        <button onClick={() => setPlay({ ...play, tags: play.tags.filter(t => t !== tag) })}>×</button>
                                    </span>
                                ))}
                                <input
                                    className="input tag-input"
                                    placeholder="Add tag..."
                                    onKeyDown={e => {
                                        if (e.key === 'Enter' && e.currentTarget.value) {
                                            setPlay({ ...play, tags: [...play.tags, e.currentTarget.value] });
                                            e.currentTarget.value = '';
                                        }
                                    }}
                                />
                            </div>
                        </div>

                        <div className="inspector-field">
                            <label>Coaching Points</label>
                            {play.coachingPoints.map((point, i) => (
                                <div key={i} className="coaching-point-row">
                                    <span className="point-number">{i + 1}</span>
                                    <input
                                        type="text"
                                        className="input"
                                        value={point}
                                        onChange={e => {
                                            const newPoints = [...play.coachingPoints];
                                            newPoints[i] = e.target.value;
                                            setPlay({ ...play, coachingPoints: newPoints });
                                        }}
                                    />
                                </div>
                            ))}
                            <button
                                className="btn btn-secondary btn-sm"
                                onClick={() => setPlay({ ...play, coachingPoints: [...play.coachingPoints, ''] })}
                            >
                                + Add Point
                            </button>
                        </div>

                        <div className="inspector-field">
                            <label>Status</label>
                            <select
                                className="input"
                                value={play.status}
                                onChange={e => setPlay({ ...play, status: e.target.value as any })}
                            >
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>
                    </div>
                )}

                <div className="inspector-actions">
                    <button className="btn btn-secondary" onClick={() => navigate('/coach/plays')}>
                        Cancel
                    </button>
                    <button className="btn btn-primary">
                        {play.id === 'new' ? 'Create Play' : 'Save Changes'}
                    </button>
                </div>
            </aside>
        </div>
    );
}
