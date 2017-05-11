import React, { Component } from 'react';
import styles from './layout.css';

function convertToBase(base, num) {
    let str = '';
    let remainder = num;
    do {
        str = String(remainder % base) + str;
        remainder = Math.floor(remainder / base);
    } while (remainder >= 1);
    return str;
}

function sumDigits(digitString) {
    const digitArray = digitString.split('');
    return digitArray.reduce((sum, digit) => sum + parseInt(digit, 10), 0);
}
function getSequenceElement(base, num) {
    const digits = convertToBase(base, num);
    const digitSum = sumDigits(digits);
    return digitSum % base;
}

function drawSegment(i, ctx, { x, y, angle }, rules) {
    const base = rules.length;
    const sequenceElement = getSequenceElement(base, i);
    const { length, rotation } = rules[sequenceElement];
    const newAngle = (angle + rotation) % 360;
    const radAngle = (Math.PI / 180) * newAngle;
    const newX = x + (Math.cos(radAngle) * length);
    const newY = y + (Math.sin(radAngle) * length);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(newX, newY);
    ctx.closePath();
    ctx.stroke();

    return { x: newX, y: newY, angle: newAngle };
}

export default class Layout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isRendering: false,
            rules: [
                {
                    length: 5,
                    rotation: 60,
                },
                {
                    length: 5,
                    rotation: 180,
                },
            ],
        };
    }

    startDrawing() {
        if (this.state.isRendering === true) {
            // do nothing
        } else {
            this.state.isRendering = true;
            const canvas = document.getElementById('canvas');
            const height = canvas.height;
            const width = canvas.width;
            if (!canvas.getContext) {
                console.warn('Canvas is not supported');
            } else {
                const ctx = canvas.getContext('2d');
                let drawingState = {
                    x: width / 2,
                    y: height / 2,
                    angle: 0,
                };
                const rules = [...this.state.rules];
                for (let i = 0; i < 100; i += 1) {
                    drawingState = drawSegment(i, ctx, drawingState, rules);
                }
                this.state.isRendering = false;
            }
        }
    }

    render() {
        return (
            <div className={styles.container}>
                <canvas className={styles.canvas} id="canvas" />
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
