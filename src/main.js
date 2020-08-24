// Define constants
const CARTESIAN_MIN = 2;
const CARTESIAN_MAX = 120;
const CARTESIAN_STEP = 2;
const POLAR_CIRC_MIN = 1;
const POLAR_CIRC_MAX = 12;
const POLAR_CIRC_STEP = 1;
const POLAR_CIRCSUB_MIN = 0;
const POLAR_CIRCSUB_MAX = 5;
const POLAR_CIRCSUB_STEP = 1;
const POLAR_ANGLE_MIN = 0;
const POLAR_ANGLE_MAX = 16;
const POLAR_ANGLE_STEP = 4;
const POLAR_ANGLESUB_MIN = 0;
const POLAR_ANGLESUB_MAX = 4;
const POLAR_ANGLESUB_STEP = 1;
const STROKE_BASE = 2;
const AXIS_FACTOR = 4;
const MAJOR_FACTOR = 2.5;
const SUB_FACTOR = 4;

// Set HTML elements
let cartesian = document.getElementById('cartesian');
let polar = document.getElementById('polar');

let settingsCartesian = document.getElementById('settings-cartesian');
let numXBox = document.getElementById('numX-box');
let numYBox = document.getElementById('numY-box');
let numXSlider = document.getElementById('numX-slider');
numXSlider.min = CARTESIAN_MIN;
numXSlider.max = CARTESIAN_MAX;
numXSlider.step = CARTESIAN_STEP;
let numYSlider = document.getElementById('numY-slider');
numYSlider.min = CARTESIAN_MIN;
numYSlider.max = CARTESIAN_MAX;
numYSlider.step = CARTESIAN_STEP;
let squareCheck = document.getElementById('square');
let axisCheck = document.getElementById('axis');

let settingsPolar = document.getElementById('settings-polar');
let numCircBox = document.getElementById('numCirc-box');
let numCircSubBox = document.getElementById('numCircSub-box');
let numAngleBox = document.getElementById('numAngle-box');
let numAngleSubBox = document.getElementById('numAngleSub-box');
let numCircSlider = document.getElementById('numCirc-slider');
numCircSlider.min = POLAR_CIRC_MIN;
numCircSlider.max = POLAR_CIRC_MAX;
numCircSlider.step = POLAR_CIRC_STEP;
let numCircSubSlider = document.getElementById('numCircSub-slider');
numCircSubSlider.min = POLAR_CIRCSUB_MIN;
numCircSubSlider.max = POLAR_CIRCSUB_MAX;
numCircSubSlider.step = POLAR_CIRCSUB_STEP;
let numAngleSlider = document.getElementById('numAngle-slider');
numAngleSlider.min = POLAR_ANGLE_MIN;
numAngleSlider.max = POLAR_ANGLE_MAX;
numAngleSlider.step = POLAR_ANGLE_STEP;
let numAngleSubSlider = document.getElementById('numAngleSub-slider');
numAngleSubSlider.min = POLAR_ANGLESUB_MIN;
numAngleSubSlider.max = POLAR_ANGLESUB_MAX;
numAngleSubSlider.step = POLAR_ANGLESUB_STEP;

let color = document.getElementById('color');
let dimensions = document.getElementById('dimensions');

let mode = 'cartesian';
let lastChange = 'x';
let lastX = numXBox.value;
let lastY = numYBox.value;
let lastCirc = numCircBox.value;
let lastCircSub = numCircSubBox.value;
let lastAngle = numAngleBox.value;
let lastAngleSub = numAngleSubBox.value;

// HTML element functionality
window.onload = (e) => {
    cartesian.click();
    updateGraph();
};

window.onbeforeprint = (e) => {
    if (dimensions.value == "1:1") {
        let graph = document.getElementById("graph");
        graph.style.marginLeft = graph.style.marginRight = "0.5in";
        graph.style.width = "calc(100% - 1in)";
    }
}

window.onafterprint = (e) => {
    graph.style.marginLeft = graph.style.marginright = "0";
    graph.style.width = "100%";
}

cartesian.onclick = (e) => {
    mode = 'cartesian';
    cartesian.style.opacity = 1;
    settingsCartesian.style.display = 'block';
    polar.style.opacity = null;
    settingsPolar.style.display = 'none';
    dimensions.value = "3:4";
    updateGraph();
};

