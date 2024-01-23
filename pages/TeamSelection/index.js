import React, { useState } from 'react';
import styles from './TeamSelection.module.css'; // Import the CSS module

const TeamSelection = () => {
    // Dummy data for all players
    const initialPlayers = [
        { id: 1, name: 'Player 1' },
        { id: 2, name: 'Player 2' },
        { id: 3, name: 'Player 3' },
        { id: 4, name: 'Player 4' },
        { id: 5, name: 'Player 5'},
        { id: 6, name: 'Player 6' },
        {id: 7, name: 'Player 7' },
        {id: 8, name: 'Player 8' },
        {id: 9, name: 'Player 9' },
        {id: 10, name: 'Player 10' },
        {id: 11, name: 'Player 11' },
        // ... more players
    ];

    const [allPlayers, setAllPlayers] = useState(initialPlayers);
    const [selectedPlayers, setSelectedPlayers] = useState([]);

    const selectPlayer = (player) => {
        setSelectedPlayers([...selectedPlayers, player]);
        setAllPlayers(allPlayers.filter(p => p.id !== player.id));
    };

    const deselectPlayer = (player) => {
        setAllPlayers([...allPlayers, player]);
        setSelectedPlayers(selectedPlayers.filter(p => p.id !== player.id));
    };

    return (
        <div className={styles['team-selection']}>
            <div className={styles['players-list']}>
                <h3>All Players</h3>
                {allPlayers.map(player => (
                    <div key={player.id} onClick={() => selectPlayer(player)}>
                        {player.name}
                    </div>
                ))}
            </div>
            <div className={styles['players-list']}>
                <h3>Selected Players</h3>
                {selectedPlayers.map(player => (
                    <div key={player.id} onClick={() => deselectPlayer(player)}>
                        {player.name}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeamSelection;
