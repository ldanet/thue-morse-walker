import React, { Component } from 'react';
import Promise from 'bluebird';
import Rule from './rule/rule';
import styles from './layout.css';
import drawStep from '../utils/walker';

const USER_STOP_MESSAGE = 'Stopping drawing on user request';

export default class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDrawing: false,
            stopDrawing: false,
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

    step(...args) {
        if (this.state.stopDrawing === true) {
            return Promise.reject(new Error(USER_STOP_MESSAGE));
        }
        return drawStep(...args);
    }

    draw() {
        return new Promise((resolve, reject) => {
            const canvas = this.canvas;
            if (!canvas || !canvas.getContext) {
                reject();
            } else {
                const rules = [...this.state.rules]; // make sure drawing rules are will not change
                const height = canvas.height;
                const width = canvas.width;
                const ctx = canvas.getContext('2d');

                ctx.clearRect(0, 0, width, height); // clear canvas before starting new drawing
                ctx.lineWidth = 8;

                const coords = {
                    x: width / 2,
                    y: height / 2,
                    angle: 0,
                    length: 64,
                };

                let promise = Promise.resolve({ ctx, i: 0, coords, rules });
                for (let i = 0; i < 2 ** 8; i += 1) {
                    promise = promise.then((...args) => this.step(...args));
                }
                promise.then(resolve).catch(reject);
            }
        });
    }

    startDrawing() {
        if (!this.canvas || this.state.isDrawing === true) {
            // do nothing
        } else if (!this.canvas.getContext) {
            console.warn('Canvas is not supported');
        } else {
            this.state.isDrawing = true;
            this.draw(this.canvas, this.state.rules)
            .catch(
                (err) => {
                    if (err.message === USER_STOP_MESSAGE) {
                        console.log(USER_STOP_MESSAGE);
                    } else {
                        console.error(err);
                    }
                })
            .finally(() => {
                console.log('Finished drawing');
                this.state.isDrawing = false;
                this.state.stopDrawing = false;
            });
        }
    }

    stopDrawing() {
        if (this.state.isDrawing) {
            this.state.stopDrawing = true;
        }
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
                <canvas
                    className={styles.canvas}
                    ref={(canvas) => { this.canvas = canvas; }}
                />
                <button
                    className={styles.button}
                    id="renderButton"
                    onClick={() => this.startDrawing()}
                >
                    Draw
                </button>
                <button
                    className={styles.button}
                    id="stopButton"
                    onClick={() => this.stopDrawing()}
                >
                    Stop
                </button>
                {ruleForms}
            </div>
        );
    }

}
