import React, { useEffect, useState } from 'react';
import styles from './Toss.module.css'; // Make sure to create this CSS module
import { useRouter } from 'next/router';
import axios from 'axios';
import { redirect } from 'next/dist/server/api-utils';
const Toss = () => {
    const router = useRouter();
    const {matchID} = router.query;
    const [tossWinner, setTossWinner] = useState('');
    const [decision, setDecision] = useState('');
    const [teamAName, setTeamAName] = useState('');
    const [teamBName, setTeamBName] = useState('');
    useEffect( () => {
        // set teamAName and teamBName in state
        const fetchMatchDetails = async() => {
            try{
                const response = await axios.get(`http://localhost:5000/api/v1/match/get/${matchID}`);
                setTeamAName(response.data.data.Match.teamAName);
                setTeamBName(response.data.data.Match.teamBName);
            }catch(err){
                console.log(err);
            }
        }
        if (matchID) {
            fetchMatchDetails();
        }
        
    }, [matchID]);

    const handleSubmit = async(event) => {
        event.preventDefault();
        try{
            const response = await axios.put(`http://localhost:5000/api/v1/match/update/${matchID}`, {
                tossWinnerName:tossWinner, 
                tossDecision:decision
            })
             
            if(response.data.status === 'success'){
                alert('Toss details updated successfully');
                //redirect to the toss page
                router.push(`/match/innings/selectBatsmanAndBowler/${matchID}`);
            }

            console.log({
                tossWinner, decision
            });
            alert('Toss details updated successfully')
            redirect.push(`/match/firstChoices/${matchID}`)
        }catch(err){
            console.log(err);
        }
        // Add logic to process and send form data
    }
    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Toss Decision</h1>
            <div className={styles.tossWinner}>
                <p>Who won the toss?</p>
                <button className={styles.tossButton} onClick={() => setTossWinner(teamAName)}>{teamAName}</button>
                <button className={styles.tossButton} onClick={() => setTossWinner(teamBName)}>{teamBName}</button>
            </div>

            {tossWinner && (
                <div className={styles.decision}>
                    <p>{tossWinner} will:</p>
                    <button className={styles.tossButton} onClick={() => setDecision('Bat')}>Bat 🏏</button>
                    <button className={styles.tossButton} onClick={() => setDecision('Bowl')}>Bowl 🎳</button>
                </div>
            )}

            {decision && <p>{tossWinner} chose to {decision} first!</p>}
            <button className={styles.tossButton} onClick={handleSubmit}>Submit</button>
        </div>
    );
};

export default Toss;
