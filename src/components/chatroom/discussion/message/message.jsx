import React from 'react';
import styles from './message.css';

export default function Message(props) {
    return (<li className={styles.message}>
        <span className={styles.sender}>{props.sender}:</span>
        <span className={styles.content}>{props.content}</span>
    </li>);
}
