import Promise from 'bluebird';

function convertToBase(base, num) {
    const digits = [];
    let remainder = num;
    do {
        digits.unshift(remainder % base);
        remainder = Math.floor(remainder / base);
    } while (remainder > 0);
    return digits;
}

function sumDigits(digitArray) {
    return digitArray.reduce((sum, digit) => sum + digit, 0);
}
function getSequenceElement(base, num) {
    const digits = convertToBase(base, num);
    const digitSum = sumDigits(digits);
    return digitSum % base;
}

function calculateNextStep(i, { x, y, angle, length }, rules) {
    const base = rules.length;
    const sequenceElement = getSequenceElement(base, i);
    const { step, rotation } = rules[sequenceElement];
    const newAngle = (angle + rotation) % 360;
    let newX;
    let newY;

    if (step) {
        const radAngle = (Math.PI / 180) * newAngle;
        newX = x + (Math.cos(radAngle) * length);
        newY = y + (Math.sin(radAngle) * length);
    } else {
        newX = x;
        newY = y;
    }

    return { x: newX, y: newY, angle: newAngle, length };
}

function drawSegment(ctx, { x: oldX, y: oldY }, { x: newX, y: newY }) {
    ctx.beginPath();
    ctx.moveTo(oldX, oldY);
    ctx.lineTo(newX, newY);
    ctx.closePath();
    ctx.stroke();
}


export default function draw(canvas, ruleSet) {
    return new Promise((resolve, reject) => {
        if (!canvas || !canvas.getContext) {
            reject();
        } else {
            const height = canvas.height;
            const width = canvas.width;
            const ctx = canvas.getContext('2d');

            ctx.clearRect(0, 0, width, height);

            let drawingState = {
                x: width / 2,
                y: height / 2,
                angle: 0,
                length: 64,
            };
            let newDrawingState;
            const rules = [...ruleSet]; // make sure rules are not changed while drawing
            for (let i = 0; i < 2 ** 8; i += 1) {
                newDrawingState = calculateNextStep(i, drawingState, rules);
                drawSegment(ctx, drawingState, newDrawingState);
                drawingState = newDrawingState;
            }
            resolve();
        }
    });
}
