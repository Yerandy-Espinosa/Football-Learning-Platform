import React, { useState } from 'react';
import { demoPlays, demoQuestions } from '../../data/demoData';
import { useGame, SCORING } from '../../context/GameContext';
import './PlayerPages.css';

type PracticeType = 'typed' | 'redraw';

export function PracticeMode() {
    const { addPoints } = useGame();
    const [practiceType, setPracticeType] = useState<PracticeType>('typed');
    const [currentPlay, setCurrentPlay] = useState(demoPlays[0]);
    const [userAnswer, setUserAnswer] = useState('');
    const [showResult, setShowResult] = useState(false);
    const [resultType, setResultType] = useState<'correct' | 'partial' | 'incorrect'>('correct');
    const [drawnPoints, setDrawnPoints] = useState<{ x: number; y: number }[]>([]);
    const [isDrawing, setIsDrawing] = useState(false);
    const [accuracy, setAccuracy] = useState(0);

    const question = demoQuestions.find(q => q.playId === currentPlay.id && q.type === 'typed-recall') || {
        prompt: `In ${currentPlay.name}, what is the ${currentPlay.phase === 'offense' ? 'progression read' : 'coverage responsibility'}?`,
        correctAnswer: 'MLB',
        coachingPoint: currentPlay.coachingPoints[0]
    };

    const handleTypedSubmit = () => {
        const normalized = userAnswer.trim().toLowerCase();
        const correct = question.correctAnswer.toLowerCase();

        if (normalized === correct) {
            setResultType('correct');
            addPoints(SCORING.PRACTICE_CORRECT, 'Correct typed recall');
        } else if (correct.includes(normalized) || normalized.includes(correct.substring(0, 2))) {
            setResultType('partial');
            addPoints(SCORING.PRACTICE_PARTIAL, 'Partial typed recall');
        } else {
            setResultType('incorrect');
        }
        setShowResult(true);
    };

    const handleCanvasMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        setIsDrawing(true);
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setDrawnPoints([{ x, y }]);
    };

    const handleCanvasMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isDrawing) return;
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;
        setDrawnPoints(prev => [...prev, { x, y }]);
    };

    const handleCanvasMouseUp = () => {
        setIsDrawing(false);
    };

    const handleRedrawSubmit = () => {
        // Simulate accuracy calculation
        const simulatedAccuracy = Math.floor(Math.random() * 30) + 70; // 70-100%
        setAccuracy(simulatedAccuracy);

        if (simulatedAccuracy >= 80) {
            addPoints(SCORING.REDRAW_SUCCESS, 'Accurate route redraw');
        }
        setShowResult(true);
    };

    const handleNext = () => {
        const currentIndex = demoPlays.findIndex(p => p.id === currentPlay.id);
        const nextPlay = demoPlays[(currentIndex + 1) % demoPlays.length];
        setCurrentPlay(nextPlay);
        setUserAnswer('');
        setShowResult(false);
        setDrawnPoints([]);
        setAccuracy(0);
    };

    return (
        <div className="practice-mode animate-fade-in">
            <div className="page-header">
                <h1>Practice Mode</h1>
                <p className="page-subtitle">Test your knowledge without hints</p>
            </div>

            <div className="mode-selector">
                <div
                    className={`mode-card card card-hover ${practiceType === 'typed' ? 'active' : ''}`}
                    onClick={() => { setPracticeType('typed'); setShowResult(false); }}
                >
                    <div className="mode-icon">⌨️</div>
                    <h3>Typed Recall</h3>
                    <p className="text-secondary">Type your answer</p>
                </div>
                <div
                    className={`mode-card card card-hover ${practiceType === 'redraw' ? 'active' : ''}`}
                    onClick={() => { setPracticeType('redraw'); setShowResult(false); }}
                >
                    <div className="mode-icon">✏️</div>
                    <h3>Redraw</h3>
                    <p className="text-secondary">Draw the route</p>
                </div>
            </div>

            <div className="practice-card card">
                <h2>{currentPlay.name}</h2>
                <p className="text-secondary" style={{ marginBottom: 'var(--spacing-lg)' }}>{currentPlay.formation}</p>

                {practiceType === 'typed' ? (
                    <div className="typed-recall-area">
                        <p className="prompt">{question.prompt}</p>
                        <textarea
                            className="input"
                            placeholder="Type your answer..."
                            value={userAnswer}
                            onChange={e => setUserAnswer(e.target.value)}
                            disabled={showResult}
                        />

                        {!showResult ? (
                            <button
                                className="btn btn-primary btn-lg w-full"
                                style={{ marginTop: 'var(--spacing-md)' }}
                                onClick={handleTypedSubmit}
                                disabled={!userAnswer.trim()}
                            >
                                Submit Answer
                            </button>
                        ) : (
                            <div className={`feedback-card ${resultType} animate-slide-up`} style={{ marginTop: 'var(--spacing-lg)' }}>
                                <div className="feedback-header">
                                    <span className="feedback-icon">
                                        {resultType === 'correct' ? '✅' : resultType === 'partial' ? '🟡' : '❌'}
                                    </span>
                                    <span>
                                        {resultType === 'correct' ? 'Correct!' :
                                            resultType === 'partial' ? 'Partially correct' : 'Not quite'}
                                    </span>
                                    <span className="points-earned">
                                        +{resultType === 'correct' ? SCORING.PRACTICE_CORRECT :
                                            resultType === 'partial' ? SCORING.PRACTICE_PARTIAL : 0} pts
                                    </span>
                                </div>
                                <p style={{ marginTop: 'var(--spacing-sm)' }}>
                                    <strong>Answer:</strong> {question.correctAnswer}
                                </p>
                                <div className="coaching-point">
                                    <strong>💡 Coaching Point:</strong> {question.coachingPoint}
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="redraw-area">
                        <p style={{ marginBottom: 'var(--spacing-md)' }}>
                            Draw the route for your position on this play:
                        </p>

                        <div
                            className="drawing-canvas"
                            onMouseDown={handleCanvasMouseDown}
                            onMouseMove={handleCanvasMouseMove}
                            onMouseUp={handleCanvasMouseUp}
                            onMouseLeave={handleCanvasMouseUp}
                        >
                            {drawnPoints.length === 0 && !showResult && (
                                <div className="canvas-instructions">
                                    <span style={{ fontSize: 48 }}>✏️</span>
                                    <p>Click and drag to draw</p>
                                </div>
                            )}

                            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none' }}>
                                {drawnPoints.length > 1 && (
                                    <path
                                        d={`M ${drawnPoints.map(p => `${p.x} ${p.y}`).join(' L ')}`}
                                        fill="none"
                                        stroke="var(--color-chalk)"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />
                                )}
                            </svg>

                            {/* Show players */}
                            {currentPlay.players.slice(0, 3).map(player => (
                                <div
                                    key={player.id}
                                    className="animated-dot"
                                    style={{ left: `${player.x}%`, top: `${player.y}%` }}
                                >
                                    {player.position}
                                </div>
                            ))}
                        </div>

                        {!showResult ? (
                            <button
                                className="btn btn-primary btn-lg w-full"
                                style={{ marginTop: 'var(--spacing-md)' }}
                                onClick={handleRedrawSubmit}
                                disabled={drawnPoints.length < 5}
                            >
                                Submit Drawing
                            </button>
                        ) : (
                            <div className="accuracy-result animate-slide-up">
                                <div className={`accuracy-score ${accuracy >= 80 ? 'text-success' : accuracy >= 60 ? 'text-warning' : 'text-error'}`}>
                                    {accuracy}%
                                </div>
                                <p>Accuracy</p>
                                {accuracy >= 80 && (
                                    <p className="text-success">+{SCORING.REDRAW_SUCCESS} pts earned!</p>
                                )}
                            </div>
                        )}
                    </div>
                )}

                {showResult && (
                    <button
                        className="btn btn-accent btn-lg w-full"
                        style={{ marginTop: 'var(--spacing-lg)' }}
                        onClick={handleNext}
                    >
                        Next Play
                    </button>
                )}
            </div>
        </div>
    );
}
