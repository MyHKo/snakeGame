'use strict';

const board = document.getElementById('game-board');
const boardLength = 20;

let snake = [{x:10, y:10}];
let food = generateFood();
let direction = "right";

function draw() {
    board.innerHTML = '';
    drawSnake();
    drawFood();
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
    const foodElement = createGameElement('div', 'food');
    setPosition(foodElement, food);
    board.appendChild(foodElement);
}

function generateFood() {
    const x = Math.floor(Math.random() * boardLength) + 1;
    const y = Math.floor(Math.random() * boardLength) + 1;
    return {x,y};
}


draw();
