// Importing necessary libraries and styles
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from './firstinnings.module.css'; // Make sure the file name starts with a capital letter
import NextBatsmanModal from '@/components/NextBatsmanModal'; // Ensure the path is correct
import axios from 'axios';
import next from 'next';
const DeliveryInput = () => {
    const router = useRouter();
    let { totalOvers, strikerBatsman, nonStrikerBatsman, bowler, inningID,matchID, battingTeam, bowlingTeam,ball,inningNumber,over,totalRuns,wickets } = router.query;
    totalOvers = parseInt(totalOvers, 10);
ball = parseInt(ball, 10);
inningNumber = parseInt(inningNumber, 10);
over = parseInt(over, 10);
totalRuns = parseInt(totalRuns, 10);
wickets = parseInt(wickets, 10);
    // State hooks for delivery details
    const [runs, setRuns] = useState(0);
    const [extras, setExtras] = useState('None');
    const [dismissal, setDismissal] = useState('None');
    const [runOutBatsman, setRunOutBatsman] = useState('');
    const [nextBatsman, setNextBatsman] = useState('');
    const [fielder, setFielder] = useState('');
    const [onStrike, setOnStrike] = useState(false);
    const [currentOverDeliveries, setCurrentOverDeliveries] = useState([]);
    const [currentOver, setCurrentOver] = useState(0);
    const [wicketType, setWicketType] = useState('None');
    const [nextBowler, setnextBowler] = useState('');
    const [battingTeamPlayers, setBattingTeamPlayers] = useState([]);
    const [bowlingTeamPlayers,setBowlingTeamPlayers] = useState([]);
    // Form submission handler

    // Get the players playing the match using useEffect
    useEffect(() => {
        const fetchMatchPlayers = async() => {
            try{
                console.log(matchID);
                const response = await axios.get(`http://localhost:5000/api/v1/match/players/${matchID}`);
                console.log(response.data.status);
                let battingTeamPlayers = [], bowlingTeamPlayers = [];
                response.data.data.players.map((player) => {
                    if(player.teamName === battingTeam){
                        battingTeamPlayers.push(player);
                    }
                    else if(player.teamName === bowlingTeam){
                        bowlingTeamPlayers.push(player);
                    }
                })
                console.log(battingTeamPlayers, bowlingTeamPlayers)
                setBattingTeamPlayers(battingTeamPlayers);
                setBowlingTeamPlayers(bowlingTeamPlayers);

            }catch(err){
                console.log(err);
            }
        }
        fetchMatchPlayers();
    }, [matchID]);
    const handleSubmit = async(e) => {
        e.preventDefault();
        
        if(extras === 'None' || extras === 'Bye' || extras === 'Leg Bye'){
            ball = ball + 1;

        }
        else if(extras === 'Wide' || extras === 'No Ball'){
            ball = ball;
            totalRuns = totalRuns + 1;
        }
        
        if(ball != 6 && runs%2 === 1){
            let temp = strikerBatsman;
            strikerBatsman = nonStrikerBatsman;
            nonStrikerBatsman = temp;
        }
        let fielderName = '';
        let wicket = false;
        if(dismissal !== 'None'){
            wicket = true
            if(dismissal === 'Caught'){
                fielderName += catchBy;
            }
            else if(dismissal === 'Run Out'){
                fielderName += fielder;
            }
            wickets = wickets + 1;
        }
        totalRuns = totalRuns + runs;
        const deliveryDetails = {
            inningID,
            inningNumber,
            over,
            ball,
            strikerBatsman,
            bowler,
            runs,
            extras,
            wicket,
            wicketType,
            fielderName

        }
        alert('Delivery details submitted');
        console.log(deliveryDetails);
        if(dismissal !== 'None'){
            if(onStrike === true){
                strikerBatsman = nextBatsman;
            }
            else{
                nonStrikerBatsman = nextBatsman;
            }
        }
        if(ball === 6){
            console.log(nextBowler);
            bowler = nextBowler;
            console.log(runs);
            console.log(runs%2);
            if(runs%2 === 0){
                let temp = strikerBatsman;
                strikerBatsman = nonStrikerBatsman;
                nonStrikerBatsman = temp;
            }
            over = over + 1;
        }
        router.push({
            pathname:`/match/innings/firstInnings/${matchID}`,
            query:{
            totalRuns: totalRuns,
            strikerBatsman: strikerBatsman,
            nonStrikerBatsman: nonStrikerBatsman,
            bowler: bowler,
            inningID: inningID,
            inningNumber: inningNumber,
            battingTeam: battingTeam,
            ball:ball,
            bowlingTeam: bowlingTeam,
            over: over,
            wickets: wickets
        }});
        if (dismissal !== 'None') {
            // pop up a modal to select th e next batsman
            // setShowNextBatsmanModal(true);

            // set the nextBatsman state

            // update the strikerBatsman and nonStrikerBatsman
            // update the onStrike state
        }

        // Add your logic to update the Deliveries collection here
        // Once the delivery details are submitted, update the strikerBatsman, nonStrikerBatsman, bowler, and totalOvers in the database
        // Then, redirect to the same page to input the next delivery details

    };

    const formatDisplayName = (fullName) => {
        // let nameParts = fullName.split(' ');
        // if (nameParts.length > 1) {
        //   return `${nameParts[0].charAt(0)}. ${nameParts[nameParts.length - 1]}`;
        // }
        return fullName; // Return the original name if it doesn't have a surname
      };

    
    const fetchYetToBatPlayers = (battingTeamPlayers) => {
        let yetToBatPlayers = [];
        battingTeamPlayers.map((player) => {
            if(player.playerID.fullName !== strikerBatsman && player.playerID.fullName !== nonStrikerBatsman && player.isOut === false){
                yetToBatPlayers.push(player.playerID.fullName);
            }
        })
        console.log(yetToBatPlayers)
        return yetToBatPlayers;
    }
    
    const fetchFielders = (bowlingTeamPlayers) => {
        let fielder = [];
        bowlingTeamPlayers.map((player)=> {
            fielder.push(player.playerID.fullName);
        })
        return fielder;
    }
    const dummyDeliveries = ['4', '3', '5wd', '-', '1', '2'];

    return (
        <div className={styles.container}>
            <h1 className={styles.title}>Delivery Input</h1>
            <div className={styles.matchState}>
                <h3 className={styles.matchStateTitle}>Current Match State</h3>
                <div className={styles.stats}>
                    <div className={styles.batsman}>
                        <label>Striker</label>
                        {/* Display Name as First Letter from the first word then . and whole surname */}

                        <p>{formatDisplayName(strikerBatsman)}<br/> 9(3)</p>
                    </div>
                    <div className={styles.batsman}>
                        <label>Non-Striker</label>
                        <p>{formatDisplayName(nonStrikerBatsman)} <br/>1(2)</p>
                    </div>
                    <div className={styles.bowler}>
                        <label>Bowler</label>
                        <p>{formatDisplayName(bowler)} <br/>0.5-0-15-0</p>
                    </div>
                    <div className={styles.overInfo}>
                        <label>Overs</label>
                        <p>0/{totalOvers}</p>
                    </div>
                    <div className={styles.score}>
                        <label>Score</label>
                        <p>15-1</p>
                    </div>
                </div>
            </div>

            <div className={styles.matchState}>
                <h2 className={styles.overTitle}>This Over:</h2>
                <div className={styles.balls}>
                    {dummyDeliveries.map((delivery, index) => (
                        <span key={index} className={styles.ball}>
                            {delivery}
                        </span>
                    ))}
                </div>
            </div>

            <form onSubmit={handleSubmit} className={styles.form}>
                <label htmlFor="runs" className={styles.label}>Runs Scored</label>
                <input id="runs" type="number" value={runs} onChange={(e) => setRuns(Number(e.target.value))} min="0" />

                <label htmlFor="extras" className={styles.label}>Extras</label>
                {/* keep the default value of extras as None */}
                <select id="extras" value={extras} onChange={(e) => setExtras(e.target.value)}>
                    {/* Options */}
                    {/* default option will be None */}
                    <option value="None">None</option>
                    <option value="Bye">Bye</option>
                    <option value="Leg Bye">Leg Bye</option>
                    <option value="Wide">Wide</option>
                    <option value="No Ball">No Ball</option>
                </select>


                <label htmlFor="dismissal" className={styles.label}>Dismissal Type</label>
                <select id="dismissal" value={dismissal} onChange={(e) => setDismissal(e.target.value)}>
                    {/* Options */}
                    {/* default option will be None */}
                    <option value="None">None</option>
                    <option value="Bowled">Bowled</option>
                    <option value="Caught">Caught</option>
                    <option value="LBW">LBW</option>
                    <option value="Run Out">Run Out</option>
                    <option value="Stumped">Stumped</option>
                    <option value="Hit Wicket">Hit Wicket</option>
                    <option value="Obstructing the Field">Obstructing the Field</option>
                    <option value="Retired Hurt">Retired Hurt</option>
                    <option value="Retired Out">Retired Out</option>
                </select>
                {/* Conditional rendering for 'Caught' dismissal */}
                {dismissal === 'Caught' && (
                    <div>
                    <label htmlFor="Caught" className={styles.label}>Fielder's Name</label>
                    <select>
                        {
                            fetchFielders(bowlingTeamPlayers).map((player, index) => (
                                <option key={index} value={player}>{player}</option>
                            ))
                        }
                    </select>
                    </div>
                )}

                {/* Conditional rendering for 'Run Out' dismissal */}
                {dismissal === 'Run Out' && (
                    <div>
                        <label htmlFor="dismissal" className={styles.label}>Run Out Batsman</label>
                        <select id="runOutBatsman" value={runOutBatsman} onChange={(e) => setRunOutBatsman(e.target.value)}>
                            <option>{strikerBatsman}</option>
                            <option>{nonStrikerBatsman}</option>
                        </select>
                        <label htmlFor="dismissal" className={styles.label}>Fielder's Name</label>
                        <select id="fielder" value={fielder} onChange={(e)=>setFielder(e.target.value)}>
                            {fetchFielders(bowlingTeamPlayers).map((player, index) => (
                                <option key={index} value={player}>{player}</option>
                            ))}
                        </select>
                    </div>
                )}

                {dismissal !== 'None' && (
                    <div>
                    <label htmlFor="nextBatsman" className={styles.labelCheckbox}>Select Next Batsman</label>
                    <select id="nextBatsman" value={nextBatsman} onChange={(e) => setNextBatsman(e.target.value)}>
                        {fetchYetToBatPlayers(battingTeamPlayers).map((player, index) => (
                            <option key={index} value={player}>{player}</option>
                        ))}
                    </select>
                    <div className={styles.checkboxContainer}>
                        <input
                            id="onStrike"
                            type="checkbox"
                            className={styles.checkboxInput} // Use the styled class
                             checked={onStrike === true} // Ensure proper boolean handling
                            onChange={(e) => setOnStrike(e.target.checked ? true : false)} // Update to handle true/false strings
                            required
                        />
                        <label htmlFor="onStrike" className={styles.checkboxLabel}>New Batsman On Strike? </label>
                    </div>
                </div>
                
                )}

                {ball === 5 && (extras === 'None' || extras === 'Bye' || extras === 'Leg Bye') && (
                    <div>
                        <label htmlFor="nextBowler" className={styles.label}>Choose next bowler</label>
                        <select id="nextBowler" value={nextBowler} onChange={(e) => setnextBowler(e.target.value)}>
                            {bowlingTeamPlayers.map((player, index) => (
                                <option key={index} value={player.playerID.fullName}>{player.playerID.fullName}</option>
                            ))}
                        </select>
                    </div>
                )}
                <button type="submit" className={styles.button}>Submit Delivery</button>
            </form>
        </div>
    );
};

export default DeliveryInput;
