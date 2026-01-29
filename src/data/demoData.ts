import type { Play, Player, DictionaryEntry, TeamAnalytics, PlayerAnalytics, LeaderboardEntry, LeaderboardType } from '../types/index';

// Demo Players
export const demoPlayers: Player[] = [
    {
        id: 'marcus',
        name: 'Marcus',
        position: 'QB',
        stats: {
            points: 2450,
            streak: 7,
            bestStreak: 12,
            mastery: 78,
            accuracy: 85,
            reactionTime: 1.2,
            sessionsCompleted: 45,
            achievements: [
                { id: 'perfect-week', name: 'Perfect Week', description: 'Complete daily reviews for 7 days straight', icon: '🔥' },
                { id: 'accuracy-master', name: 'Accuracy Master', description: 'Achieve 90% accuracy in any mode', icon: '🎯' },
            ]
        }
    },
    {
        id: 'jayden',
        name: 'Jayden',
        position: 'WR',
        stats: {
            points: 1890,
            streak: 3,
            bestStreak: 8,
            mastery: 72,
            accuracy: 79,
            reactionTime: 1.4,
            sessionsCompleted: 38,
            achievements: [
                { id: 'game-ready', name: 'Game Ready Specialist', description: 'Complete 50 Game Ready sessions', icon: '⚡' },
            ]
        }
    },
    {
        id: 'devin',
        name: 'Devin',
        position: 'LB',
        stats: {
            points: 2180,
            streak: 5,
            bestStreak: 10,
            mastery: 81,
            accuracy: 88,
            reactionTime: 1.1,
            sessionsCompleted: 52,
            achievements: [
                { id: 'perfect-week', name: 'Perfect Week', description: 'Complete daily reviews for 7 days straight', icon: '🔥' },
                { id: 'most-improved', name: 'Most Improved', description: 'Improve mastery by 20% in one week', icon: '📈' },
            ]
        }
    }
];

