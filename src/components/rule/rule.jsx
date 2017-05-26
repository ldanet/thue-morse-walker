import React from 'react';
import styles from './rule.css';

export default function rule(props) {
    return (<div className={styles.rule}>
        <div className={styles.index}>{props.index}</div>
        <div className={styles.properties}>
            <div className={styles.property}>
                <label htmlFor={`angle${props.index}`}>Rotate </label>
                <input
                    type="number"
                    id={`angle${props.index}`}
                    onChange={e => props.handleRotationChange(props.index, e)}
                    value={props.ruleSet.rotation}
                /> degrees
            </div>
            <div className={styles.property}>
                <input
                    type="checkbox"
                    id={`step${props.index}`}
                    onChange={e => props.handleStepChange(props.index, e)}
                    checked={props.ruleSet.step}
                />
                <label htmlFor={`step${props.index}`}>Step</label>
            </div>
        </div>
        <div className={styles.delete}>
            <button
                title="Delete rule"
                onClick={() => props.handleDeleteRule(props.index)}
            >X</button>
        </div>
    </div>);
}
