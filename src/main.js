// Define constants
const CARTESIAN_OPTS = { min: 2, max: 120, step: 2 };
const POLAR_CIRC_OPTS = { min: 1, max: 12, step: 1 };
const POLAR_CIRCSUB_OPTS = { min: 0, max: 5, step: 1 };
const POLAR_ANGLE_OPTS = { min: 0, max: 16, step: 4 };
const POLAR_ANGLESUB_OPTS = { min: 0, max: 5, step: 1 };
const MAIN_SIZE_OPTS = { min: 10, max: 30, step: 2 };
const SUB_SIZE_OPTS = { min: 1, max: 10, step: 1 };

// HTML elements
let cartesian = document.getElementById('cartesian');
let polar = document.getElementById('polar');

let settingsCartesian = document.getElementById('settings-cartesian');
let numXBox = document.getElementById('numX-box');
let numXSlider = document.getElementById('numX-slider');
let numYBox = document.getElementById('numY-box');
let numYSlider = document.getElementById('numY-slider');
let squareCheck = document.getElementById('square');
let axisCheck = document.getElementById('axis');

let settingsPolar = document.getElementById('settings-polar');
let numCircBox = document.getElementById('numCirc-box');
let numCircSlider = document.getElementById('numCirc-slider');
let numCircSubBox = document.getElementById('numCircSub-box');
let numCircSubSlider = document.getElementById('numCircSub-slider');
let numAngleBox = document.getElementById('numAngle-box');
let numAngleSlider = document.getElementById('numAngle-slider');
let numAngleSubBox = document.getElementById('numAngleSub-box');
let numAngleSubSlider = document.getElementById('numAngleSub-slider');

let mainSizeBox = document.getElementById('mainSize-box');
let mainSizeSlider = document.getElementById('mainSize-slider');
let subSizeBox = document.getElementById('subSize-box');
let subSizeSlider = document.getElementById('subSize-slider');
let color = document.getElementById('color');
let dimensions = document.getElementById('dimensions');

let printRule;

let mode = 'cartesian';
let lastChange = 'x';
let lastX = numXBox.value;
let lastY = numYBox.value;
let lastCirc = numCircBox.value;
let lastCircSub = numCircSubBox.value;
let lastAngle = numAngleBox.value;
let lastAngleSub = numAngleSubBox.value;
let lastMainSize = mainSizeBox.value;
let lastSubSize = subSizeBox.value;

// HTML element functionality
function applyOpts(ele, opts) {
    ele.min = opts.min;
    ele.max = opts.max;
    ele.step = opts.step;
}

window.onload = (e) => {
    applyOpts(numXSlider, CARTESIAN_OPTS);
    applyOpts(numYSlider, CARTESIAN_OPTS);
    applyOpts(numCircSlider, POLAR_CIRC_OPTS);
    applyOpts(numCircSubSlider, POLAR_CIRCSUB_OPTS);
    applyOpts(numAngleSlider, POLAR_ANGLE_OPTS);
    applyOpts(numAngleSubSlider, POLAR_ANGLESUB_OPTS);
    applyOpts(mainSizeSlider, MAIN_SIZE_OPTS);
    applyOpts(subSizeSlider, SUB_SIZE_OPTS);
    //printRule = document.styleSheets[0].cssRules[37].cssRules[2];
    cartesian.click();
    updateGraph();
    document.body.style.display = 'flex';
};

window.onbeforeprint = (e) => {
    if (dimensions.value == '1:1') {
        document.getElementById('graph').className.baseVal = 'graph1x1';
        //printRule.style.marginLeft = printRule.style.marginRight = '0.5in';
        //printRule.style.width = 'calc(100% - 1in)';
    }
};

window.onafterprint = (e) => {
    //printRule.style.marginLeft = printRule.style.marginRight = null;
    //printRule.style.width = null;
    document.getElementById('graph').className.baseVal = '';
};

function parseBox(box, last, opts) {
    if (isNaN(box.value)) {
        box.value = last;
    } else if (box.value < opts.min) {
        box.value = opts.min;
    } else if (box.value > opts.max) {
        box.value = opts.max;
    }
    box.value = Math.floor(box.value / opts.step) * opts.step;
}

cartesian.onclick = (e) => {
    mode = 'cartesian';
    cartesian.style.opacity = 1;
    settingsCartesian.style.display = 'block';
    polar.style.opacity = null;
    settingsPolar.style.display = 'none';
    dimensions.value = '3:4';
    updateGraph();
};

polar.onclick = (e) => {
    mode = 'polar';
    cartesian.style.opacity = null;
    settingsCartesian.style.display = 'none';
    polar.style.opacity = 1;
    settingsPolar.style.display = 'block';
    dimensions.value = '1:1';
    updateGraph();
};

numXBox.addEventListener('keyup', (e) => {
    if (e.keyCode == 13) {
        parseBox(numXBox, lastX, CARTESIAN_OPTS);
        updateGraph('numX');
    }
});

numXSlider.oninput = (e) => {
    numXBox.value = numXSlider.value;
    updateGraph('numX');
};

numYBox.addEventListener('keyup', (e) => {
    if (e.keyCode == 13) {
        parseBox(numYBox, lastY, CARTESIAN_OPTS);
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
        parseBox(numCircBox, lastCirc, POLAR_CIRC_OPTS);
        updateGraph();
    }
});

numCircSlider.oninput = (e) => {
    numCircBox.value = numCircSlider.value;
    updateGraph();
};

numCircSubBox.addEventListener('keyup', (e) => {
    if (e.keyCode == 13) {
        parseBox(numCircSubBox, lastCircSub, POLAR_CIRCSUB_OPTS);
        updateGraph();
    }
});

