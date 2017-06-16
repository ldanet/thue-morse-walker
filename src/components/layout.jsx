import React, { Component } from 'react';
import Rule from './rule/rule';
import Canvas from './canvas/canvas';
import styles from './layout.css';

export default class Layout extends Component {
    constructor(props) {
        super(props);
        this.handleStepChange = this.handleStepChange.bind(this);
        this.handleRotationChange = this.handleRotationChange.bind(this);
        this.handleColorChange = this.handleColorChange.bind(this);
        this.handleDeleteRule = this.handleDeleteRule.bind(this);
        this.handleAddRule = this.handleAddRule.bind(this);
        this.state = {
            rules: [
                {
                    step: true,
                    rotation: 60,
                    color: { h: 350, s: 0.8, l: 0.5 },
                },
                {
                    step: true,
                    rotation: 180,
                    color: { h: 212.5, s: 0.8, l: 0.5 },
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

    handleColorChange(index, e) {
        this.setState((state) => {
            const newState = JSON.parse(JSON.stringify(state));
            newState.rules[index].color = Object.assign({}, e.hsl);
            return newState;
        });
    }

    handleDeleteRule(index) {
        const rules = [...this.state.rules];
        rules.splice(index, 1);
        this.setState({ rules });
    }

    handleAddRule() {
        const rules = [...this.state.rules];
        const newRule = Object.assign({}, rules[rules.length - 1]); // Duplicate last rule
        newRule.color = Object.assign(
            {},
            newRule.color,
            { h: (newRule.color.h + (222.5)) % 360 },
        );
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
                handleColorChange={this.handleColorChange}
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
                        <tr>
                            <th>Element</th>
                            <th>Rotate</th>
                            <th>Step</th>
                            <th>Color</th>
                            <th />
                        </tr>
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
