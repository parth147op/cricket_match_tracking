import React from 'react'
import styles from './MatchCard.module.css'

const MatchCard = ({ match }) => {
    return (
        <div className={styles.matchCard}>
            <h3 className={styles.date}>{match.date}</h3>
            <div className={styles.teams}> 
                <span>{match.team1}</span> vs <span>{match.team2}</span>
            </div>
            <div className={styles.scores}>
                <span>{match.score1}</span> - <span>{match.score2}</span>
            </div>
            <div className={styles.status}>{match.status}</div>
        </div>
    );
};

export default MatchCard;
