import { useRouter } from 'next/router'
import React, { use, useEffect, useState } from 'react'
import InitialPlayersSelectionModal from '@/components/InitialPlayersSelectionModal'
import styles from './SelectBatsmanAndBowler.module.css'
import axios from 'axios'
const Index = () => {
  const router = useRouter();
  const matchID = router.query.matchID;
  const [strikerBatsman, setStrikerBatsman] = useState('');
  const [nonStrikerBatsman, setNonStrikerBatsman] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPosition, setSelectedPosition] = useState('');
  const [bowler, setBowler] = useState('');
  const [battingTeam, setBattingTeam] = useState('');
  const [bowlingTeam, setBowlingTeam] = useState('');
  const [battingTeamPlayers, setBattingTeamPlayers] = useState([]);
  const [bowlingTeamPlayers, setBowlingTeamPlayers] = useState([]);
  const [totalOvers, setTotalOvers] = useState(0);
  // useEffect to fetch the match details
  useEffect(() => {
    // fetch the match details using matchID
    const fetchMatchDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/v1/match/players/${matchID}`);
        console.log(response.data.data);
        let allPlayers = response.data.data.players;
        let battingTeam, bowlingTeam, teamAName, teamBName;
        teamAName = allPlayers[0].matchID.teamAName;
        teamBName = allPlayers[0].matchID.teamBName;
        console.log(teamAName, teamBName)
        console.log(allPlayers[0].matchID.tossWinnerName)
        console.log(allPlayers[0].matchID.tossDecision)
        if (allPlayers[0].matchID.tossDecision === 'Bat') {
          if (allPlayers[0].matchID.tossWinnerName === teamAName) {
            battingTeam = teamAName;
            bowlingTeam = teamBName;
          }
          if (allPlayers[0].matchID.tossWinnerName === teamBName) {
            battingTeam = teamBName;
            bowlingTeam = teamAName;
          }
        }
        else {
          if (allPlayers[0].matchID.tossWinnerName === teamAName) {
            battingTeam = teamBName;
            bowlingTeam = teamAName;
          }
          else {
            battingTeam = teamAName;
            bowlingTeam = teamBName;
          }
        }
        let battingTeamPlayers = [], bowlingTeamPlayers = [];
        // console.log(battingTeam, bowlingTeam);
        allPlayers.map((player) => {
          if (player.teamName === battingTeam) {
            battingTeamPlayers.push({ name: player.playerID.fullName, id: player._id });
          }
          else if(player.teamName === bowlingTeam) {
            bowlingTeamPlayers.push({ name: player.playerID.fullName, id: player._id });
          }
        })
        // console.log(battingTeam, bowlingTeam);
        console.log(bowlingTeamPlayers);
        setBattingTeam(battingTeam);
        setBowlingTeam(bowlingTeam);
        setBattingTeamPlayers(battingTeamPlayers);
        setBowlingTeamPlayers(bowlingTeamPlayers);
        setTotalOvers(allPlayers[0].matchID.numberofOvers)
        console.log(allPlayers[0].matchID.numberofOvers);
      } catch (err) {
        console.log(err)
      }
    }
    if (matchID) {
      fetchMatchDetails();
    }
  }, [matchID]);
  const handleSelectPlayer = (player) => {
    if (selectedPosition === 'striker') {
      setStrikerBatsman(player.name)
      console.log(strikerBatsman)
    }

    else if (selectedPosition === 'nonStriker') {
      setNonStrikerBatsman(player.name)
    }
    else if (selectedPosition === 'bowler') {
      setBowler(player.name)
    }
    setIsModalOpen(false)
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(strikerBatsman, nonStrikerBatsman, bowler);
      if (strikerBatsman && nonStrikerBatsman && bowler) {

        //backend call to create a new innings entry updating currentBatsman as strikerBatsman and currentBowler as bowler, battingTeam as teamA and bowlingTeam as teamB
        const response = await axios.patch(`http://localhost:5000/api/v1/match/${matchID}/innings`, {
          battingTeamName: battingTeam,
          bowlingTeamName: bowlingTeam,
          inningNumber: 1,
          totalRuns: 0,
          totalOvers: totalOvers,
          wickets: 0,
          currentStrikerBatsmenName: strikerBatsman,
          currentNonStrikerBatsmenName: nonStrikerBatsman,
          currentBowler: bowler,
        })
        console.log(response.data);
        // if the response is success, fetch the inningID from the response and redirect to the firstInnings page
        if (response.data.status === 'success') {
          const inningID = response.data.data.innings._id;
          router.push({
            pathname: `/match/innings/firstInnings/${matchID}`,
            query: {
              totalOvers: totalOvers,
              strikerBatsman: strikerBatsman,
              nonStrikerBatsman: nonStrikerBatsman,
              bowler: bowler,
              inningID: inningID,
              inningNumber: 1,
              battingTeam: battingTeam,
              ball: 0,
              bowlingTeam: bowlingTeam,
              over: 0,
              totalRuns: 0,
            },
          });
          // passing the strikerBatsman, nonStrikerBatsman, bowler, inningID, matchID, totalOvers.
          // Let's for now pass the dummy data for totalOvers as 20, strikerBatsman as "Virat Kohli", nonStrikerBatsman as "Rohit Sharma", bowler as "Mitchell Starc", inningID as 1, matchID as 1, battingTeam as "India", bowlingTeam as "Australia"

        }
      }
      else {
        alert('Please select all players')
      }
    }
    catch (err) {
        console.log(err);
      }
    }
  return (
      <div className={styles.container}>
        <form>
          <h1 className={styles.title}>Select Openers</h1>

          <div className={styles.mb4}>
            <button className={styles.button} onClick={(e) => { e.preventDefault(); setIsModalOpen(true); setSelectedPosition('striker') }}>Select Striker</button>
            {strikerBatsman && <p>Selected Striker: {strikerBatsman}</p>}
          </div>
          <div className={styles.mb4}>
            <button className={styles.button} onClick={(e) => { e.preventDefault(); setIsModalOpen(true); setSelectedPosition('nonStriker'); }} >Select Non-Striker</button>
            {nonStrikerBatsman && <p>Selected Non-Striker: {nonStrikerBatsman}</p>}
          </div>
          <h1 className={styles.title}>Select Opening Bowler</h1>
          <div className={styles.mb4}>
            <button onClick={(e) => { e.preventDefault(); setIsModalOpen(true); setSelectedPosition('bowler') }} className={styles.button}>Select Bowler</button>
            {bowler && <p>Selected Bowler: {bowler}</p>}
          </div>
          <InitialPlayersSelectionModal
            isOpen={isModalOpen}
            players={selectedPosition === 'striker' || selectedPosition === 'nonStriker' ? battingTeamPlayers : bowlingTeamPlayers}
            onSelect={handleSelectPlayer}
            onClose={() => setIsModalOpen(false)}
          />
          <button type="submit" className={styles.button} onClick={handleSubmit}>Start Match</button>
        </form>
      </div>
    )
  }

  export default Index;