// Demo Plays
export const demoPlays: Play[] = [
    {
        id: 'play-1',
        name: 'Mesh Concept',
        phase: 'offense',
        status: 'published',
        formation: 'Shotgun Trips',
        tags: ['passing', 'short', 'high-percentage'],
        routes: [
            { id: 'r1', name: 'Shallow Cross', path: [{ x: 10, y: 65 }, { x: 50, y: 55 }, { x: 90, y: 50 }], style: 'solid' },
            { id: 'r2', name: 'Shallow Cross', path: [{ x: 90, y: 65 }, { x: 50, y: 50 }, { x: 10, y: 55 }], style: 'solid' },
            { id: 'r3', name: 'Post', path: [{ x: 25, y: 65 }, { x: 30, y: 40 }, { x: 45, y: 10 }], style: 'solid' },
            { id: 'r4', name: 'Wheel', path: [{ x: 45, y: 70 }, { x: 80, y: 70 }, { x: 80, y: 20 }], style: 'solid' },
            { id: 'r5', name: 'Streak', path: [{ x: 95, y: 65 }, { x: 95, y: 10 }], style: 'solid' }
        ],
        coverages: [],
        coachingPoints: [
            'WR1 runs shallow cross at 5 yards',
            'WR2 runs over route at 10-12 yards',
            'Look for the rub action between receivers',
            'Hot read: If blitz, throw to RB flat'
        ],
        conditionals: [
            { id: 'c1', condition: 'If Cover 2 zone', action: 'Work the soft spot between LBs' },
            { id: 'c2', condition: 'If man coverage', action: 'Look for natural picks in the mesh' }
        ],
        optionRoutes: [
            {
                id: 'opt1',
                readType: 'LB Read',
                options: [
                    { name: 'Sit', path: [{ x: 50, y: 30 }] },
                    { name: 'Continue', path: [{ x: 70, y: 30 }] }
                ]
            }
        ],
        players: [
            { id: 'qb', position: 'QB', x: 50, y: 80 },
            { id: 'wr1', position: 'WR', x: 10, y: 65 },
            { id: 'wr2', position: 'WR', x: 25, y: 65 },
            { id: 'wr3', position: 'WR', x: 90, y: 65 },
            { id: 'rb', position: 'RB', x: 45, y: 75 }, // Offset
            { id: 'wr4', position: 'WR', x: 95, y: 65 }
        ],
        createdAt: new Date('2024-01-15'),
        updatedAt: new Date('2024-01-20')
    },
    {
        id: 'play-2',
        name: 'Four Verticals',
        phase: 'offense',
        status: 'published',
        formation: 'Spread',
        tags: ['passing', 'deep', 'explosive'],
        routes: [
            { id: 'r1', name: 'Go', path: [{ x: 5, y: 65 }, { x: 5, y: 5 }], style: 'solid' },
            { id: 'r2', name: 'Seam', path: [{ x: 35, y: 65 }, { x: 35, y: 5 }], style: 'solid' },
            { id: 'r3', name: 'Seam', path: [{ x: 65, y: 65 }, { x: 65, y: 5 }], style: 'solid' },
            { id: 'r4', name: 'Go', path: [{ x: 95, y: 65 }, { x: 95, y: 5 }], style: 'solid' }
        ],
        coverages: [],
        coachingPoints: [
            'All 4 receivers run vertical routes',
            'QB reads safety rotation post-snap',
            'Attack single-high safety with seams',
            'Against Cover 2, hit the post between safeties'
        ],
        conditionals: [
            { id: 'c1', condition: 'If single high safety', action: 'Throw to the seam route away from safety' },
            { id: 'c2', condition: 'If Cover 2', action: 'Hit the post route between safeties' }
        ],
        optionRoutes: [],
        players: [
            { id: 'qb', position: 'QB', x: 50, y: 80 },
            { id: 'wr1', position: 'WR', x: 5, y: 65 },
            { id: 'wr2', position: 'WR', x: 35, y: 65 }, // Slot
            { id: 'wr3', position: 'WR', x: 65, y: 65 }, // Slot
            { id: 'wr4', position: 'WR', x: 95, y: 65 },
        ],
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-18')
    },
    {
        id: 'play-3',
        name: 'Power Run',
        phase: 'offense',
        status: 'published',
        formation: 'I-Formation',
        tags: ['run', 'power', 'goal-line'],
        routes: [
            { id: 'r-pull', name: 'Pull', path: [{ x: 40, y: 60 }, { x: 40, y: 65 }, { x: 60, y: 65 }, { x: 60, y: 55 }], style: 'solid' }, // Guard Pull
            { id: 'r-fb', name: 'Lead', path: [{ x: 50, y: 70 }, { x: 65, y: 55 }], style: 'dashed' }, // FB Block
            { id: 'r-rb', name: 'Run', path: [{ x: 50, y: 75 }, { x: 50, y: 70 }, { x: 60, y: 60 }, { x: 60, y: 20 }], style: 'solid' } // RB Path
        ],
        coverages: [],
        coachingPoints: [
            'Pulling guard leads through the hole',
            'FB kicks out the end man on LOS',
            'RB follows the FB, reads the block',
            'Backside tackle cuts off pursuit'
        ],
        conditionals: [
            { id: 'c1', condition: 'If defensive end crashes', action: 'Bounce outside' },
            { id: 'c2', condition: 'If LB fills fast', action: 'Cut back behind pulling guard' }
        ],
        optionRoutes: [],
        players: [
            { id: 'qb', position: 'QB', x: 50, y: 65 }, // Under center
            { id: 'fb', position: 'RB', x: 50, y: 70 },
            { id: 'rb', position: 'RB', x: 50, y: 75 },
            { id: 'lg', position: 'OL', x: 45, y: 60 }, // Left Guard
            // Simplified line
        ],
        createdAt: new Date('2024-01-12'),
        updatedAt: new Date('2024-01-19')
    },
    {
        id: 'play-4',
        name: 'Cover 3 Sky',
        phase: 'defense',
        status: 'published',
        formation: '4-3',
        tags: ['zone', 'coverage', 'run-support'],
        routes: [
            { id: 'def-ss', name: 'Buzz', path: [{ x: 70, y: 50 }, { x: 70, y: 65 }, { x: 80, y: 60 }], style: 'dashed' },
            { id: 'def-fs', name: 'Deep Middle', path: [{ x: 50, y: 35 }, { x: 50, y: 10 }], style: 'dashed' },
            { id: 'def-cb1', name: 'Deep 1/3', path: [{ x: 10, y: 55 }, { x: 10, y: 10 }], style: 'dashed' },
            { id: 'def-cb2', name: 'Deep 1/3', path: [{ x: 90, y: 55 }, { x: 90, y: 10 }], style: 'dashed' }
        ],
        coverages: [],
        coachingPoints: [
            'Strong safety rotates down into force',
            'CBs play deep thirds',
            'FS plays deep middle third',
            'LBs wall off crossers in underneath zones'
        ],
        conditionals: [
            { id: 'c1', condition: 'If offense motions to strong side', action: 'Bump coverage accordingly' },
            { id: 'c2', condition: 'If run action', action: 'SS triggers downhill' }
        ],
        optionRoutes: [],
        players: [
            { id: 'cb1', position: 'CB', x: 10, y: 55 },
            { id: 'cb2', position: 'CB', x: 90, y: 55 },
            { id: 'ss', position: 'S', x: 70, y: 50 },
            { id: 'fs', position: 'S', x: 50, y: 35 },
            { id: 'lb1', position: 'LB', x: 35, y: 55 },
            { id: 'lb2', position: 'LB', x: 50, y: 55 },
            { id: 'lb3', position: 'LB', x: 65, y: 55 },
        ],
        createdAt: new Date('2024-01-08'),
        updatedAt: new Date('2024-01-16')
    },
    {
        id: 'play-5',
        name: 'Tampa 2',
        phase: 'defense',
        status: 'published',
        formation: '4-3 Under',
        tags: ['zone', 'coverage', 'pass-defense'],
        routes: [
            { id: 'd-mlb', name: 'Deep Drop', path: [{ x: 50, y: 50 }, { x: 50, y: 30 }], style: 'dashed' },
            { id: 'd-s1', name: 'Deep Half', path: [{ x: 30, y: 35 }, { x: 25, y: 10 }], style: 'dashed' },
            { id: 'd-s2', name: 'Deep Half', path: [{ x: 70, y: 35 }, { x: 75, y: 10 }], style: 'dashed' }
        ],
        coverages: [],
        coachingPoints: [
            'MLB drops deep to cover the middle seam',
            'Both safeties split the field in half',
            'CBs jam and trail outside receivers',
            'OLBs cover flats and curl zones'
        ],
        conditionals: [
            { id: 'c1', condition: 'If TE releases vertical', action: 'MLB gets depth quickly' },
            { id: 'c2', condition: 'If quick out route', action: 'CB passes off to flat defender' }
        ],
        optionRoutes: [],
        players: [
            { id: 'cb1', position: 'CB', x: 10, y: 55 },
            { id: 'cb2', position: 'CB', x: 90, y: 55 },
            { id: 'ss', position: 'S', x: 70, y: 35 },
            { id: 'fs', position: 'S', x: 30, y: 35 },
            { id: 'mlb', position: 'LB', x: 50, y: 50 },
            { id: 'will', position: 'LB', x: 35, y: 55 },
            { id: 'sam', position: 'LB', x: 65, y: 55 },
        ],
        createdAt: new Date('2024-01-05'),
        updatedAt: new Date('2024-01-14')
    },
    {
        id: 'play-6',
        name: 'Zone Blitz Thunder',
        phase: 'defense',
        status: 'draft',
        formation: '3-4',
        tags: ['blitz', 'pressure', 'zone'],
        routes: [
            { id: 'd-olb1', name: 'Rush', path: [{ x: 15, y: 55 }, { x: 20, y: 70 }], style: 'solid' },
            { id: 'd-olb2', name: 'Rush', path: [{ x: 85, y: 55 }, { x: 80, y: 70 }], style: 'solid' },
            { id: 'd-de', name: 'Drop', path: [{ x: 30, y: 60 }, { x: 20, y: 60 }], style: 'dashed' }
        ],
        coverages: [],
        coachingPoints: [
            'OLB comes off the edge unblocked',
            'DE drops into flat zone',
            'Create confusion with zone behind the blitz',
            'Interior line maintains rush lanes'
        ],
        conditionals: [
            { id: 'c1', condition: 'If RB blocks', action: 'Should be free rusher' },
            { id: 'c2', condition: 'If quick throw', action: 'DE must get hands up in throwing lane' }
        ],
        optionRoutes: [],
        players: [
            { id: 'olb1', position: 'LB', x: 15, y: 55 },
            { id: 'olb2', position: 'LB', x: 85, y: 55 },
            { id: 'ilb1', position: 'LB', x: 40, y: 55 },
            { id: 'ilb2', position: 'LB', x: 60, y: 55 },
            { id: 'de1', position: 'DL', x: 30, y: 60 },
            { id: 'nt', position: 'DL', x: 50, y: 60 },
            { id: 'de2', position: 'DL', x: 70, y: 60 },
        ],
        createdAt: new Date('2024-01-20'),
        updatedAt: new Date('2024-01-20')
    }
];

