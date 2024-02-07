import { useRouter } from 'next/router'
import React, { useState } from 'react'
import InitialPlayersSelectionModal from '@/components/InitialPlayersSelectionModal'
import styles from './SelectBatsmanAndBowler.module.css'
const Index = () => {
  const router = useRouter();
  const matchID = router.query.matchID;
  const [strikerBatsman, setStrikerBatsman] = useState('');
  const [nonStrikerBatsman, setNonStrikerBatsman] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPosition,setSelectedPosition] = useState('');
  const [bowler, setBowler] = useState('');
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
  const teamB = [
    {name: "Aaron Finch", id: 1},
    {name: "David Warner", id: 2},
    {name: "Steve Smith", id: 3},
    {name: "Glenn Maxwell", id: 4},
    {name: "Marcus Stoinis", id: 5},
    {name: "Mitchell Starc", id: 6},
    {name: "Pat Cummins", id: 7},
    {name: "Adam Zampa", id: 8},
    {name: "Josh Hazlewood", id: 9},
    {name: "Marnus Labuschagne", id: 10},
    {name: "Alex Carey", id: 11},
  ]
  const handleSelectPlayer = (player) => {
    if(selectedPosition  === 'striker'){
      setStrikerBatsman(player.name)
      console.log(strikerBatsman)
    }
      
    else if(selectedPosition  === 'nonStriker'){
      setNonStrikerBatsman(player.name)
    }
    else if(selectedPosition === 'bowler'){
      setBowler(player.name)
    }
    setIsModalOpen(false)
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(strikerBatsman, nonStrikerBatsman, bowler);
    if(strikerBatsman && nonStrikerBatsman && bowler){

      //backend call to create a new innings entry updating currentBatsman as strikerBatsman and currentBowler as bowler, battingTeam as teamA and bowlingTeam as teamB
      // passing the strikerBatsman, nonStrikerBatsman, bowler, inningID, matchID, totalOvers.
      // Let's for now pass the dummy data for totalOvers as 20, strikerBatsman as "Virat Kohli", nonStrikerBatsman as "Rohit Sharma", bowler as "Mitchell Starc", inningID as 1, matchID as 1, battingTeam as "India", bowlingTeam as "Australia"
      router.push({
        pathname: `/match/innings/firstInnings/${matchID}`,
        query: {
          totalOvers: 20,
          strikerBatsman: "Virat Kohli",
          nonStrikerBatsman: "Rohit Sharma",
          bowler: "Mitchell Starc",
          inningID: 1,
          battingTeam: "India",
          bowlingTeam: "Australia",
        },
      });
    }
    else{
      alert('Please select all players')
    }
  }
  return (
    <div className="container mx-auto px-4">
      <form>
        <h1 className="text-3xl font-bold text-center my-4">Select Openers</h1>

        <div className="mb-4">
          <button onClick={(e)=>{e.preventDefault();setIsModalOpen(true);setSelectedPosition('striker')}}>Select Striker</button>
          {strikerBatsman && <p>Selected Striker: {strikerBatsman}</p>}
        </div>
        <div className="mb-4">
          <button onClick={(e) => {e.preventDefault(); setIsModalOpen(true); setSelectedPosition('nonStriker'); }}>Select Non-Striker</button>
          {nonStrikerBatsman && <p>Selected Non-Striker: {nonStrikerBatsman}</p>}
        </div>
        <h1 className="text-3xl font-bold text-center my-4">Select Opening Bowler</h1>
        <div className="mb-4">
          <button onClick={(e)=>{e.preventDefault();setIsModalOpen(true);setSelectedPosition('bowler')}}>Select Bowler</button>
          {bowler && <p>Selected Bowler: {bowler}</p>}
        </div>
        <InitialPlayersSelectionModal
        isOpen={isModalOpen}
        players={selectedPosition === 'striker' || selectedPosition==='nonStriker' ? teamA : teamB}
        onSelect={handleSelectPlayer}
        onClose={() => setIsModalOpen(false)}
      />
        <button type="submit" className="btn-primary" onClick={handleSubmit}>Start Match</button>
      </form>
    </div>
  )
}

export default Index;
