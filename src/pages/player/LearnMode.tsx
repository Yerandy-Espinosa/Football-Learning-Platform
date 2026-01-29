import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { demoPlays, demoQuestions } from '../../data/demoData';
import { useGame, SCORING } from '../../context/GameContext';
import { useAuth } from '../../context/AuthContext';
import './PlayerPages.css';

export function LearnMode() {
    const { playId } = useParams();
    const navigate = useNavigate();
    const { addPoints } = useGame();
    const { currentPlayer } = useAuth();

    const play = demoPlays.find(p => p.id === playId);
    const questions = demoQuestions.filter(q => q.playId === playId);

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const [isCorrect, setIsCorrect] = useState(false);

    if (!play) {
        return (
            <div className="learn-mode animate-fade-in">
                <div className="empty-state">
                    <h2>Play not found</h2>
                    <button className="btn btn-primary" onClick={() => navigate('/player/plays')}>
                        Back to Plays
                    </button>
                </div>
            </div>
        );
    }

    const question = questions[currentQuestion] || {
        prompt: 'What is the primary read on this play?',
        options: ['Option A', 'Option B', 'Option C', 'Option D'],
        correctAnswer: 'Option A',
        coachingPoint: play.coachingPoints[0] || 'Focus on your assignment first.'
    };

    const handleAnswer = (answer: string) => {
        if (showFeedback) return;

        setSelectedAnswer(answer);
        const correct = answer === question.correctAnswer;
        setIsCorrect(correct);
        setShowFeedback(true);

        if (correct) {
            addPoints(SCORING.LEARN_CORRECT, 'Correct answer in Learn mode');
        }
    };

    const handleNext = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(prev => prev + 1);
            setSelectedAnswer(null);
            setShowFeedback(false);
        } else {
            navigate('/player/plays');
        }
    };

    return (
        <div className="learn-mode animate-fade-in">
            <div className="learn-header">
                <div className="learn-progress">
                    {questions.map((_, i) => (
                        <div
                            key={i}
                            className={`progress-dot ${i < currentQuestion ? 'completed' :
                                i === currentQuestion ? 'current' : ''
                                }`}
                        />
                    ))}
                </div>
                <h1>{play.name}</h1>
                <p className="page-subtitle">{play.formation}</p>
            </div>

            <div className="learn-card card">
                {/* Diagram */}
                <div className="diagram-container">
                    <div className="diagram-placeholder">
                        <span>📋</span>
                        <p>Play Diagram</p>
                        <p className="text-secondary">{play.formation}</p>
                    </div>
                </div>

                {/* Assignment Summary */}
                <div className="assignment-summary">
                    <div className="position-highlight">
                        🏈 {currentPlayer?.position || 'QB'}
                    </div>
                    <p>{play.coachingPoints[0]}</p>
                </div>

                {/* Question */}
                <div className="question-section">
                    <p className="question-text">{question.prompt}</p>
                    <div className="options-list">
                        {question.options?.map((option, i) => (
                            <button
                                key={i}
                                className={`option-btn ${selectedAnswer === option ? 'selected' : ''
                                    } ${showFeedback && option === question.correctAnswer ? 'correct' : ''
                                    } ${showFeedback && selectedAnswer === option && !isCorrect ? 'incorrect' : ''
                                    }`}
                                onClick={() => handleAnswer(option)}
                                disabled={showFeedback}
                            >
                                {option}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Feedback */}
                {showFeedback && (
                    <div className={`feedback-card ${isCorrect ? 'correct' : 'incorrect'} animate-slide-up`}>
                        <div className="feedback-header">
                            <span className="feedback-icon">{isCorrect ? '✅' : '❌'}</span>
                            <span className="feedback-text">
                                {isCorrect ? 'Correct!' : 'Not quite right'}
                            </span>
                            {isCorrect && (
                                <span className="points-earned">+{SCORING.LEARN_CORRECT} pts</span>
                            )}
                        </div>
                        <div className="coaching-point">
                            <strong>💡 Coaching Point:</strong> {question.coachingPoint}
                        </div>
                    </div>
                )}
            </div>

            {/* Actions */}
            <div className="learn-actions" style={{ display: 'flex', gap: 'var(--spacing-md)', marginTop: 'var(--spacing-lg)' }}>
                <button className="btn btn-secondary" onClick={() => navigate('/player/plays')}>
                    Exit
                </button>
                {showFeedback && (
                    <button className="btn btn-primary btn-lg" style={{ flex: 1 }} onClick={handleNext}>
                        {currentQuestion < questions.length - 1 ? 'Next Question' : 'Complete'}
                    </button>
                )}
            </div>
        </div>
    );
}
