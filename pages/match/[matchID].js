import React, { useEffect, useState } from 'react';
import styles from './MatchDetails.module.css'; // Ensure this path is correct
import { useRouter } from 'next/router';
import axios from 'axios';
const MatchDetails = () => {
    const router = useRouter();
    const {matchID} = router.query;
    const [teamAName, setTeamAName] = useState('');
    const [teamBName, setTeamBName] = useState('');
    const [matchType, setMatchType] = useState('custom');
    const [numberOfOvers, setNumberOfOvers] = useState(0);
    const [city, setCity] = useState('');
    const [ground, setGround] = useState('');
    const [matchDate, setMatchDate] = useState('');
    const [pitchType, setPitchType] = useState('custom');
    console.log(matchDate);
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
                teamAName, teamBName, matchType, numberOfOvers, city, ground, matchDate, pitchType
            })
            
            if(response.data.status === 'success'){
                alert('Match details updated successfully');
                //redirect to the toss page
                router.push(`/match/toss/${matchID}`);
            }

            console.log({
                teamAName, teamBName, matchType, numberOfOvers, city, ground, matchDate, pitchType
            });
        }catch(err){
            console.log(err);
        }
        
       
    };

    return (
        <div className={styles.matchDetailsContainer}>
            <h1 className={styles.heading}>Enter Match Details</h1>
            <form onSubmit={handleSubmit} className={styles.matchForm}>
                <label>
                    Team A Name:
                    <input type="text" value={teamAName} disabled />
                </label>
                <label>
                    Team B Name:
                    <input type="text" value={teamBName} disabled />
                </label>
                <label>
                    Match Type:
                    <select value={matchType} onChange={e => setMatchType(e.target.value)}>
                        <option value="t20">T20</option>
                        <option value="odi">ODI</option>
                        <option value="test">Test</option>
                        <option value="hundred">Hundred</option>
                        <option value="t10">T10</option>
                        <option value="custom">Custom</option>
                    </select>
                </label>
                <label>
                    Number of Overs:
                    <input type="number" value={numberOfOvers} onChange={e => setNumberOfOvers(e.target.value)} />
                </label>
                <label>
                    City:
                    <input type="text" value={city} onChange={e => setCity(e.target.value)} />
                </label>
                <label>
                    Ground:
                    <input type="text" value={ground} onChange={e => setGround(e.target.value)} />
                </label>
                <label>
                    Match Date:
                    <input type="date" value={matchDate} onChange={e => setMatchDate(e.target.value)} />
                </label>
                <label>
                    Pitch Type:
                    <select value={pitchType} onChange={e => setPitchType(e.target.value)}>
                        <option value="green">Green</option>
                        <option value="flat track">Flat Track</option>
                        <option value="dry">Dry</option>
                        <option value="wet">Wet</option>
                        <option value="dusty">Dusty</option>
                        <option value="dead">Dead</option>
                        <option value="custom">Custom</option>
                    </select>
                </label>
                <button type="submit" className={styles.submitButton}>Submit Match Details</button>
            </form>
        </div>
    );
};

export default MatchDetails;
