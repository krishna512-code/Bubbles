// Bubbles App - Minimal Version

// Canvas and context
const canvas = document.getElementById('bubblesCanvas');
const ctx = canvas.getContext('2d');

// UI Elements
const hitBtn = document.getElementById('hitBtn');
const resetBtn = document.getElementById('resetBtn');

// Circle properties
const circle = {
    x: 140,
    y: canvas.height / 2,
    radius: 90,
    color: getRandomColor(),
    hitColor: getRandomColor(),
    isHit: false
};

// Arrow properties
const arrow = {
    startX: canvas.width - 140,
    startY: canvas.height / 2,
    width: 40,
    height: 10,
    speed: 8,
    moving: false,
    atStart: true
};

function getRandomColor() {
    // Pastel random color
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 90%, 65%)`;
}

function drawCircle() {
    ctx.beginPath();
    ctx.arc(circle.x, circle.y, circle.radius, 0, 2 * Math.PI);
    ctx.fillStyle = circle.isHit ? circle.hitColor : circle.color;
    ctx.fill();
    ctx.lineWidth = 4;
    ctx.strokeStyle = '#222';
    ctx.stroke();
}

function drawArrow(x, y) {
    // Draw a simple left-pointing arrow
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x - arrow.width, y);
    ctx.lineWidth = 10;
    ctx.strokeStyle = '#222';
    ctx.stroke();
    // Arrow head
    ctx.beginPath();
    ctx.moveTo(x - arrow.width, y - 15);
    ctx.lineTo(x - arrow.width, y + 15);
    ctx.lineTo(x - arrow.width - 20, y);
    ctx.closePath();
    ctx.fillStyle = '#222';
    ctx.fill();
    ctx.restore();
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw() {
    clearCanvas();
    drawCircle();
    drawArrow(arrow.startX, arrow.startY);
}

draw();

// Animation for arrow
function animateArrow() {
    if (!arrow.moving) return;
    // Move arrow left
    if (arrow.startX - arrow.width - 20 > circle.x + circle.radius) {
        arrow.startX -= arrow.speed;
        draw();
        requestAnimationFrame(animateArrow);
    } else {
        // Arrow has hit the circle
        arrow.moving = false;
        circle.isHit = true;
        draw();
    }
}

// Hit button event
hitBtn.onclick = function() {
    if (!arrow.moving && !circle.isHit) {
        arrow.moving = true;
        animateArrow();
    }
};

// Reset button event
resetBtn.onclick = function() {
    // Reset positions and colors
    circle.color = getRandomColor();
    circle.hitColor = getRandomColor();
    circle.isHit = false;
    arrow.startX = canvas.width - 140;
    arrow.startY = canvas.height / 2;
    arrow.moving = false;
    draw();
};

// No extra UI or event listeners