import React, { Component } from 'react';
import Rule from './rule/rule';
import Canvas from './canvas/canvas';
import styles from './layout.css';

export default class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            options: {
                delay: 0,
                cycles: 8,
            },
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

    render() {
        const ruleForms = this.state.rules.map((rule, index) => (
            <Rule
                key={index}
                id={index}
                ruleSet={rule}
                handleStepChange={this.handleStepChange}
                handleRotationChange={this.handleRotationChange}
            />
        ));
        return (
            <div className={styles.container}>
                <Canvas options={this.state.options} rules={this.state.rules} />
                {ruleForms}
            </div>
        );
    }

}
