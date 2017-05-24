import React, { Component } from 'react';
import Promise from 'bluebird';
import Rule from './rule/rule';
import Canvas from './canvas/canvas';
import styles from './layout.css';
import drawStep from '../utils/walker';

const USER_STOP_MESSAGE = 'Stopping drawing on user request';

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
                    angle: 60,
                },
                {
                    step: true,
                    angle: 180,
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
                handleAngleChange={this.handleAngleChange}
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