// Dictionary Entries
export const dictionaryEntries: DictionaryEntry[] = [
    // Routes
    { id: 'route-1', name: 'Slant', category: 'routes', description: 'Quick inside-breaking route at 45 degrees, typically 3-5 yards', aliases: ['Quick In', 'Smoke'] },
    { id: 'route-2', name: 'Out', category: 'routes', description: 'Route breaking towards the sideline at specified depth', aliases: ['Speed Out', 'Sideline'] },
    { id: 'route-3', name: 'Curl', category: 'routes', description: 'Route where receiver runs upfield then curls back towards QB', aliases: ['Hitch', 'Hook'] },
    { id: 'route-4', name: 'Post', category: 'routes', description: 'Deep route breaking at 45 degrees towards the goalpost', aliases: ['Skinny Post', 'Deep Post'] },
    { id: 'route-5', name: 'Corner', category: 'routes', description: 'Deep route breaking towards the corner of the end zone', aliases: ['Flag', '7 Route'] },
    { id: 'route-6', name: 'Seam', category: 'routes', description: 'Vertical route up the hash marks between zones', aliases: ['Vertical', 'Go'] },

    // Coverages
    { id: 'cov-1', name: 'Cover 2', category: 'coverages', description: 'Two deep safeties split the field, 5 underneath zones', aliases: ['2 Shell', 'Split Safety'] },
    { id: 'cov-2', name: 'Cover 3', category: 'coverages', description: 'Three deep defenders, four underneath zones', aliases: ['3 Deep', 'Sky/Cloud'] },
    { id: 'cov-3', name: 'Cover 4', category: 'coverages', description: 'Four deep defenders (quarters coverage)', aliases: ['Quarters', '4 Deep'] },
    { id: 'cov-4', name: 'Man Free', category: 'coverages', description: 'Man coverage with single high safety', aliases: ['Cover 1', '1 Free'] },

    // Formations
    { id: 'form-1', name: 'Shotgun', category: 'formations', description: 'QB aligned 5 yards behind center', aliases: ['Gun', 'Pistol'] },
    { id: 'form-2', name: 'I-Formation', category: 'formations', description: 'FB and RB aligned behind QB in a line', aliases: ['Pro I', 'Power I'] },
    { id: 'form-3', name: 'Spread', category: 'formations', description: 'Wide receiver formations designed to spread the defense', aliases: ['Empty', '4 Wide'] },
    { id: 'form-4', name: 'Trips', category: 'formations', description: 'Three receivers aligned to one side', aliases: ['Trio', 'Bunch'] },

    // Blitzes
    { id: 'blitz-1', name: 'A-Gap Blitz', category: 'blitzes', description: 'Blitz through the A-gap between center and guard', aliases: ['Mug', 'Green Dog'] },
    { id: 'blitz-2', name: 'Edge Rush', category: 'blitzes', description: 'Outside rush from the defensive end position', aliases: ['Speed Rush', 'Contain'] },
    { id: 'blitz-3', name: 'Zone Blitz', category: 'blitzes', description: 'Blitz with zone coverage behind it', aliases: ['Fire Zone', 'Sim Pressure'] },

    // Protections
    { id: 'prot-1', name: 'Slide Protection', category: 'protections', description: 'OL slides to one direction, RB covers backside', aliases: ['Full Slide', 'Zone Pro'] },
    { id: 'prot-2', name: 'Man Protection', category: 'protections', description: 'Each OL responsible for specific defender', aliases: ['Big on Big', 'BOB'] },
    { id: 'prot-3', name: 'Max Protect', category: 'protections', description: 'Maximum blockers kept in for protection', aliases: ['Heavy', '7-Man'] },

    // Concepts
    { id: 'conc-1', name: 'RPO', category: 'concepts', description: 'Run-Pass Option based on defensive read', aliases: ['Read Play', 'Packaged Play'] },
    { id: 'conc-2', name: 'Play Action', category: 'concepts', description: 'Fake handoff to set up pass', aliases: ['PA', 'Boot'] },
    { id: 'conc-3', name: 'Screen', category: 'concepts', description: 'Short pass behind line with blockers', aliases: ['Bubble', 'Slip Screen'] },
];

