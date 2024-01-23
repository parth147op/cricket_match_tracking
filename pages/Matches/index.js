import React from 'react';
import styles from './Matches.module.css'; // Make sure the path to your CSS module is correct
import NavigationBar from '@/components/NavigationBar';
import MatchCard from '@/components/MatchCard';

const Matches = ({ liveMatches, upcomingMatches, recentResults }) => {
    // You can fetch match data using getServerSideProps or getStaticProps in Next.js
    const matches = [{'id': 1,
    'date': 'January 23, 2024',
    'type': 'Upcoming',
    'team1': 'Wellington Women',
    'team2': 'Central Districts Women',
    'status': 'Match starts at 03:14'},
   {'id': 2,
    'date': 'January 24, 2024',
    'type': 'Result',
    'team1': 'Wellington Women',
    'team2': 'Canterbury Women',
    'score1': '262/3',
    'score2': '122/9',
    'status': 'Match tied'},
   {'id': 3,
    'date': 'January 25, 2024',
    'type': 'Live',
    'team1': 'Central Districts Women',
    'team2': 'Northern Districts Women',
    'score1': '189/7',
    'score2': '259/9',
    'status': 'Match tied'},
   {'id': 4,
    'date': 'January 26, 2024',
    'type': 'Upcoming',
    'team1': 'Auckland Women',
    'team2': 'Otago Women',
    'status': 'Match starts at 17:14'},
   {'id': 5,
    'date': 'January 27, 2024',
    'type': 'Upcoming',
    'team1': 'Canterbury Women',
    'team2': 'Auckland Women',
    'status': 'Match starts at 17:14'},
   {'id': 6,
    'date': 'January 28, 2024',
    'type': 'Upcoming',
    'team1': 'Otago Women',
    'team2': 'Central Districts Women',
    'status': 'Match starts at 01:14'},
   {'id': 7,
    'date': 'January 29, 2024',
    'type': 'Upcoming',
    'team1': 'Northern Districts Women',
    'team2': 'Central Districts Women',
    'status': 'Match starts at 15:14'},
   {'id': 8,
    'date': 'January 30, 2024',
    'type': 'Result',
    'team1': 'Central Districts Women',
    'team2': 'Otago Women',
    'score1': '291/6',
    'score2': '168/6',
    'status': 'ND Women won by 22 runs (DLS method)'},
   {'id': 9,
    'date': 'January 31, 2024',
    'type': 'Upcoming',
    'team1': 'Northern Districts Women',
    'team2': 'Otago Women',
    'status': 'Match starts at 04:14'},
   {'id': 10,
    'date': 'February 01, 2024',
    'type': 'Result',
    'team1': 'Auckland Women',
    'team2': 'Central Districts Women',
    'score1': '114/9',
    'score2': '170/1',
    'status': 'Match tied'}]
    return (
        <div>
            <NavigationBar/>
            <div className={styles.resultsPage}>
            <h1 className={styles.resultsTitle}>Matches</h1>
            {matches.map(match=>(
                <MatchCard key={match.id} match={match}/>
            ))}
            </div>
        </div>
    );
};


export default Matches;
