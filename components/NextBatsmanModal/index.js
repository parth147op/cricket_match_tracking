import React from 'react';
import styles from './NextBatsmanModal.module.css';
const NextBatsmanModal = ({ onClose, onSubmit, onChange, value }) => {
    const teamA = [
        {name: "Virat Kohli", id: 1},
        {name: "Rohit Sharma", id: 2},
        {name: "MS Dhoni", id: 3},
        {name: "Sachin Tendulkar", id: 4},
        {name: "Suresh Raina", id: 5},
        {name: "Yuvraj Singh", id: 6},
        {name: "Hardik Pandya", id: 7},
        {name: "Ravindra Jadeja", id: 8},
        {name: "Bhuvneshwar Kumar", id: 9},
        {name: "Deepak Chahar", id: 10},
        {name: "Yuzvendra Chahal", id: 11},
      ]
    return (
      <div className={styles.modalOverlay}>
        <div className={styles.modal}>
          <h2 className={styles.title}>Select Next Batsman</h2>
          <select value={value} onChange={onChange} className={styles.input}>
            <option value="None">None</option>
            {teamA.map(player => (
              <option key={player.id} value={player.name}>{player.name}</option>
            ))}
            </select>
          <button onClick={onSubmit} className={styles.confirmButton}>Confirm</button>
          <button onClick={onClose} className={styles.cancelButton}>Cancel</button>
        </div>
      </div>
    );
  };
  
    export default NextBatsmanModal;