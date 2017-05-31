import React, { Component } from 'react';
import Rule from './rule/rule';
import Canvas from './canvas/canvas';
import styles from './layout.css';

export default class Layout extends Component {
    constructor(props) {
        super(props);
        this.handleStepChange = this.handleStepChange.bind(this);
        this.handleRotationChange = this.handleRotationChange.bind(this);
        this.handleDeleteRule = this.handleDeleteRule.bind(this);
        this.handleAddRule = this.handleAddRule.bind(this);
        this.state = {
            rules: [
                {
                    step: true,
                    rotation: 60,
                },
                {
                    step: true,
                    rotation: 180,
                },
            ],
        };
    }

    handleStepChange(index, e) {
        const rules = [...this.state.rules];
        rules[index].step = e.target.checked;
        this.setState({ rules });
    }

    handleRotationChange(index, e) {
        const rules = [...this.state.rules];
        rules[index].rotation = parseInt(e.target.value, 10);
        this.setState({ rules });
    }

    handleDeleteRule(index) {
        console.log(index);
        const rules = [...this.state.rules];
        rules.splice(index, 1);
        this.setState({ rules });
    }

    handleAddRule() {
        const rules = [...this.state.rules];
        const newRule = Object.assign({}, rules[rules.length - 1]); // Duplicate last rule
        rules.push(newRule);
        this.setState({ rules });
    }

    render() {
        const ruleForms = this.state.rules.map((rule, index) => (
            <Rule
                key={index}
                index={index}
                ruleSet={rule}
                handleStepChange={this.handleStepChange}
                handleRotationChange={this.handleRotationChange}
                handleDeleteRule={this.handleDeleteRule}
            />
        ));
        return (
            <div className={styles.container}>
                <h1>Thue-Morse walker</h1>
                <Canvas options={this.state.options} rules={this.state.rules} />
                <h2>Rules</h2>
                <table>
                    <thead>
                        <tr><th>Element</th><th>Rotation</th><th>Step</th><th /></tr>
                    </thead>
                    <tbody>
                        {ruleForms}
                    </tbody>
                </table>
                <button title="Add rule" onClick={this.handleAddRule}>+</button>
            </div>
        );
    }
}