// Team Analytics
export const teamAnalytics: TeamAnalytics = {
    overallMastery: 76,
    masteryByPosition: [
        { position: 'QB', mastery: 78 },
        { position: 'WR', mastery: 72 },
        { position: 'RB', mastery: 74 },
        { position: 'LB', mastery: 81 },
        { position: 'CB', mastery: 69 },
        { position: 'S', mastery: 75 },
    ],
    lowestMasteryPlays: [
        { playId: 'play-6', playName: 'Zone Blitz Thunder', mastery: 45 },
        { playId: 'play-2', playName: 'Four Verticals', mastery: 58 },
        { playId: 'play-4', playName: 'Cover 3 Sky', mastery: 62 },
    ],
    playersNotStudying: [
        { playerId: 'player-4', playerName: 'Tyler', lastActive: new Date('2024-01-15') },
        { playerId: 'player-5', playerName: 'Jordan', lastActive: new Date('2024-01-14') },
    ]
};

// Player Analytics (Marcus - QB)
export const playerAnalytics: PlayerAnalytics = {
    masteryByPlay: [
        { playId: 'play-1', playName: 'Mesh Concept', mastery: 92 },
        { playId: 'play-2', playName: 'Four Verticals', mastery: 68 },
        { playId: 'play-3', playName: 'Power Run', mastery: 85 },
    ],
    masteryByConcept: [
        { concept: 'Routes', mastery: 88 },
        { concept: 'Formations', mastery: 82 },
        { concept: 'Protections', mastery: 71 },
        { concept: 'Coverages', mastery: 65 },
    ],
    accuracyByMode: [
        { mode: 'Learn', accuracy: 92 },
        { mode: 'Practice', accuracy: 78 },
        { mode: 'Game Ready', accuracy: 71 },
    ],
    reactionTimeHistory: [
        { date: '2024-01-15', avgTime: 1.5 },
        { date: '2024-01-16', avgTime: 1.4 },
        { date: '2024-01-17', avgTime: 1.3 },
        { date: '2024-01-18', avgTime: 1.2 },
        { date: '2024-01-19', avgTime: 1.2 },
    ],
    strengths: ['Short passing concepts', 'Reading coverages', 'Option routes'],
    weaknesses: ['Deep throwing accuracy', 'Blitz recognition', 'Protection adjustments']
};

