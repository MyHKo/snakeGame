'use strict';

const board = document.getElementById('game-board');
const boardLength = 20;
const instructionText = document.getElementById('instruction-text');
const logo = document.getElementById('logo')
const score = document.getElementById('score')
const highScore = document.getElementById('highScore')

let snake = [{x:10, y:10}];
let food = generateFood();
let direction = "right";
let gameInterval;
let gameSpeedDelay = 200;
let gameStarted = false;

function draw() {
    board.innerHTML = '';
    drawSnake();
    drawFood();
    updateScore();
}

function drawSnake() {
    snake.forEach((segment) => {
       const snakeElement = createGameElement('div', 'snake');
       setPosition(snakeElement, segment);
       board.appendChild(snakeElement);
    });
}

function createGameElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

function drawFood() {
    if(gameStarted) {
        const foodElement = createGameElement('div', 'food');
        setPosition(foodElement, food);
        board.appendChild(foodElement);
    }
}

function generateFood() {
    const x = Math.floor(Math.random() * boardLength) + 1;
    const y = Math.floor(Math.random() * boardLength) + 1;
    return {x,y};
}

function move(){
    const head = {...snake[0]};
    switch(direction){
        case "right":
            head.x++;
            break;
        case "left":
            head.x--;
            break;
        case "up":
            head.y--;
            break;
        case "down":
            head.y++;
            break;
    }
    snake.unshift(head);

    if(head.x === food.x && head.y === food.y){
        food = generateFood();
        increaseSpeed()
        clearInterval(gameInterval);
        gameInterval = setInterval(() => {
            move()
            checkCollision()
            draw()
        }, gameSpeedDelay);
    } else {
        snake.pop()
    }
}

function startGame(){
    gameStarted = true;
    instructionText.style.display = 'none';
    logo.style.display = 'none';
    gameInterval = setInterval(() => {
        move()
        checkCollision()
        draw()
    }, gameSpeedDelay);
}

function handleKeyPress(even){
    if((!gameStarted && event.code === 'Space') ||
        (!gameStarted && event.key === ' ')){
        startGame();
    } else {
        switch(event.key){
            case 'ArrowUp':
                if(direction !== "down")
                    direction = 'up';
                break;
            case 'ArrowDown':
                if(direction !== "up")
                    direction = 'down';
                break;
            case 'ArrowLeft':
                if(direction !== "right")
                    direction = 'left';
                break;
            case 'ArrowRight':
                if(direction !== "left")
                    direction = 'right';
                break;
        }
    }
}

function increaseSpeed() {
    if(gameSpeedDelay >= 150) {
        gameSpeedDelay -= 5;
    } else if(gameSpeedDelay >= 100) {
        gameSpeedDelay -= 3;
    } else if(gameSpeedDelay >= 50) {
        gameSpeedDelay -= 2;
    } else if(gameSpeedDelay >= 20) {
        gameSpeedDelay -= 1;
    }
}

function checkCollision(){
    const head = snake[0];
    if(head.x < 1 || head.x > boardLength || head.y < 1 || head.y > boardLength){
        endGame();
    }

    for(let i = 1; i < snake.length;i++){
        if(head.x === snake[i].x && head.y === snake[i].y){
            endGame();
        }
    }
}

function endGame(){
    updateHighScore();
    clearInterval(gameInterval);
    gameStarted = false;
    board.innerHTML = '';
    snake = [{x:10, y:10}];
    food = generateFood();
    direction = "right";
    gameSpeedDelay = 200;
    logo.style.display = 'block';
    instructionText.style.display = 'block';
    updateScore()
}

function updateScore(){
    const currentScore = snake.length - 1;
    score.textContent = currentScore.toString().padStart(3, '0');
}

function updateHighScore() {
    const currentScore = snake.length - 1;
    if(currentScore > parseInt(highScore.textContent)){
        highScore.textContent = currentScore.toString().padStart(3, '0');
        highScore.style.display = 'block';
    }
}

document.addEventListener('keydown', handleKeyPress);
