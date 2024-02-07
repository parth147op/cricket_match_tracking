import React, { useEffect, useState } from 'react';
import styles from './StartMatch.module.css';
import PlayerSelectionModal from '@/components/PlayerSelectionModal';
import TeamInput from '@/components/TeamInput';
import { useRouter } from 'next/router';
import axios from 'axios';
const StartMatch = () => {
    const router = useRouter();
    const [teamAName, setTeamAName] = useState('');
    const [teamBName, setTeamBName] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedTeam, setSelectedTeam] = useState(null);
    const [selectedTeamAPlayers, setSelectedTeamAPlayers] = useState([]);
    const [selectedTeamBPlayers, setSelectedTeamBPlayers] = useState([]);
    const [swapPlayer, setSwapPlayer] = useState(null); // State to hold the player selected for swapping
    const [teamAPlayers, setTeamAPlayers] = useState([]);
    const [teamBPlayers, setTeamBPlayers] = useState([]);
    const fetchPlayers = async (teamName, team) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/v1/team/getAllPlayer/${teamName}`);
            let fetchedPlayers = []
            response.data.data.teamPlayers.map(element => {
                fetchedPlayers.push({
                    id: element._id,
                    name: element.fullName,
                })
            });
            fetchedPlayers.map((player) => {
                player.isPlaying = true;
                player.battingOrder = null;
                player.isCaptain = false;
                player.isWicketKeeper = false;
            })
            console.log(fetchedPlayers);
            if (team === 'Team A') {
                setTeamAPlayers(fetchedPlayers); // Set the players for the currently selected team
            }

            else if (team === 'Team B')
                setTeamBPlayers(fetchedPlayers); // Set the players for the currently selected team

        } catch (error) {
            console.error('Failed to fetch players:', error);
            // Handle the error appropriately

        }
    };
    const handleOpenModal = (team) => {
        setSelectedTeam(team);
        console.log(team);
        fetchPlayers(team === 'Team A' ? teamAName : teamBName, team);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTeam(null);
        // setSelectedPlayers([]);
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
            let updatedPlayers;
            if(team === 'Team A'){
                const index1 = selectedTeamAPlayers.findIndex(p => p.id === swapPlayer.id);
                const index2 = selectedTeamAPlayers.findIndex(p => p.id === selectedPlayer.id);

                updatedPlayers = [...selectedTeamAPlayers];
                [updatedPlayers[index1], updatedPlayers[index2]] = [updatedPlayers[index2], updatedPlayers[index1]];
                setSelectedTeamAPlayers(updatedPlayers);
            }
            else if(team === 'Team B'){
                const index1 = selectedTeamBPlayers.findIndex(p => p.id === swapPlayer.id);
                const index2 = selectedTeamBPlayers.findIndex(p => p.id === selectedPlayer.id);

                updatedPlayers = [...selectedTeamBPlayers];
                [updatedPlayers[index1], updatedPlayers[index2]] = [updatedPlayers[index2], updatedPlayers[index1]];
                setSelectedTeamBPlayers(updatedPlayers);
            }
            updatedPlayers = updatedPlayers.map((player,index)=>({
                ...player,
                battingOrder: index+1
            }))
            console.log(updatedPlayers)
            // Update the state with the new players array
            if (team === 'Team A') {
                setSelectedTeamAPlayers(updatedPlayers);
            } else if(team === 'Team B'){
                setSelectedTeamBPlayers(updatedPlayers);
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
    const handleSetCaptain = (playerId, team) => {
        console.log('Captain set')
        if (team === 'Team A') {
            // Create a new array with updated isCaptain flags
            const updatedPlayers = selectedTeamAPlayers.map(player => ({
                ...player,
                isCaptain: player.id === playerId
            }));
    
            console.log(updatedPlayers);
            setSelectedTeamAPlayers(updatedPlayers); // Update the state with the new array
        }
        else if(team === 'Team B'){
            // Create a new array with updated isCaptain flags
            const updatedPlayers = selectedTeamBPlayers.map(player => ({
                ...player,
                isCaptain: player.id === playerId
            }));
    
            console.log(updatedPlayers);
            setSelectedTeamBPlayers(updatedPlayers); // Update the state with the new array
        }
    };

    const handleSetWicketKeeper = (playerId, team) => {
        console.log('Wicket Keeper set')
        if(team === 'Team A'){
            // Create a new array with updated isWicketKeeper flags
            const updatedPlayers = selectedTeamAPlayers.map(player => ({
                ...player,
                isWicketKeeper: player.id === playerId
            }));
    
            console.log(updatedPlayers);
            setSelectedTeamAPlayers(updatedPlayers); // Update the state with the new array
        }
        else if(team === 'Team B'){
            // Create a new array with updated isWicketKeeper flags
            const updatedPlayers = selectedTeamBPlayers.map(player => ({
                ...player,
                isWicketKeeper: player.id === playerId
            }));
    
            console.log(updatedPlayers);
            setSelectedTeamBPlayers(updatedPlayers); // Update the state with the new array
        }
    };

    const renderSelectedPlayers = (players, team) => (
        <ul className={styles.playerList}>
            {players.map((player,index) => (
                player && (<li key={player.id} className={`${styles.playerItem} ${swapPlayer && swapPlayer.id === player.id ? styles.selectedForSwap : ''}`}>
                    <span className={styles.playerOrderNumber}>{index + 1}</span> {/* Sr. No. */}
                    <span onClick={() => handleSwapPlayer(player, team)}></span>
                    <span onClick={() => handleSwapPlayer(player, team)}>
                        {player.name}</span>
                    <button
                        className={`${styles.captainButton} ${player.isCaptain === true ? styles.selectedRole : ''}`}
                        onClick={() => handleSetCaptain(player.id, team)}
                    >C</button>
                    <button
                        className={`${styles.wicketKeeperButton} ${player.isWicketKeeper === true ? styles.selectedRole : ''}`}
                        onClick={() => handleSetWicketKeeper(player.id, team)}
                    >WK</button>
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

    const handleStartButton = async () => {
        // On clicking the start button, firstly new match entry will be created in the matches collection. Using the matchID, the selected players will be added to the playerMatchParticipation collection.
        //schema of playerMatchParticipation collection consist of matchID, playerID, isPlaying,battingOrder,isCaptain,isWicketKeeper;
        const response = await axios.post('http://localhost:5000/api/v1/match/create', {
            teamAName: teamAName,
            teamBName: teamBName,
        })
        console.log(response.data.data.newMatch._id);
        const matchID = response.data.data.newMatch._id;
        if (matchID) {

            const playerMatchParticipationPromises = [];
            selectedTeamAPlayers.forEach(player => {
                const playerDetails = {
                    playerID: player.id,
                    isPlaying: true,
                    battingOrder: player.battingOrder,
                    isCaptain: player.isCaptain,
                    isWicketKeeper: player.isWicketKeeper
                }
                console.log(playerDetails)
                playerMatchParticipationPromises.push(axios.patch(`http://localhost:5000/api/v1/match/addPlayers/${matchID}`, playerDetails),{ headers: { 'Content-Type': 'application/json' }})
            })
            selectedTeamBPlayers.forEach(player => {
                playerMatchParticipationPromises.push(axios.patch(`http://localhost:5000/api/v1/match/addPlayers/${matchID}`, {
                    playerID: player.id,
                    isPlaying: true,
                    battingOrder: player.battingOrder,
                    isCaptain: player.isCaptain,
                    isWicketKeeper: player.isWicketKeeper
                }),{ headers: { 'Content-Type': 'application/json' }})
            })
            await Promise.all(playerMatchParticipationPromises);
        }
        alert('Match Started');
        router.push({
            pathname: `/match/${matchID}`,
    query: { teamAName, teamBName }
        });
        
    }
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
                    players={selectedTeam === 'Team A' ? teamAPlayers : teamBPlayers}
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
                <button className={styles.startMatchButton} onClick={handleStartButton}>Start Match</button>
            </div>
        </div>
    );
};

export default StartMatch;