polar.onclick = (e) => {
    mode = 'polar';
    cartesian.style.opacity = null;
    settingsCartesian.style.display = 'none';
    polar.style.opacity = 1;
    settingsPolar.style.display = 'block';
    dimensions.value = "1:1";
    updateGraph();
};

function parseBox(box, last, min, max, step) {
    if (isNaN(box.value)) {
        box.value = last;
    } else if (box.value < min) {
        box.value = min;
    } else if (box > max) {
        box.value = max;
    }
    box.value = Math.floor(box.value / step) * step;
}

numXBox.addEventListener('keyup', (e) => {
    if (e.keyCode == 13) {
        parseBox(numXBox, lastX, CARTESIAN_MIN, CARTESIAN_MAX, CARTESIAN_STEP);
        updateGraph('numX');
    }
});

numXSlider.oninput = (e) => {
    numXBox.value = numXSlider.value;
    updateGraph('numX');
};

numYBox.addEventListener('keyup', (e) => {
    if (e.keyCode == 13) {
        parseBox(numYBox, lastY, CARTESIAN_MIN, CARTESIAN_MAX, CARTESIAN_STEP);
        updateGraph('numY');
    }
});

numYSlider.oninput = (e) => {
    numYBox.value = numYSlider.value;
    updateGraph('numY');
};

squareCheck.oninput = (e) => {
    updateGraph('square');
};

axisCheck.oninput = (e) => {
    updateGraph();
};

numCircBox.addEventListener('keyup', (e) => {
    if (e.keyCode == 13) {
        parseBox(
            numCircBox,
            lastCirc,
            POLAR_CIRC_MIN,
            POLAR_CIRC_MAX,
            POLAR_CIRC_STEP
        );
        updateGraph();
    }
});

numCircSlider.oninput = (e) => {
    numCircBox.value = numCircSlider.value;
    updateGraph();
};

numCircSubBox.addEventListener('keyup', (e) => {
    if (e.keyCode == 13) {
        parseBox(
            numCircSubBox,
            lastCircSub,
            POLAR_CIRCSUB_MIN,
            POLAR_CIRCSUB_MAX,
            POLAR_CIRCSUB_STEP
        );
        updateGraph();
    }
})

numCircSubSlider.oninput = (e) => {
    numCircSubBox.value = numCircSubSlider.value;
    updateGraph();
}

numAngleBox.addEventListener('keyup', (e) => {
    if (e.keyCode == 13) {
        parseBox(
            numAngleBox,
            lastAngle,
            POLAR_ANGLE_MIN,
            POLAR_ANGLE_MAX,
            POLAR_ANGLE_STEP
        );
        updateGraph();
    }
});

numAngleSlider.oninput = (e) => {
    numAngleBox.value = numAngleSlider.value;
    updateGraph();
};

numAngleSubBox.addEventListener('keyup', (e) => {
    if (e.keyCode == 13) {
        parseBox(
            numAngleSubBox,
            lastAngleSub,
            POLAR_ANGLESUB_MIN,
            POLAR_ANGLESUB_MAX,
            POLAR_ANGLESUB_STEP
        );
        updateGraph();
    }
});

numAngleSubSlider.oninput = (e) => {
    numAngleSubBox.value = numAngleSubSlider.value;
    updateGraph();
};

color.oninput = (e) => {
    updateGraph();
};

dimensions.oninput = (e) => {
    updateGraph();
};