numCircSubSlider.oninput = (e) => {
    numCircSubBox.value = numCircSubSlider.value;
    updateGraph();
};

numAngleBox.addEventListener('keyup', (e) => {
    if (e.keyCode == 13) {
        parseBox(numAngleBox, lastAngle, POLAR_ANGLE_OPTS);
        updateGraph();
    }
});

numAngleSlider.oninput = (e) => {
    numAngleBox.value = numAngleSlider.value;
    updateGraph();
};

numAngleSubBox.addEventListener('keyup', (e) => {
    if (e.keyCode == 13) {
        parseBox(numAngleSubBox, lastAngleSub, POLAR_ANGLESUB_OPTS);
        updateGraph();
    }
});

numAngleSubSlider.oninput = (e) => {
    numAngleSubBox.value = numAngleSubSlider.value;
    updateGraph();
};

mainSizeBox.addEventListener('keyup', (e) => {
    if (e.keyCode == 13) {
        parseBox(mainSizeBox, lastMainSize, MAIN_SIZE_OPTS);
        updateGraph();
    }
});

mainSizeSlider.oninput = (e) => {
    mainSizeBox.value = mainSizeSlider.value;
    updateGraph();
};

subSizeBox.addEventListener('keyup', (e) => {
    if (e.keyCode == 13) {
        parseBox(subSizeBox, lastSubSize, SUB_SIZE_OPTS);
        updateGraph();
    }
});

subSizeSlider.oninput = (e) => {
    subSizeBox.value = subSizeSlider.value;
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

    let mainSize = mainSizeBox.value;
    let subSize = subSizeBox.value;
    mainSizeSlider.value = lastMainSize = mainSize;
    subSizeSlider.value = lastSubSize = subSize;

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
            factor =
                Math.floor(factor / CARTESIAN_OPTS.step) * CARTESIAN_OPTS.step;
            factor = Math.min(
                factor,
                Math.floor(
                    CARTESIAN_OPTS.max / Math.max(widthRatio, heightRatio)
                )
            );
            factor = Math.max(
                factor,
                Math.floor(
                    CARTESIAN_OPTS.min / Math.min(widthRatio, heightRatio)
                ) + CARTESIAN_OPTS.step
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
            mainSize,
            subSize,
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

        renderPolar(
            numCirc,
            numCircSub,
            numAngle,
            numAngleSub,
            width,
            height,
            mainSize,
            subSize,
            color.value
        );
    }
}

function renderCartesian(
    numX,
    numY,
    width,
    height,
    mainSize,
    subSize,
    axis,
    color
) {
    d3.select('#graph-container').html('');

    let graph = d3
        .select('#graph-container')
        .append('svg')
        .attr('id', 'graph')
        .attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMidYMid meet');

    for (let x = 0; x <= numX; x++) {
        let stroke = subSize / 2;
        if (axis && x == numX / 2) {
            stroke = mainSize / 2;
        }
        let pos = x * (width - stroke) / numX;
        graph
            .append('rect')
            .attr('x', pos)
            .attr('y', subSize / 2)
            .attr('height', height - subSize)
            .attr('width', stroke)
            .attr('fill', color)
            .attr('shape-rendering', 'geometricPrecision');
    }

    for (let y = 0; y <= numY; y++) {
        let stroke = subSize / 2;
        if (axis && y == numY / 2) {
            stroke = mainSize / 2;
        }
        let pos = y * (height - stroke) / numY;
        graph
            .append('rect')
            .attr('x', subSize / 2)
            .attr('y', pos)
            .attr('height', stroke)
            .attr('width', width - subSize)
            .attr('fill', color)
            .attr('shape-rendering', 'geometricPrecision');
    }
}

function renderPolar(
    numCirc,
    numCircSub,
    numAngle,
    numAngleSub,
    width,
    height,
    mainSize,
    subSize,
    color
) {
    d3.select('#graph-container').html('');

    let graph = d3
        .select('#graph-container')
        .append('svg')
        .attr('id', 'graph')
        .attr('viewBox', `0 0 ${width} ${height}`)
        .attr('preserveAspectRatio', 'xMidYMid meet')
        .attr('overflow', 'hidden');

    let r = Math.max(width, height) / 2;
    let cx = width / 2;
    let cy = height / 2;
    let circFreq = parseInt(numCircSub) + 1;
    let totalCirc = circFreq * numCirc;
    let angleFreq = parseInt(numAngleSub) + 1;
    let totalAngle = angleFreq * numAngle;

    for (let c = 1; c <= totalCirc; c++) {
        let stroke = subSize / 2;
        if (c % circFreq == 0) {
            stroke = mainSize / 2;
        }
        graph
            .append('circle')
            .attr('cx', cx)
            .attr('cy', cy)
            .attr('r', (r - stroke / 2) * c / totalCirc)
            .attr('stroke', color)
            .attr('stroke-width', stroke)
            .attr('fill', 'transparent')
            .attr('shape-rendering', 'geometricPrecision');
    }

    for (let a = 0; a < totalAngle; a++) {
        let stroke = subSize / 2;
        if (a % angleFreq == 0) {
            stroke = mainSize / 2;
        }
        graph
            .append('line')
            .attr('x1', cx)
            .attr('y1', cy)
            .attr('x2', cx + (r - mainSize / 2) * Math.cos(a * 2 * Math.PI / totalAngle))
            .attr('y2', cy + (r - mainSize / 2) * Math.sin(a * 2 * Math.PI / totalAngle))
            .attr('stroke', color)
            .attr('stroke-width', stroke)
            .attr('shape-rendering', 'geometricPrecision');
    }
}
