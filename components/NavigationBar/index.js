import Link from 'next/link';
import React from 'react';
import styles from './NavigationBar.module.css';
const NavigationBar = () => {
    return (
        <div className={styles.navigationBar}>
            <Link href="/live">
                <button className={`${styles.button} ${styles.active}`}>Live Cricket Scores</button>
            </Link>
            <Link href="/upcoming">
                <button className={styles.button}>Upcoming</button>
            </Link>
            <Link href="/results">
                <button className={styles.button}>Results</button>
            </Link>
        </div>
    );
};

export default NavigationBar;
