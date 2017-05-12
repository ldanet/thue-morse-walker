import React, { Component } from 'react';
import styles from './layout.css';
import draw from '../utils/walker';

export default class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRendering: false,
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
        if (!this.canvas || this.state.isRendering === true) {
            // do nothing
        } else if (!this.canvas.getContext) {
            console.warn('Canvas is not supported');
        } else {
            this.state.isRendering = true;
            draw(this.canvas, this.state.rules).finally(() => {
                console.log('Finished drawing');
                this.state.isRendering = false;
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
                    Render
                </button>
                <button className={styles.button} id="stopButton">Stop</button>
            </div>
        );
    }

}
