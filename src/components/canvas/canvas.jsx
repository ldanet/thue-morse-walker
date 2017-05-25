import React, { Component } from 'react';
import Promise from 'bluebird';
import styles from './canvas.css';
import drawStep from '../../utils/walker';

const USER_STOP_MESSAGE = 'Stopping drawing on user request';

export default class Canvas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDrawing: false,
            stopDrawing: false,
        };
    }

    step(...args) {
        if (this.setState.stopDrawing === true) {
            return Promise.reject(new Error(USER_STOP_MESSAGE));
        }
        return drawStep(...args);
    }

    draw() {
        const canvas = this.canvas;
        if (!canvas || !canvas.getContext) {
            return Promise.reject();
        }
        const rules = [...this.props.rules]; // make sure drawing rules will not change
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
        for (let i = 0; i < 2 ** this.props.options.cycles; i += 1) {
            promise = promise.then((...args) => this.step(...args));
        }
        return promise;
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
                this.setState({ isDrawing: false });
                this.setState({ stopDrawing: false });
            });
        }
    }

    stopDrawing() {
        if (this.state.isDrawing) {
            this.setState({ stopDrawing: true });
        }
    }

    render() {
        return (
            <div>
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
            </div>
        );
    }

}
