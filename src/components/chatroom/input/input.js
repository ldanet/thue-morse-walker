import React from 'react';
import styles from './input.css'

class ChatInput extends React.Component {
    render() {
        return <input className={styles.input} type="text"></input>
    }
}

export default ChatInput;