// Leaderboards
export const leaderboards: Record<LeaderboardType, LeaderboardEntry[]> = {
    points: [
        { playerId: 'marcus', playerName: 'Marcus', position: 'QB', value: 2450, rank: 1, change: 0 },
        { playerId: 'devin', playerName: 'Devin', position: 'LB', value: 2180, rank: 2, change: 1 },
        { playerId: 'jayden', playerName: 'Jayden', position: 'WR', value: 1890, rank: 3, change: -1 },
    ],
    accuracy: [
        { playerId: 'devin', playerName: 'Devin', position: 'LB', value: 88, rank: 1, change: 0 },
        { playerId: 'marcus', playerName: 'Marcus', position: 'QB', value: 85, rank: 2, change: 0 },
        { playerId: 'jayden', playerName: 'Jayden', position: 'WR', value: 79, rank: 3, change: 0 },
    ],
    performance: [
        { playerId: 'devin', playerName: 'Devin', position: 'LB', value: 94, rank: 1, change: 0 },
        { playerId: 'marcus', playerName: 'Marcus', position: 'QB', value: 91, rank: 2, change: 0 },
        { playerId: 'jayden', playerName: 'Jayden', position: 'WR', value: 82, rank: 3, change: 0 },
    ],
    mostImproved: [
        { playerId: 'jayden', playerName: 'Jayden', position: 'WR', value: 15, rank: 1, change: 2 },
        { playerId: 'devin', playerName: 'Devin', position: 'LB', value: 8, rank: 2, change: -1 },
        { playerId: 'marcus', playerName: 'Marcus', position: 'QB', value: 5, rank: 3, change: -1 },
    ],
    streak: [
        { playerId: 'marcus', playerName: 'Marcus', position: 'QB', value: 14, rank: 1, change: 0 },
        { playerId: 'jayden', playerName: 'Jayden', position: 'WR', value: 8, rank: 2, change: 1 },
        { playerId: 'devin', playerName: 'Devin', position: 'LB', value: 5, rank: 3, change: 0 },
    ],
    reaction_time: [
        { playerId: 'marcus', playerName: 'Marcus', position: 'QB', value: 350, rank: 1, change: 0 }, // ms
        { playerId: 'devin', playerName: 'Devin', position: 'LB', value: 380, rank: 2, change: 0 },
        { playerId: 'jayden', playerName: 'Jayden', position: 'WR', value: 410, rank: 3, change: 0 },
    ],
};

