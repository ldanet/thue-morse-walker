import React from 'react';
import FloatInput from '../floatInput/floatInput';
import ColorPicker from '../colorPicker/colorPicker';
import styles from './rule.css';

export default function rule(props) {
    return (<tr className={styles.rule}>
        <td className={styles.index}>{props.index}</td>
        <td className={styles.property}>
            <FloatInput
                id={`angle${props.index}`}
                onChange={e => props.handleRotationChange(props.index, e)}
                value={props.ruleSet.rotation}
            />°
        </td>
        <td className={styles.property}>
            <input
                type="checkbox"
                id={`step${props.index}`}
                onChange={e => props.handleStepChange(props.index, e)}
                checked={props.ruleSet.step}
            />
        </td>
        <td className={styles.color}>
            <ColorPicker
                index={props.index}
                color={props.ruleSet.color}
                handleColorChange={props.handleColorChange}
            />
        </td>
        <td className={styles.delete}>
            <button
                title="Delete rule"
                onClick={() => props.handleDeleteRule(props.index)}
                disabled={!props.deleteable}
            >X</button>
        </td>
    </tr>);
}
