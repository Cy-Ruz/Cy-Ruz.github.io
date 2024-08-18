
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

function startPosition(e) {
    drawing = true;
    draw(e);
}

function endPosition() {
    drawing = false;
    ctx.beginPath();
}

function draw(e) {
    if (!drawing) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = currentColor;

    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function changeColor(e) {
    currentColor = e.target.value;
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

document.querySelectorAll('#colorPicker input').forEach(input => {
    input.addEventListener('change', changeColor);
});

const clearButton = document.getElementById('clearButton');
if (clearButton) {
    clearButton.addEventListener('click', clearCanvas);
}

canvas.addEventListener('mousedown', startPosition);
canvas.addEventListener('mouseup', endPosition);
canvas.addEventListener('mousemove', draw);
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
