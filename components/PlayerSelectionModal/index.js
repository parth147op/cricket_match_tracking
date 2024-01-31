import React from 'react';
import styles from './PlayerSelectionModal.module.css';
import { useRouter } from 'next/router';

const PlayerSelectionModal = ({ isOpen, players, selectedPlayers, onSelect, onClose }) => {
    const router = useRouter();
    const handleAddPlayersClick = () => {
        router.push(`/addPlayers/${team}`);
        onClose(); // Close the modal after redirecting
    };

    if (!isOpen) {
        return null;
    }
    
    return (
        <div className={styles.modal}>
            {players.length === 0 ? (
                <div>
                <p>No players available. Please add players.</p>
                <button onClick={handleAddPlayersClick} className={styles.addButton}>
                    Add Players
                </button>
            </div> 
                
            ):(
                <ul className={styles.playerList}>
                    <h2>Select Players</h2>
                {players.map(player => (
                    <li
                        key={player.id}
                        onClick={() => onSelect(player)}
                        className={`${styles.playerItem} ${selectedPlayers.includes(player) ? styles.playerItemSelected : ''}`}
                    >
                        {player.name}
                    </li>
                ))}
            </ul>
            )}
            <button onClick={onClose} className={styles.closeButton}>Close</button>
        </div>
    );
};

export default PlayerSelectionModal;
