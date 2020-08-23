const WIDTH_RATIO = 4;
const HEIGHT_RATIO = 4;
const SIZE_FACTOR = 1000;
const WIDTH = WIDTH_RATIO  * SIZE_FACTOR;
const HEIGHT = HEIGHT_RATIO * SIZE_FACTOR;
const MIN = 2;
const MAX = 120;
const STEP = 2;
const STROKE_FACTOR = 2500;
const AXIS_FACTOR = 4;

let numXBox = document.getElementById("numXBox");
let numYBox = document.getElementById("numYBox");

let numXSlider = document.getElementById("numXSlider");
numXSlider.min = MIN;
numXSlider.max = MAX;
numXSlider.step = STEP;
let numYSlider = document.getElementById("numYSlider");
numYSlider.min = MIN;
numYSlider.max = MAX;
numYSlider.step = STEP;

let squareCheck = document.getElementById("square");
let axisCheck = document.getElementById("axis");

let lastChange = "x";
let lastX = numXBox.value;
let lastY = numYBox.value;

let graph = d3.select("#graph-container")
                .append("svg")
                .attr("id", "graph")
                .attr("viewBox", `0 0 ${WIDTH} ${HEIGHT}`)
                .attr("preserveAspectRatio", "xMidYMin meet")

window.onload = (e) => {
    updateGraph();
};

numXBox.addEventListener("keyup", function(e) {
    if (e.keyCode == 13) {
        let numX = numXBox.value;
        if (isNaN(numX)) {
            numXBox.value = lastX;
        } else if (numX < MIN) {
            numXBox.value = MIN;
        } else if (numX > MAX) {
            numXBox.value = MAX;
        }
        numXBox.value = parseInt(numXBox.value / STEP) * STEP;
        updateGraph("numX");
    }
})

numXSlider.oninput = (e) => {
    numXBox.value = numXSlider.value;
    updateGraph("numX");
}

numYBox.addEventListener("keyup", function(e) {
    if (e.keyCode == 13) {
        let numY = numYBox.value;
        if (isNaN(numY)) {
            numYBox.value = lastY;
        } else if (numY < MIN) {
            numYBox.value = MIN;
        } else if (numY > MAX) {
            numYBox.value = MAX;
        }
        numYBox.value = parseInt(numYBox.value / STEP) * STEP;
        updateGraph("numY");
    }
})

numYSlider.oninput = (e) => {
    numYBox.value = numYSlider.value;
    updateGraph("numY");
}

squareCheck.oninput = (e) => {
    updateGraph("square");
}

axisCheck.oninput = (e) => {
    updateGraph("axis");
}

function updateGraph(name) {
    if (name == "numX") {
        lastChange = "x";
    }

    if (name == "numY") {
        lastChange = "y";
    }

    if (squareCheck.checked) {
        let factor = parseInt(numXBox.value / WIDTH_RATIO);
        if (lastChange == "y") {
            factor = parseInt(numYBox.value / HEIGHT_RATIO);
        }
        factor = parseInt(factor / STEP) * STEP;
        factor = Math.min(factor, parseInt(MAX / Math.max(WIDTH_RATIO, HEIGHT_RATIO)));
        factor = Math.max(factor, parseInt(MIN / Math.min(WIDTH_RATIO, HEIGHT_RATIO)) + STEP);
        numXBox.value = factor * WIDTH_RATIO;
        numYBox.value = factor * HEIGHT_RATIO;
    }

    let numX = numXBox.value;
    let numY = numYBox.value;

    numXSlider.value = numX;
    numYSlider.value = numY;
    lastX = numX;
    lastY = numY;

    renderCartesian(numX, numY, axisCheck.checked);
}

function renderCartesian(numX, numY, axis) {
    graph.selectAll("rect, circle").remove();

    const STROKE_BASE = WIDTH * HEIGHT / STROKE_FACTOR ** 2;

    for (let x=0; x <= numX; x++) {
        let stroke = STROKE_BASE;
        if (axis && x == numX/2) {
            stroke *= AXIS_FACTOR;
        }
        graph.append("rect")
            .attr("x", x*(WIDTH-stroke)/numX)
            .attr("y", 0)
            .attr("width", stroke)
            .attr("height", HEIGHT)
            .attr("fill", "black")
            .attr("shape-rendering", "geometricPrecision");
    }

    for (let y=0; y <= numY; y++) {
        let stroke = STROKE_BASE;
        if (axis && y == numY/2) {
            stroke *= AXIS_FACTOR;
        }
        graph.append("rect")
            .attr("x", 0)
            .attr("y", y*(HEIGHT-stroke)/numY)
            .attr("width", WIDTH)
            .attr("height", stroke)
            .attr("fill", "black")
            .attr("shape-rendering", "geometricPrecision");
    }
}
