// Importing necessary libraries and styles
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import styles from './firstinnings.module.css'; // Make sure the file name starts with a capital letter
import axios from 'axios';
const DeliveryInput = () => {
    const router = useRouter();
    const matchID = router.query.matchID;
    let { inningID,ball} = router.query;
    // State hooks for delivery details
    const [battingTeam, setBattingTeam] = useState('');
    const [bowlingTeam, setBowlingTeam] = useState('');
    let [strikerBatsman, setStrikerBatsman] = useState('');
    let [nonStrikerBatsman, setNonStrikerBatsman] = useState('');
    let [bowler,setBowler] = useState('');
    let [totalRuns,setTotalRuns] = useState(0);
    let [runs, setRuns] = useState(0);
    let [currentOver, setCurrentOver] = useState(0);
    let [wickets, setWickets] = useState(0);
    const [totalOvers,setTotalOvers] = useState(0);
    const [extras, setExtras] = useState('None');
    const [dismissal, setDismissal] = useState('None');
    const [runOutBatsman, setRunOutBatsman] = useState('');
    const [nextBatsman, setNextBatsman] = useState('');
    const [fielder, setFielder] = useState('');
    const [onStrike, setOnStrike] = useState(false);
    const [currentBall, setCurrentBall] = useState(0);
    const [currentOverDeliveries, setCurrentOverDeliveries] = useState([]);
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
                console.log(`http://localhost:5000/api/v1/match/players/${matchID}`)
                const response = await axios.get(`http://localhost:5000/api/v1/match/players/${matchID}`);
                // console.log(response.data.data.players);
                let battingteamplayers = [], bowlingteamplayers = [];
                // console.log(battingTeam);

                // console.log(response.data.data.players)
                response.data.data.players.map((player) => {
                    if(player.teamName === battingTeam){
                        battingteamplayers.push(player);
                    }
                    else if(player.teamName === bowlingTeam){
                        bowlingteamplayers.push(player);
                    }
                })
                // console.log(battingTeamPlayers);
                // console.log(bowlingTeamPlayers);
                setBattingTeamPlayers(battingteamplayers);
                setBowlingTeamPlayers(bowlingteamplayers);

            }catch(err){
              console.log(err);
            }
        }
        const updateInningStatus = async() => {
            try{
                const response = await axios.patch(`http://localhost:5000/api/v1/match/inning/${inningID}`);
                console.log(response.data.data);
            }catch(err){
                console.log(err);
            }
        }
        const fetchlatestDelivery = async() => {
            try{
                const response = await axios.get(`http://localhost:5000/api/v1/match/latestdeliverydetails?matchID=${matchID}&inningID=${inningID}`);
                console.log(response.data.data.latestDelivery[0]);
                let latestDelivery = response.data.data.latestDelivery[0];
                let batsmans = [strikerBatsman,nonStrikerBatsman];
                batsmans.forEach((batsman) => {
                    if(batsman !== latestDelivery.strikerBatsman){
                        setNonStrikerBatsman(batsman);
                    }
                    else{
                        setStrikerBatsman(batsman);
                    }
                    
                })
                setCurrentBall(latestDelivery.ball);
                setBowler(latestDelivery.bowler);
                setCurrentOver(latestDelivery.over);
                                
            }catch(err){
                console.log(err);
            }
        }
        const fetchInningDetails = async() => {
            try{
                console.log(`http://localhost:5000/api/v1/match/${matchID}/innings`)
            const response = await axios.get(`http://localhost:5000/api/v1/match/${matchID}/innings`)
            console.log(response.data.data);
            let innings = response.data.data.innings;
            if(innings.inningsStarted===false){
                console.log(innings[0]);
            setBattingTeam(innings[0].battingTeamName);
            setBowlingTeam(innings[0].bowlingTeamName);
            setTotalRuns(innings[0].totalRuns);
            setTotalOvers(innings[0].totalOvers);
            setWickets(innings[0].wickets);
            if(innings[0].inningsStarted===false){
           
            setStrikerBatsman(innings[0].currentStrikerBatsmenName);
            setNonStrikerBatsman(innings[0].currentNonStrikerBatsmenName);
            setBowler(innings[0].currentBowler);
            setCurrentOver(0)
            setCurrentBall(0);
            console.log(strikerBatsman, nonStrikerBatsman, bowler,totalRuns, currentOver);
            }
            else{
                fetchlatestDelivery();
            }
            }
            }catch(err){
                console.log(err);
            }  
        }
        
        fetchInningDetails();
        fetchlatestDelivery();  
        fetchMatchPlayers(); 
    }, [matchID]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        
        if(extras === 'None' || extras === 'Bye' || extras === 'Leg Bye'){
            ball = ball + 1;

            if(extras === 'None'){
                setCurrentOverDeliveries([...currentOverDeliveries, runs]);
            }
            else if(extras === 'Bye'){
                const byeRuns = runs+'b';
                setCurrentOverDeliveries([...currentOverDeliveries, byeRuns]);
            }
            else if(extras === 'Leg Bye'){
                const legByeRuns = runs+'lb';
                setCurrentOverDeliveries([...currentOverDeliveries, legByeRuns]);
            }

        }
        else if(extras === 'Wide' || extras === 'No Ball'){
            ball = ball;
            totalRuns = totalRuns + 1;
            if(extras === 'Wide'){
                const wideRuns = runs+'wd';
                setCurrentOverDeliveries([...currentOverDeliveries, wideRuns]);
            }
            else if(extras === 'No Ball'){
                const noBallRuns = runs+'nb';
                setCurrentOverDeliveries([...currentOverDeliveries, noBallRuns]);
            }
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
            ball=0;
            setCurrentOverDeliveries([]);
        }
        console.log(deliveryDetails)
         
        const response = await axios.patch(`http://localhost:5000/api/v1/match/${matchID}/${inningID}/delivery`, deliveryDetails);  

        console.log(response.data.data);
        if(response.data.status === 'success'){
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
        }

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
                        <p>{totalRuns}-{wickets}</p>
                    </div>
                    <div className={styles.score}>
                        <label>Over</label>
                        <p>{currentOver}</p>
                    </div>
                    <div className={styles.score}>
                        <label>Ball</label>
                        <p>{ball}</p>
                    </div>
                </div>
            </div>

            <div className={styles.matchState}>
                <h2 className={styles.overTitle}>This Over:</h2>
                <div className={styles.balls}>
                    {currentOverDeliveries.map((delivery) => (
                        <span key={delivery} className={styles.ball}>
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
