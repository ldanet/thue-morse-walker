import React from 'react';
import styles from './rule.css';

export default function rule(props) {
    return (<div className={styles.rule}>
        <div className={styles.id}>{props.id}</div>
        <div className={styles.properties}>
            <div className={styles.property}>
                <label htmlFor={`angle${props.id}`}>Rotate</label>
                <input
                    type="number"
                    id={`angle${props.id}`}
                    onChange={props.handleAngleChange}
                    value={props.ruleSet.rotation}
                /> degrees
            </div>
            <div className={styles.property}>
                <input
                    type="checkbox"
                    id={`step${props.id}`}
                    onChange={props.handleStepChange}
                    checked={props.ruleSet.step}
                />
                <label htmlFor={`step${props.id}`}>Step</label>
            </div>
        </div>
        <div className={styles.delete}>
            <button title="Delete rule" onClick={props.handleDeleteRule}>X</button>
        </div>
    </div>);
}
