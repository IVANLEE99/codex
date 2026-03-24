const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreEl = document.getElementById("score");
const bestScoreEl = document.getElementById("best-score");
const statusEl = document.getElementById("status");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const restartBtn = document.getElementById("restart-btn");
const overlay = document.getElementById("overlay");
const overlayTitle = document.getElementById("overlay-title");
const overlayText = document.getElementById("overlay-text");

const gridSize = 20;
const tileCount = canvas.width / gridSize;
const initialSpeed = 150;
const bestScoreKey = "snake-best-score";

let snake;
let direction;
let nextDirection;
let food;
let score;
let bestScore = Number(localStorage.getItem(bestScoreKey) || 0);
let gameLoop = null;
let speed = initialSpeed;
let isRunning = false;
let isPaused = false;
let hasStarted = false;

bestScoreEl.textContent = String(bestScore);

function resetGameState() {
  snake = [
    { x: 10, y: 10 },
    { x: 9, y: 10 },
    { x: 8, y: 10 },
  ];
  direction = { x: 1, y: 0 };
  nextDirection = { x: 1, y: 0 };
  score = 0;
  speed = initialSpeed;
  food = createFood();
  updateScore();
  draw();
}

function createFood() {
  let newFood;

  do {
    newFood = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount),
    };
  } while (snake.some((segment) => segment.x === newFood.x && segment.y === newFood.y));

  return newFood;
}

function updateScore() {
  scoreEl.textContent = String(score);
  bestScoreEl.textContent = String(bestScore);
}

function setOverlay(title, text, visible = true) {
  overlayTitle.textContent = title;
  overlayText.textContent = text;
  overlay.classList.toggle("hidden", !visible);
}

function setStatus(text) {
  statusEl.textContent = text;
}

function drawCell(x, y, color, radius = 6) {
  const padding = 2;
  const size = gridSize - padding * 2;
  const posX = x * gridSize + padding;
  const posY = y * gridSize + padding;

  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.roundRect(posX, posY, size, size, radius);
  ctx.fill();
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  snake.forEach((segment, index) => {
    const color = index === 0 ? "#d8f3b2" : "#8dde67";
    drawCell(segment.x, segment.y, color, index === 0 ? 8 : 6);
  });

  drawCell(food.x, food.y, "#ff8e5d", 10);

  const head = snake[0];
  const eyeSize = 4;
  const eyeOffsetX = direction.y !== 0 ? 5 : 12;
  const eyeOffsetY = direction.x !== 0 ? 5 : 12;
  const baseX = head.x * gridSize;
  const baseY = head.y * gridSize;

  ctx.fillStyle = "#17372c";
  ctx.beginPath();
  ctx.arc(baseX + eyeOffsetX, baseY + eyeOffsetY, eyeSize, 0, Math.PI * 2);
  ctx.arc(
    baseX + (direction.y !== 0 ? 15 : 12),
    baseY + (direction.x !== 0 ? 15 : 12),
    eyeSize,
    0,
    Math.PI * 2
  );
  ctx.fill();
}

function step() {
  direction = nextDirection;

  const head = {
    x: snake[0].x + direction.x,
    y: snake[0].y + direction.y,
  };

  const hitWall =
    head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount;
  const hitSelf = snake.some((segment) => segment.x === head.x && segment.y === head.y);

  if (hitWall || hitSelf) {
    endGame();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 10;
    bestScore = Math.max(bestScore, score);
    localStorage.setItem(bestScoreKey, String(bestScore));
    updateScore();
    food = createFood();
    speed = Math.max(70, speed - 4);
    restartLoop();
  } else {
    snake.pop();
  }

  draw();
}

function restartLoop() {
  if (gameLoop) {
    clearInterval(gameLoop);
  }

  if (isRunning && !isPaused) {
    gameLoop = setInterval(step, speed);
  }
}

function startGame() {
  if (isRunning && !isPaused) {
    return;
  }

  if (!hasStarted || !isPaused) {
    resetGameState();
  }

  hasStarted = true;
  isRunning = true;
  isPaused = false;
  setStatus("进行中");
  setOverlay("游戏开始", "专注画布并用方向键或 WASD 控制。", false);
  restartLoop();
  canvas.focus();
}

function pauseGame() {
  if (!isRunning) {
    return;
  }

  isPaused = !isPaused;

  if (isPaused) {
    clearInterval(gameLoop);
    setStatus("已暂停");
    setOverlay("已暂停", "点击“暂停”继续，或点击“重新开始”重开。");
  } else {
    setStatus("进行中");
    setOverlay("继续游戏", "保持节奏，别撞墙。", false);
    restartLoop();
    canvas.focus();
  }
}

function endGame() {
  clearInterval(gameLoop);
  isRunning = false;
  isPaused = false;
  setStatus("已结束");
  setOverlay("游戏结束", `本局得分 ${score}，点击“重新开始”再来一局。`);
}

function restartGame() {
  clearInterval(gameLoop);
  hasStarted = true;
  isRunning = true;
  isPaused = false;
  resetGameState();
  setStatus("进行中");
  setOverlay("重新开始", "新的果实已经刷新，继续吧。", false);
  restartLoop();
  canvas.focus();
}

function handleDirectionChange(key) {
  const keyMap = {
    ArrowUp: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 },
    ArrowLeft: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 },
    w: { x: 0, y: -1 },
    s: { x: 0, y: 1 },
    a: { x: -1, y: 0 },
    d: { x: 1, y: 0 },
    W: { x: 0, y: -1 },
    S: { x: 0, y: 1 },
    A: { x: -1, y: 0 },
    D: { x: 1, y: 0 },
  };

  const candidate = keyMap[key];

  if (!candidate) {
    return false;
  }

  const isReverse =
    candidate.x === direction.x * -1 && candidate.y === direction.y * -1;

  if (!isReverse) {
    nextDirection = candidate;
  }

  return true;
}

document.addEventListener("keydown", (event) => {
  const handled = handleDirectionChange(event.key);

  if (handled) {
    event.preventDefault();
  }

  if (event.key === " " && hasStarted) {
    event.preventDefault();
    pauseGame();
  }
});

startBtn.addEventListener("click", startGame);
pauseBtn.addEventListener("click", pauseGame);
restartBtn.addEventListener("click", restartGame);

canvas.setAttribute("tabindex", "0");
canvas.addEventListener("click", () => canvas.focus());

resetGameState();
setStatus("准备开始");
