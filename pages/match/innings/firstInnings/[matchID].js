// Importing necessary libraries and styles
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import styles from './firstinnings.module.css'; // Make sure the file name starts with a capital letter
import NextBatsmanModal from '@/components/NextBatsmanModal'; // Ensure the path is correct
const DeliveryInput = () => {
    const router = useRouter();
    const { totalOvers, strikerBatsman, nonStrikerBatsman, bowler, inningID, battingTeam, bowlingTeam } = router.query;

    // State hooks for delivery details
    const [runs, setRuns] = useState(0);
    const [extras, setExtras] = useState('None');
    const [dismissal, setDismissal] = useState('None');
    const [runOutBatsman, setRunOutBatsman] = useState('');
    const [nextBatsman, setNextBatsman] = useState('');
    const [catchBy, setCatchBy] = useState('');
    const [fielder, setFielder] = useState('');
    const [onStrike, setOnStrike] = useState(strikerBatsman);
    const [showNextBatsmanModal, setShowNextBatsmanModal] = useState(false);
    const [currentOverDeliveries, setCurrentOverDeliveries] = useState([]);
    const [currentOver, setCurrentOver] = useState(0);
    // Form submission handler
    const handleSubmit = (e) => {
        e.preventDefault();
        alert('Delivery details submitted');
        if (dismissal !== 'None') {
            // pop up a modal to select th e next batsman
            setShowNextBatsmanModal(true);
            // set the nextBatsman state

            // update the strikerBatsman and nonStrikerBatsman
            // update the onStrike state
        }

        // Add your logic to update the Deliveries collection here
        // Once the delivery details are submitted, update the strikerBatsman, nonStrikerBatsman, bowler, and totalOvers in the database
        // Then, redirect to the same page to input the next delivery details

    };

    const handleDismissalChange = (e) => {
        setDismissal(e.target.value);

        setCatchBy('');
        setRunOutBatsman('');
        setFielder('');

        if (e.target.value === 'Run Out') {
            // set the runOutBatsman and fielder
        }
        else if (e.target.value === 'Caught') {
            // set the runOutBatsman and fielder
        }
    };
    const formatDisplayName = (fullName) => {
        const nameParts = fullName.split(' ');
        if (nameParts.length > 1) {
          return `${nameParts[0].charAt(0)}. ${nameParts[nameParts.length - 1]}`;
        }
        return fullName; // Return the original name if it doesn't have a surname
      };

    
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
                        <p>{formatDisplayName(bowler)} <br/>0.5-0-15-5</p>
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
                <select id="dismissal" value={dismissal} onChange={handleDismissalChange}>
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
                    <input
                        type="text"
                        placeholder="Catcher's name"
                        value={catchBy}
                        onChange={(e) => setCatchBy(e.target.value)}
                        required
                    />
                )}

                {/* Conditional rendering for 'Run Out' dismissal */}
                {dismissal === 'Run Out' && (
                    <div>
                        <input
                            type="text"
                            placeholder="Batsman run out"
                            value={runOutBatsman}
                            onChange={(e) => setRunOutBatsman(e.target.value)}
                            required
                        />
                        <input
                            type="text"
                            placeholder="Fielder's name"
                            value={fielder}
                            onChange={(e) => setFielder(e.target.value)}
                            required
                        />
                    </div>
                )}
                <button type="submit" className={styles.button}>Submit Delivery</button>
            </form>
            {showNextBatsmanModal && (
                <NextBatsmanModal
                    onClose={() => setShowNextBatsmanModal(false)}
                    onSubmit={() => {
                        // Logic to handle the new batsman selection
                        setShowNextBatsmanModal(false);
                        // Update the strikerBatsman or nonStrikerBatsman and onStrike state here
                    }}
                    onChange={(e) => setNextBatsman(e.target.value)}
                    value={nextBatsman}
                />
            )}
        </div>
    );
};

export default DeliveryInput;
