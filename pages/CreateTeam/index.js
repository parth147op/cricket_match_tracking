import React, { useState } from 'react'
import styles from './CreateTeam.module.css'
const CreateTeam = () => {
    const [playerForm, setPlayerForm] = useState([])

    const addPlayerForm = () => {
        const newForm = (
            <ul>
            <form id='playerFormContainer'>
            <h1>Add Players Details</h1>
            <label>Player Name</label>
            <input type="text" placeholder="Player Name" />
            <label>Player Role</label>
            <select>
                <option value="Batsman">Batsman</option>
                <option value="Bowler">Bowler</option>
                <option value="All Rounder">All Rounder</option>
                <option value="Wicket Keeper">Wicket Keeper</option>
            </select>
            <label>Batting Type</label>
            <select>
                <option value="Right Handed">Right Handed</option>
                <option value="Left Handed">Left Handed</option>
            </select>
            <label>Bowling Type</label>
            <select>
                <option value="Right Handed">Right Handed</option>
                <option value="Left Handed">Left Handed</option>
            </select>
            <label>Jersey Number</label>
            <input type="number" placeholder="Jersey Number" />
            </form> 
            <button>Save</button>
            </ul>
        );
        setPlayerForm([...playerForm, newForm])
    }

  return (
    <div className={styles.createTeamContainer}>
        <h1 className={styles.createTeamHeading}>Create Team</h1>
        <label>Team Name</label>
        <input type="text" placeholder="Team Name" />
        <button>Proceed</button>

        <h1>Players</h1>
            {playerForm}
            <button onClick={addPlayerForm}>+ Add Player</button>
    </div>
  )
}

export default CreateTeam