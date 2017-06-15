import React, { Component } from 'react';
import Promise from 'bluebird';
import styles from './canvas.css';
import drawStep from '../../utils/walker';

const USER_STOP_MESSAGE = 'Stopping drawing on user request';

export default class Canvas extends Component {
    constructor(props) {
        super(props);
        this.changeCycles = this.changeCycles.bind(this);
        this.changeDelay = this.changeDelay.bind(this);
        this.startDrawing = this.startDrawing.bind(this);
        this.stopDrawing = this.stopDrawing.bind(this);
        this.state = {
            isDrawing: false,
            stopDrawing: false,
            delay: 0,
            cycles: 8,
        };
    }

    changeCycles(e) {
        this.setState({ cycles: parseInt(e.target.value, 10) });
    }

    changeDelay(e) {
        this.setState({ delay: Math.max(0, parseInt(e.target.value, 10)) });
    }

    step(...args) {
        return new Promise((resolve, reject) => {
            if (this.state.stopDrawing === true) {
                reject(new Error(USER_STOP_MESSAGE));
            } else {
                setTimeout(() => {
                    resolve(drawStep(...args));
                }, this.state.delay);
            }
        });
    }

    draw() {
        const canvas = this.canvas;
        if (!canvas || !canvas.getContext) {
            return Promise.reject();
        }
        const rules = this.props.rules.map(rule =>
            Object.assign({}, rule),
        ); // make sure drawing rules will not change
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
        for (let i = 0; i < rules.length ** this.state.cycles; i += 1) {
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
            this.setState({ isDrawing: true });
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
        let button;
        if (!this.state.isDrawing) {
            button = (<button
                className={styles.button}
                id="renderButton"
                onClick={this.startDrawing}
            >
                Draw
            </button>);
        } else {
            button = (<button
                className={styles.button}
                id="stopButton"
                onClick={this.stopDrawing}
            >
                Stop
            </button>);
        }
        return (
            <div>
                <canvas
                    className={styles.canvas}
                    ref={(canvas) => { this.canvas = canvas; }}
                    width="500"
                    height="500"
                />
                <div className={styles.controls}>
                    <div className={styles.control}>
                        <label htmlFor="cycles">
                            Number of elements: {this.props.rules.length}&nbsp;^&nbsp;
                        </label>
                        <input
                            type="number"
                            id="cycles"
                            value={this.state.cycles}
                            onChange={this.changeCycles}
                        /> = {this.props.rules.length ** this.state.cycles}
                    </div>
                    <div className={styles.control}>
                        <label htmlFor="delay">Delay: </label>
                        <input
                            type="number"
                            id="delay"
                            value={this.state.delay}
                            onChange={this.changeDelay}
                        />ms
                    </div>
                    {button}
                </div>
            </div>
        );
    }

}
