import React, { useState } from 'react'
import styles from './CreateTeam.module.css'
const CreateTeam = () => {
    const [playerForm, setPlayerForm] = useState([])

    const addPlayerForm = () => {
        const newForm = (
            <ul>
            <form id='playerFormContainer' className={styles.playerFormContainer}>
            <label className={styles.stylishLabel}>Player Name</label>
            <input type="text" placeholder="Player Name" />
            <label className={styles.stylishLabel}>Player Role</label>
            <select>
                <option value="Batsman">Batsman</option>
                <option value="Bowler">Bowler</option>
                <option value="All Rounder">All Rounder</option>
                <option value="Wicket Keeper">Wicket Keeper</option>
            </select>
            <label className={styles.stylishLabel}>Batting Type</label>
            <select>
                <option value="Right Handed">Right Handed</option>
                <option value="Left Handed">Left Handed</option>
            </select>
            <label className={styles.stylishLabel}>Bowling Type</label>
            <select>
                <option value="Right Handed">Right Handed</option>
                <option value="Left Handed">Left Handed</option>
            </select>
            <label className={styles.stylishLabel}>Jersey Number</label>
            <input type="number" placeholder="Jersey Number" />
            <button className={styles.teambutton}>Save</button>
            </form> 
            
            </ul>
        );
        setPlayerForm([...playerForm, newForm])
    }

    const removePlayerForm = () => {
        const newForm = [...playerForm]
        newForm.pop()
        setPlayerForm(newForm)
    }
  return (
    <div className={styles.createTeamContainer}>
        <h1 className={styles.createTeamHeading}>Create Team</h1>
        <div className={styles.teamNameForm}>
        <label className={styles.stylishLabel}>Team Name</label>
        <input type="text" placeholder="Team Name"  className={styles.stylishInput}/>
        <div className={styles.teambutton}>
        <button >Proceed</button>
        </div>
        </div>
        

        <h1 className={styles.createTeamHeading}>Players</h1>
            {playerForm}
            <div className={styles.playerbuttons}>
            <button onClick={addPlayerForm} className={styles.addPlayerButton}>+ Add Player</button>
            {playerForm.length ? <button onClick={removePlayerForm} className={styles.addPlayerButton}>- Remove Player</button> : null}
            </div>
    </div>
  )
}

export default CreateTeam