// Graph generation
function updateGraph(name) {
    let widthRatio = 3;
    let heightRatio = 4;
    let width = 3000;
    let height = 4000;
    if (dimensions.value == '1:1') {
        widthRatio = 1;
        heightRatio = 1;
        width = 4000;
        height = 4000;
    }

    if (mode == 'cartesian') {
        if (name == 'numX') {
            lastChange = 'x';
        }

        if (name == 'numY') {
            lastChange = 'y';
        }

        if (squareCheck.checked) {
            let factor = Math.floor(numXBox.value / widthRatio);
            if (lastChange == 'y') {
                factor = Math.floor(numYBox.value / heightRatio);
            }
            factor = Math.floor(factor / CARTESIAN_STEP) * CARTESIAN_STEP;
            factor = Math.min(
                factor,
                Math.floor(CARTESIAN_MAX / Math.max(widthRatio, heightRatio))
            );
            factor = Math.max(
                factor,
                Math.floor(CARTESIAN_MIN / Math.min(widthRatio, heightRatio)) +
                    CARTESIAN_STEP
            );
            numXBox.value = factor * widthRatio;
            numYBox.value = factor * heightRatio;
        }

        let numX = numXBox.value;
        let numY = numYBox.value;

        numXSlider.value = lastX = numX;
        numYSlider.value = lastY = numY;

        renderCartesian(
            numX,
            numY,
            width,
            height,
            axisCheck.checked,
            color.value
        );
    }

    if (mode == 'polar') {
        let numCirc = numCircBox.value;
        let numCircSub = numCircSubBox.value;
        let numAngle = numAngleBox.value;
        let numAngleSub = numAngleSubBox.value;

        numCircSlider.value = lastCirc = numCirc;
        numCircSubSlider.value = lastCircSub = numCircSub;
        numAngleSlider.value = lastAngle = numAngle;
        numAngleSubSlider.value = lastAngleSub = numAngleSub;

        renderPolar(numCirc, numCircSub, numAngle, numAngleSub, width, height, color.value);
    }
}

function renderCartesian(numX, numY, width, height, axis, color) {
    d3.select('#graph-container').html('');

    let graph = d3
        .select('#graph-container')
        .append('svg')
        .attr('id', 'graph')
        .attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMidYMid meet');

    for (let x = 0; x <= numX; x++) {
        let stroke = STROKE_BASE;
        if (axis && x == numX / 2) {
            stroke *= AXIS_FACTOR;
        }
        let pos = x * (width - stroke) / numX;
        graph
            .append('rect')
            .attr('x', pos)
            .attr('y', STROKE_BASE)
            .attr('height', height-2*STROKE_BASE)
            .attr('width', stroke)
            .attr('fill', color)
            .attr('shape-rendering', 'geometricPrecision');
    }

    for (let y = 0; y <= numY; y++) {
        let stroke = STROKE_BASE;
        if (axis && y == numY / 2) {
            stroke *= AXIS_FACTOR;
        }
        let pos = y * (height - stroke) / numY;
        graph
            .append('rect')
            .attr('x', STROKE_BASE)
            .attr('y', pos)
            .attr('height', stroke)
            .attr('width', width-2*STROKE_BASE)
            .attr('fill', color)
            .attr('shape-rendering', 'geometricPrecision');
    }
}

function renderPolar(numCirc, numCircSub, numAngle, numAngleSub, width, height, color) {
    d3.select('#graph-container').html('');

    let graph = d3
        .select('#graph-container')
        .append('svg')
        .attr('id', 'graph')
        .attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMidYMid meet')
        .attr('overflow', 'hidden');

    let r = Math.max(width, height) / 2 - 2 * STROKE_BASE;
    let cx = width / 2;
    let cy = height / 2;
    let circFreq = parseInt(numCircSub) + 1;
    let totalCirc = circFreq * numCirc;
    let angleFreq = parseInt(numAngleSub) + 1;
    let totalAngle = angleFreq * numAngle;

    for (let c = 1; c <= totalCirc; c++) {
        let stroke = STROKE_BASE / SUB_FACTOR;
        if (c % circFreq == 0) {
            stroke = STROKE_BASE * MAJOR_FACTOR;
        }
        graph
            .append('circle')
            .attr('cx', cx)
            .attr('cy', cy)
            .attr('r', r * c / totalCirc)
            .attr('stroke', color)
            .attr('stroke-width', stroke)
            .attr('fill', 'transparent')
            .attr('shape-rendering', 'geometricPrecision');
    }

    for (let a = 0; a < totalAngle; a++) {
        let stroke = STROKE_BASE / SUB_FACTOR;
        if (a % angleFreq == 0) {
            stroke = STROKE_BASE * MAJOR_FACTOR;
        }
        graph
            .append('line')
            .attr('x1', cx)
            .attr('y1', cy)
            .attr('x2', cx + r * Math.cos(a * 2 * Math.PI / totalAngle))
            .attr('y2', cy + r * Math.sin(a * 2 * Math.PI / totalAngle))
            .attr('stroke', color)
            .attr('stroke-width', stroke)
            .attr('shape-rendering', 'geometricPrecision');
    }
}
