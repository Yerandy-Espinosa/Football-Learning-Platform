import React, { useState, useEffect, useCallback } from 'react';
import { demoPlays } from '../../data/demoData';
import { useGame, SCORING } from '../../context/GameContext';
import './PlayerPages.css';

export function GameReadyMode() {
    const { addPoints } = useGame();
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentPlay, setCurrentPlay] = useState(demoPlays[0]);
    const [timer, setTimer] = useState(5000);
    const [targetPlayer, setTargetPlayer] = useState<string | null>(null);
    const [showResult, setShowResult] = useState(false);
    const [reactionTime, setReactionTime] = useState(0);
    const [startTime, setStartTime] = useState(0);
    const [score, setScore] = useState(0);
    const [round, setRound] = useState(0);
    const [isCorrect, setIsCorrect] = useState(false);

    useEffect(() => {
        if (!isPlaying || showResult) return;
        const interval = setInterval(() => {
            setTimer(prev => prev <= 0 ? 0 : prev - 100);
        }, 100);
        return () => clearInterval(interval);
    }, [isPlaying, showResult]);

    useEffect(() => {
        if (isPlaying && !targetPlayer && !showResult) {
            const players = currentPlay.players;
            const randomTarget = players[Math.floor(Math.random() * players.length)];
            setTargetPlayer(randomTarget.id);
            setStartTime(Date.now());
        }
    }, [isPlaying, targetPlayer, showResult, currentPlay]);

    const handlePlayerClick = (playerId: string) => {
        if (!isPlaying || showResult) return;
        const reaction = (Date.now() - startTime) / 1000;
        setReactionTime(reaction);
        const correct = playerId === targetPlayer;
        setIsCorrect(correct);
        if (correct) {
            const speedBonus = Math.max(0, Math.floor((2 - reaction) * 10));
            addPoints(SCORING.GAME_READY_CORRECT + speedBonus, 'Game Ready');
            setScore(prev => prev + SCORING.GAME_READY_CORRECT + speedBonus);
        }
        setShowResult(true);
    };

    const startGame = () => {
        setIsPlaying(true);
        setTimer(5000);
        setTargetPlayer(null);
        setShowResult(false);
        setRound(1);
        setScore(0);
    };

    const nextRound = () => {
        const idx = demoPlays.findIndex(p => p.id === currentPlay.id);
        setCurrentPlay(demoPlays[(idx + 1) % demoPlays.length]);
        setTimer(5000);
        setTargetPlayer(null);
        setShowResult(false);
        setRound(prev => prev + 1);
    };

    if (!isPlaying) {
        return (
            <div className="game-ready-mode animate-fade-in">
                <div className="page-header"><h1>Game Ready</h1></div>
                <div className="start-screen card" style={{ textAlign: 'center', padding: 48 }}>
                    <div style={{ fontSize: 64 }}>⚡</div>
                    <h2>Ready to Test Your Speed?</h2>
                    <p className="text-secondary">React fast under pressure!</p>
                    <button className="btn btn-primary btn-lg" onClick={startGame}>Start</button>
                </div>
            </div>
        );
    }

    return (
        <div className="game-ready-mode animate-fade-in">
            <div className="game-ready-header">
                <span className="badge badge-accent">Round {round}</span>
                <span>Score: <strong className="text-success">{score}</strong></span>
                <span className={`timer ${timer <= 1000 ? 'danger' : timer <= 2000 ? 'warning' : ''}`}>
                    {(timer / 1000).toFixed(1)}s
                </span>
            </div>
            <div className="game-field">
                {currentPlay.players.map(player => (
                    <div key={player.id} className={`animated-dot ${player.id === targetPlayer ? 'target' : ''}`}
                        style={{ left: `${player.x}%`, top: `${player.y}%` }}
                        onClick={() => handlePlayerClick(player.id)}>{player.position}</div>
                ))}
            </div>
            {showResult && (
                <div className={`feedback-card ${isCorrect ? 'correct' : 'incorrect'}`}>
                    <span>{isCorrect ? '⚡ Fast!' : '❌ Try again'}</span>
                    <span className="reaction-time">{reactionTime.toFixed(2)}s</span>
                    <button className="btn btn-primary" onClick={nextRound}>Next</button>
                </div>
            )}
        </div>
    );
}
