import React, { useState } from 'react';
import styles from './StartMatch.module.css';
import PlayerSelectionModal from '@/components/PlayerSelectionModal';
import TeamInput from '@/components/TeamInput';
import { render } from 'react-dom';

const StartMatch = () => {
    const [teamAName, setTeamAName] = useState('');
    const [teamBName, setTeamBName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [players, setPlayers] = useState([]); // Replace with actual players data
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [selectedTeamAPlayers, setSelectedTeamAPlayers] = useState([]);
    const [selectedTeamBPlayers, setSelectedTeamBPlayers] = useState([]);
    const [swapPlayer, setSwapPlayer] = useState(null); // State to hold the player selected for swapping

    const teamAPlayers = [
        { id: 1, name: 'Team A Player 1' },
        { id: 2, name: 'Team A Player 2' },
        { id: 3, name: 'Team A Player 3' },
        { id: 4, name: 'Team A Player 4' },
        { id: 5, name: 'Team A Player 5' },
        { id: 6, name: 'Team A Player 6' },
        { id: 7, name: 'Team A Player 7' },
        { id: 8, name: 'Team A Player 8' },
        { id: 9, name: 'Team A Player 9' },
        { id: 10, name: 'Team A Player 10' },
        { id: 11, name: 'Team A Player 11' },
        { id: 12, name: 'Team A Player 12' },
        { id: 13, name: 'Team A Player 13' },
        { id: 14, name: 'Team A Player 14' },
        { id: 15, name: 'Team A Player 15' },
    ]

    const teamBPlayers = [
        { id: 1, name: 'Team B Player 1' },
        { id: 2, name: 'Team B Player 2' },
        { id: 3, name: 'Team B Player 3' },
        { id: 4, name: 'Team B Player 4' },
        { id: 5, name: 'Team B Player 5' },
        { id: 6, name: 'Team B Player 6' },
        { id: 7, name: 'Team B Player 7' },
        { id: 8, name: 'Team B Player 8' },
        { id: 9, name: 'Team B Player 9' },
        { id: 10, name: 'Team B Player 10' },
        { id: 11, name: 'Team B Player 11' },
        { id: 12, name: 'Team B Player 12' },
        { id: 13, name: 'Team B Player 13' },
        { id: 14, name: 'Team B Player 14' },
        { id: 15, name: 'Team B Player 15' },
    ]

    const handleOpenModal = (team) => {
        setSelectedTeam(team);
        setPlayers(team === 'Team A' ? teamAPlayers : teamBPlayers);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTeam(null);
        setSelectedPlayers([]);
    };

    const handleSelectPlayer = (player) => {
        if (selectedTeam === 'Team A') {
            setSelectedTeamAPlayers(prev => {
                if (!prev.some(p => p.id === player.id)) {
                    return [...prev, player];
                }
                return prev;
            });
        } else if (selectedTeam === 'Team B') {
            setSelectedTeamBPlayers(prev => {
                if (!prev.some(p => p.id === player.id)) {
                    return [...prev, player];
                }
                return prev;
            });
        }
    };

    const handleSwapPlayer = (selectedPlayer, team) => {
        // If no player is currently selected for swapping, set the current one
        if (!swapPlayer) {
            setSwapPlayer(selectedPlayer);
        }
        else {
            // If a player is already selected, perform the swap
            const teamPlayers = team === 'Team A' ? selectedTeamAPlayers : selectedTeamBPlayers;
            const index1 = teamPlayers.findIndex(p => p.id === swapPlayer.id);
            const index2 = teamPlayers.findIndex(p => p.id === selectedPlayer.id);

            //swap the players in the array
            const newTeamPlayers = [...teamPlayers];
            [newTeamPlayers[index1], newTeamPlayers[index2]] = [newTeamPlayers[index2], newTeamPlayers[index1]];
            // Update the state with the new players array
            if (team === 'Team A') {
                setSelectedTeamAPlayers(newTeamPlayers);
            } else {
                setSelectedTeamBPlayers(newTeamPlayers);
            }

            // Reset the swapPlayer state
            setSwapPlayer(null);
        }
    }

    const handleRemovePlayer = (player, team) => {
        if (team === 'Team A') {
            setSelectedTeamAPlayers(selectedTeamAPlayers.filter(p => p && p.id !== player.id));
        } else if (team === 'Team B') {
            setSelectedTeamBPlayers(selectedTeamBPlayers.filter(p => p && p.id !== player.id));
        }
    };

    const renderSelectedPlayers = (players, team) => (
        <ul className={styles.playerList}>
            {players.map(player => (
                player && (<li key={player.id} className={`${styles.playerItem} ${swapPlayer && swapPlayer.id === player.id ? styles.selectedForSwap : ''}`}
                    onClick={() => handleSwapPlayer(player, team)}>
                    {player.name}
                    <button
                        onClick={() => handleRemovePlayer(player, team)}
                        className={styles.removePlayerButton} // Add appropriate styling
                    >
                        Remove
                    </button>
                </li>)
            ))}
        </ul>
    );

    return (
        <div>
            <div className={styles.startMatch}>
                <h1 className={styles.heading}>Start Match</h1>
                <div className={styles.teamInputDiv}>
                    <TeamInput
                        label="Team A"
                        value={teamAName}
                        onChange={setTeamAName}
                    />

                    <button onClick={() => handleOpenModal('Team A')} className={styles.button}>Add Players</button>
                </div>
                <div className={styles.vs}>vs</div>
                <div className={styles.teamInputDiv}>
                    <TeamInput     
                        label="Team B"
                        value={teamBName}
                        onChange={setTeamBName}
                        placeholder="Enter Team B Name"
                    />
                    <button onClick={() => handleOpenModal('Team B')} className={styles.button}>Add Players</button>
                </div>
                <PlayerSelectionModal
                    isOpen={isModalOpen}
                    players={players}
                    selectedPlayers={selectedTeam === 'Team A' ? selectedTeamAPlayers : selectedTeamBPlayers}
                    onSelect={handleSelectPlayer}
                    onClose={handleCloseModal}
                />
            </div>
            <div className={styles.teamsContainer}>
                <div className={styles.teamDisplay}>
                    <h2 className={styles.subHeading}>Selected {teamAName || `Team A`} Players</h2>
                    <ul className={styles.playerList}>
                        {renderSelectedPlayers(selectedTeamAPlayers, 'Team A')}
                    </ul>
                </div>

                <div className={styles.teamDisplay}>
                    <h2 className={styles.subHeading}>Selected {teamBName || `Team B`} Players</h2>
                    <ul className={styles.playerList}>
                        {renderSelectedPlayers(selectedTeamBPlayers, 'Team B')}
                    </ul>
                </div>
            </div>

            <div className={styles.startMatchButtonContainer}>
                <button className={styles.startMatchButton}>Start Match</button>
            </div>
        </div>
    );
};

export default StartMatch;
