import React, { Component } from 'react';
import styles from './layout.css';
import draw from '../utils/walker';

export default class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isDrawing: false,
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

    startDrawing() {
        if (!this.canvas || this.state.isDrawing === true) {
            // do nothing
        } else if (!this.canvas.getContext) {
            console.warn('Canvas is not supported');
        } else {
            this.state.isDrawing = true;
            draw(this.canvas, this.state.rules).finally(() => {
                console.log('Finished drawing');
                this.state.isDrawing = false;
            });
        }
    }

    render() {
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
                <button className={styles.button} id="stopButton">Stop</button>
            </div>
        );
    }

}
