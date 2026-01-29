// User Types
export type UserRole = 'coach' | 'player';
export type Position = 'QB' | 'WR' | 'LB' | 'RB' | 'TE' | 'OL' | 'DL' | 'CB' | 'S';

export interface Player {
  id: string;
  name: string;
  position: Position;
  avatar?: string;
  stats: PlayerStats;
}

export interface PlayerStats {
  points: number;
  streak: number;
  bestStreak: number;
  mastery: number;
  accuracy: number;
  reactionTime: number;
  sessionsCompleted: number;
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
}

// Play Types
export type PlayPhase = 'offense' | 'defense' | 'special';
export type PlayStatus = 'draft' | 'published';

export interface Play {
  id: string;
  name: string;
  phase: PlayPhase;
  status: PlayStatus;
  formation: string;
  thumbnail?: string;
  tags: string[];
  routes: Route[];
  coverages: Coverage[];
  coachingPoints: string[];
  conditionals: Conditional[];
  optionRoutes: OptionRoute[];
  players: PlayPlayer[];
  createdAt: Date;
  updatedAt: Date;
}

export interface PlayPlayer {
  id: string;
  position: Position;
  x: number;
  y: number;
  assignment?: Assignment;
}

export interface Assignment {
  type: 'route' | 'block' | 'coverage';
  routeType?: string;
  depth?: number;
  technique?: string;
  notes?: string;
}

export interface Route {
  id: string;
  name: string;
  path: { x: number; y: number }[];
  style: 'solid' | 'dashed' | 'dotted';
}

export interface Coverage {
  id: string;
  name: string;
  zones: { x: number; y: number; width: number; height: number }[];
}

export interface Conditional {
  id: string;
  condition: string;
  action: string;
}

export interface OptionRoute {
  id: string;
  readType: string;
  options: { name: string; path: { x: number; y: number }[] }[];
}

// Dictionary Types
export type DictionaryCategory = 'routes' | 'coverages' | 'formations' | 'blitzes' | 'protections' | 'concepts';

export interface DictionaryEntry {
  id: string;
  name: string;
  category: DictionaryCategory;
  description: string;
  aliases: string[];
  diagram?: string;
}

// Learning Types
export type QuestionType = 'multiple-choice' | 'typed-recall' | 'redraw';

export interface Question {
  id: string;
  playId: string;
  type: QuestionType;
  prompt: string;
  options?: string[];
  correctAnswer: string;
  coachingPoint: string;
}

export interface Answer {
  questionId: string;
  answer: string;
  correct: boolean;
  partial: boolean;
  reactionTime: number;
  timestamp: Date;
}

export interface Session {
  id: string;
  playerId: string;
  type: 'learn' | 'practice' | 'game-ready' | 'daily-review';
  answers: Answer[];
  pointsEarned: number;
  startedAt: Date;
  completedAt?: Date;
}

// Leaderboard Types
export type LeaderboardType = 'points' | 'accuracy' | 'performance' | 'mostImproved' | 'streak' | 'reaction_time';

export interface LeaderboardEntry {
  playerId: string;
  playerName: string;
  position: Position;
  value: number;
  rank: number;
  change?: number;
}

export interface LeaderboardSettings {
  enabled: boolean;
  anonymous: boolean;
  scope: 'team' | 'position';
  types: LeaderboardType[];
}

// Analytics Types
export interface PlayerAnalytics {
  masteryByPlay: { playId: string; playName: string; mastery: number }[];
  masteryByConcept: { concept: string; mastery: number }[];
  accuracyByMode: { mode: string; accuracy: number }[];
  reactionTimeHistory: { date: string; avgTime: number }[];
  strengths: string[];
  weaknesses: string[];
}

export interface TeamAnalytics {
  overallMastery: number;
  masteryByPosition: { position: Position; mastery: number }[];
  lowestMasteryPlays: { playId: string; playName: string; mastery: number }[];
  playersNotStudying: { playerId: string; playerName: string; lastActive: Date }[];
}
