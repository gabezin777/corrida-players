const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 600;

// Bird properties
const bird = {
    x: 50,
    y: canvas.height / 2,
    width: 34,
    height: 24,
    gravity: 0.4,
    lift: -8,
    velocity: 0,
};

// Pipes array
const pipes = [];
const pipeWidth = 50;
const gapHeight = 150;
let frameCount = 0;
let score = 0;
let gameOver = false;

// Handle user input
document.addEventListener('keydown', function(e) {
    if (e.code === 'Space' || e.code === 'ArrowUp') {
        bird.velocity = bird.lift;
    }
});

canvas.addEventListener('click', () => {
    bird.velocity = bird.lift;
});

// Main game loop
function gameLoop() {
    if (gameOver) {
        showGameOver();
        return;
    }
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

function update() {
    // Bird physics
    bird.velocity += bird.gravity;
    bird.y += bird.velocity;

    // Prevent bird from falling off the bottom or going above the canvas
    if (bird.y + bird.height > canvas.height || bird.y < 0) {
        gameOver = true;
    }

    // Pipe generation
    if (frameCount % 100 === 0) {
        const pipeY = Math.random() * (canvas.height - gapHeight - 40) + 20;
        pipes.push({ x: canvas.width, y: pipeY });
    }

    // Move pipes
    for (let i = pipes.length - 1; i >= 0; i--) {
        pipes[i].x -= 2;

        // Check for collision
        if (
            bird.x < pipes[i].x + pipeWidth &&
            bird.x + bird.width > pipes[i].x &&
            (
                bird.y < pipes[i].y ||
                bird.y + bird.height > pipes[i].y + gapHeight
            )
        ) {
            gameOver = true;
        }

        // Remove off-screen pipes and update score
        if (pipes[i].x + pipeWidth < 0) {
            pipes.splice(i, 1);
            score++;
        }
    }

    frameCount++;
}

function draw() {
    // Clear canvas
    ctx.fillStyle = '#e0f7fa'; // Light background
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw bird
    ctx.fillStyle = '#ffeb3b'; // Light yellow for bird
    ctx.fillRect(bird.x, bird.y, bird.width, bird.height);

    // Draw pipes
    ctx.fillStyle = '#4db6ac'; // Light teal for pipes
    pipes.forEach(pipe => {
        // Top pipe
        ctx.fillRect(pipe.x, 0, pipeWidth, pipe.y);
        // Bottom pipe
        ctx.fillRect(pipe.x, pipe.y + gapHeight, pipeWidth, canvas.height - pipe.y - gapHeight);
    });

    // Draw score
    ctx.fillStyle = '#000';
    ctx.font = '24px Arial';
    ctx.fillText(`Score: ${score}`, 10, 30);
}

function showGameOver() {
    ctx.fillStyle = 'rgba(0,0,0,0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#fff';
    ctx.font = '36px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('Game Over', canvas.width / 2, canvas.height / 2 - 20);
    ctx.font = '24px Arial';
    ctx.fillText(`Score: ${score}`, canvas.width / 2, canvas.height / 2 + 20);
    ctx.font = '18px Arial';
    ctx.fillText('Press Space or Click to Restart', canvas.width / 2, canvas.height / 2 + 60);
}

// Restart game on key press or click after game over
document.addEventListener('keydown', (e) => {
    if (gameOver && (e.code === 'Space' || e.code === 'ArrowUp')) {
        resetGame();
    }
});
canvas.addEventListener('click', () => {
    if (gameOver) {
        resetGame();
    }
});

function resetGame() {
    bird.y = canvas.height / 2;
    bird.velocity = 0;
    pipes.length = 0;
    score = 0;
    frameCount = 0;
    gameOver = false;
    gameLoop();
}

// Start the game
gameLoop();