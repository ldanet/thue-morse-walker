import React from 'react';
import styles from './input.css';

export default function Input() {
    return (
        <form className={styles.form}>
            <input className={styles.input} type="text" />
            <button className={styles.button} id="sendMessageButton">Send</button>
        </form>
    );
}
