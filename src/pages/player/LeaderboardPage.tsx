import { LeaderboardList } from '../../components/LeaderboardList';
import './PlayerPages.css';

export function LeaderboardPage() {
    return (
        <div className="leaderboard-page animate-fade-in">
            <div className="page-header">
                <h1>Leaderboards</h1>
                <p className="page-subtitle">Compete with your teammates</p>
            </div>

            <LeaderboardList />
        </div>
    );
}