// Demo Questions for Learning
export const demoQuestions = [
    {
        id: 'q1',
        playId: 'play-1',
        type: 'multiple-choice' as const,
        prompt: 'In the Mesh Concept, what is the primary read for the QB?',
        options: ['Outside receiver fade', 'Mesh crossing routes', 'RB in the flat', 'TE seam route'],
        correctAnswer: 'Mesh crossing routes',
        coachingPoint: 'The mesh (crossing routes) creates natural rub action. Look for the open window as receivers cross.'
    },
    {
        id: 'q2',
        playId: 'play-1',
        type: 'multiple-choice' as const,
        prompt: 'Against Cover 2 zone, where should you attack in the Mesh Concept?',
        options: ['Deep sidelines', 'Flat areas', 'Soft spot between LBs', 'Behind the safeties'],
        correctAnswer: 'Soft spot between LBs',
        coachingPoint: 'Cover 2 creates natural holes in the middle of the field between the linebackers.'
    },
    {
        id: 'q3',
        playId: 'play-4',
        type: 'multiple-choice' as const,
        prompt: 'In Cover 3 Sky, who triggers on run plays?',
        options: ['Free Safety', 'Strong Safety', 'Mike Linebacker', 'Cornerback'],
        correctAnswer: 'Strong Safety',
        coachingPoint: 'In Cover 3 Sky, the strong safety is responsible for force/run support.'
    },
    {
        id: 'q4',
        playId: 'play-5',
        type: 'typed-recall' as const,
        prompt: 'In Tampa 2, which linebacker has deep middle responsibility?',
        options: [],
        correctAnswer: 'MLB',
        coachingPoint: 'The MLB dropping deep to cover the middle seam is what makes Tampa 2 unique.'
    },
];
