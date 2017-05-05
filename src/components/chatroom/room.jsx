import React from 'react';
import styles from './room.css';
import Discussion from './discussion/discussion';
import Input from './input/input';

export default function Room(props) {
    return (<div className={styles.room}>
        <Discussion messages={props.messages} />
        <Input />
    </div>);
}
