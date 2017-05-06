import React from 'react';
import styles from './discussion.css';
import Message from './message/message';

export default function Discussion(props) {
    const messages = props.messages.map(message => <Message message={message} />);

    return <ul className={styles.discussion}>{messages}</ul>;
}
