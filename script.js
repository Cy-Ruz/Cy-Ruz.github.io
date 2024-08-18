document.addEventListener('mousemove', function(e) {
    const pencil = document.getElementById("pencil");
    
    if (pencil) {
        const pencilWidth = pencil.offsetWidth;
        const pencilHeight = pencil.offsetHeight;
        // Calculate position so the center of the pencil aligns with the cursor
        const x = e.clientX - (pencilWidth / 2);
        const y = e.clientY - (pencilHeight / 2);
        
        pencil.style.transform = `translate(${x}px, ${y}px)`;
    }
});

const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');

// Resize canvas to fit the window
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas(); // Initialize canvas size
window.addEventListener('resize', resizeCanvas);

let drawing = false;
let currentColor = '#000000';
let usingEraser = false;

function startPosition(e) {
    drawing = true;
    draw(e);
}

function endPosition() {
    drawing = false;
    ctx.beginPath();
}

function draw(e) {
    // Prevent default behavior for touch events
    e.preventDefault();
    
    if (!drawing) return;

    // Handle both mouse and touch events
    let x, y;
    if (e.type === 'touchmove') {
        // Get touch coordinates
        const touch = e.touches[0];
        const rect = canvas.getBoundingClientRect();
        x = touch.clientX - rect.left;
        y = touch.clientY - rect.top;
    } else {
        // Get mouse coordinates
        const rect = canvas.getBoundingClientRect();
        x = e.clientX - rect.left;
        y = e.clientY - rect.top;
    }

    if (usingEraser) {
        ctx.clearRect(x - 10, y - 10, 20, 20); // Erase a small area around the cursor
    } else {
        ctx.lineWidth = 5;
        ctx.lineCap = 'round';
        ctx.strokeStyle = currentColor;

        ctx.lineTo(x, y);
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
}

function changeColor(e) {
    currentColor = e.target.value;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function toggleEraser() {
    usingEraser = !usingEraser;
    const eraserButton = document.getElementById('eraserButton');
    if (eraserButton) {
        eraserButton.style.backgroundColor = usingEraser ? '#999999' : '#cccccc';
    }
}

document.querySelectorAll('#colorPicker input').forEach(input => {
    input.addEventListener('change', changeColor);
});

const clearButton = document.getElementById('clearButton');
if (clearButton) {
    clearButton.addEventListener('click', clearCanvas);
}

const eraserButton = document.getElementById('eraserButton');
if (eraserButton) {
    eraserButton.addEventListener('click', toggleEraser);
}

// Mouse event listeners
canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);

// Touch event listeners
canvas.addEventListener('touchstart', (e) => {
    e.preventDefault();
    startPosition(e);
});
canvas.addEventListener('touchend', endPosition);
canvas.addEventListener('touchmove', draw);
