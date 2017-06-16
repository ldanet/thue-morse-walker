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
    const { step, rotation, color } = rules[sequenceElement];
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

    return { x: newX, y: newY, angle: newAngle, length, color };
}


function calculateAxisDirection(size, coordinate) {
    let direction = 0;
    if (coordinate < 0) {
        direction = -1;
    } else if (coordinate >= size) {
        direction = 1;
    }
    return direction;
}

function calculateResizedCoord(coordinate, direction, size, amount = 2) {
    // assume default center position
    return ((coordinate / amount) + ((size / 2) - ((size / amount) / 2)))
        + (-direction * ((size / 2) - ((size / amount) / 2)));
}

function calculateResizing(height, width, coords, newCoords, amount) {
    let rAmount = amount;
    const rCoords = Object.assign({}, coords);
    const rNewCoords = Object.assign({}, newCoords);
    const rDirection = {
        x: calculateAxisDirection(width, rNewCoords.x),
        y: calculateAxisDirection(height, rNewCoords.y),
    };

    while (
        rNewCoords.x < 0 || rNewCoords.x > width ||
        rNewCoords.y < 0 || rNewCoords.y > height
    ) {
        rAmount *= 2;
        rNewCoords.length /= 2;

        rCoords.x = calculateResizedCoord(rCoords.x, rDirection.x, width);
        rNewCoords.x = calculateResizedCoord(rNewCoords.x, rDirection.x, width);

        rCoords.y = calculateResizedCoord(rCoords.y, rDirection.y, height);
        rNewCoords.y = calculateResizedCoord(rNewCoords.y, rDirection.y, height);
    }
    return {
        coords: rCoords,
        newCoords: rNewCoords,
        amount: rAmount,
        resizeDirection: rDirection,
    };
}

function resizeCanvas(ctx, width, height, { x, y }, amount) {
    return new Promise((resolve, reject) => {
        if (amount !== 1) {
            const translateX = calculateResizedCoord(0, x, width, amount);
            const translateY = calculateResizedCoord(0, y, height, amount);
            const img = new Image();
            const canvasData = ctx.canvas.toDataURL();
            img.onload = function onload() {
                try {
                    ctx.clearRect(0, 0, width, height);
                    ctx.drawImage(img, translateX, translateY, width / amount, height / amount);
                    ctx.lineWidth /= amount;
                    resolve();
                } catch (err) {
                    reject(err);
                }
            };
            img.src = canvasData;
        } else {
            resolve();
        }
    });
}

function drawSegment(ctx, { x: oldX, y: oldY }, { x: newX, y: newY, color }) {
    ctx.beginPath();
    ctx.strokeStyle = `hsl(${color.h},${color.s * 100}%,${color.l * 100}%)`;
    ctx.moveTo(oldX, oldY);
    ctx.lineTo(newX, newY);
    ctx.closePath();
    ctx.stroke();
}

export default function drawStep({ ctx, i, coords: coordinates, rules }) {
    return new Promise((resolve, reject) => {
        const height = ctx.canvas.height;
        const width = ctx.canvas.width;
        let coords = coordinates;
        let amount = 1;
        let resizeDirection = 0;
        let newCoords = calculateNextStep(i, coords, rules);
        ({
            coords,
            newCoords,
            amount,
            resizeDirection,
        } = calculateResizing(height, width, coords, newCoords, 1));
        resizeCanvas(ctx, width, height, resizeDirection, amount).then(() => {
            drawSegment(ctx, coords, newCoords);
            resolve({ ctx, i: i + 1, coords: newCoords, rules });
        }).catch(err => reject(err));
    });
}
