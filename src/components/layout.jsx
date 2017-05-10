import React from 'react';
import styles from './layout.css';

export default function Layout() {
    return (
        <div className={styles.container}>
            <canvas className={styles.canvas} type="text" />
            <button className={styles.button} id="renderButton">Render</button>
            <button className={styles.button} id="stopButton">Stop</button>
        </div>
    );
}
