import React from 'react';
import styles from './discussion.css'
import Message from './../message/message'

class ChatDiscussion extends React.Component {
    render() {
        messages = this.props.messages.map( (message)=> return <Message message={message} />);

        return <ul className={styles.discussion}>{messages}</ul>
    }
}

export default ChatDiscussion;
