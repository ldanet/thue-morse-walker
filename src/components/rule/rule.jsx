import React from 'react';
import styles from './rule.css';

export default function rule(props) {
    return (<form className={styles.rule}>
        <label htmlFor={`angle${props.id}`}>Angle</label>
        <input
            type="number"
            id={`angle${props.id}`}
            onChange={props.handleAngleChange}
            value={props.ruleSet.angle}
        />
        <br />
        <input
            type="checkbox"
            id={`step${props.id}`}
            onChange={props.handleStepChange}
            checked={props.ruleSet.step}
        />
        <label htmlFor={`step${props.id}`}>Step</label>
        <button onClick={props.handleDeleteRule}>Delete rule</button>
    </form>);
}
