import React from 'react';
import styles from './PlayerSelectionModal.module.css';

const PlayerSelectionModal = ({ isOpen, players, selectedPlayers, onSelect, onClose }) => {
    if (!isOpen) {
        return null;
    }
    
    return (
        <div className={styles.modal}>
            <h2>Select Players</h2>
            <ul className={styles.playerList}>
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
            <button onClick={onClose} className={styles.closeButton}>Close</button>
        </div>
    );
};

export default PlayerSelectionModal;
