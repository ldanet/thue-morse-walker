import React from 'react';
import styles from './message.css';

class ChatMessage extends React.Component {
    render() {
        return <li className={styles.message}>
            <span className={styles.sender}>{this.props.sender}:</span>
            <span className={styles.content}>{this.props.content}</span>
        </li>
    }
}

export default ChatMessage;
