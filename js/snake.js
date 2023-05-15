

// Get the snake and food elements
let snake = document.getElementById("snake");
let food = document.getElementById("food");

// Initial snake position
let snakeX = 0;
let snakeY = 0;

// Initial food position
let foodX = Math.floor(Math.random() * 20) * 20;
let foodY = Math.floor(Math.random() * 20) * 20;

// Direction of the snake
let direction = "right";

// Array to store the snake's body parts
let snakeBody = [];

// Move the snake
const moveSnake = () => {
  // Update the snake's position based on the direction
  if (direction === "right") {
    snakeX += 20;
  } else if (direction === "left") {
    snakeX -= 20;
  } else if (direction === "up") {
    snakeY -= 20;
  } else if (direction === "down") {
    snakeY += 20;
  }

  // Check for collision with the boundaries
  if (snakeX < 0 || snakeX >= 400 || snakeY < 0 || snakeY >= 400) {
    // Game over, reset the snake's position and clear the body
    snakeX = 0;
    snakeY = 0;
    snakeBody = [];

    snake.innerHTML = ""; // clear the snake's body element
  }

  // Check for collision with the snake's body
  for (let i = 0; i < snakeBody.length; i++) {
    if (snakeX === snakeBody[i].x && snakeY === snakeBody[i].y) {
      // Game over, reset the snake's position and clear the body
      snakeX = 0;
      snakeY = 0;
      snakeBody = [];

      snake.innerHTML = ""; // clear the snake's body element

      break;
    }   
  }

  // Update the snake's position on the screen
  snake.style.left = snakeX + "px";
  snake.style.top = snakeY + "px";

  // Check for collision with the food
  if (snakeX === foodX && snakeY === foodY) {
    // Add a new body part to the snake
    snakeBody.push({ x: snakeX, y: snakeY });

    // Randomly move the food to a new position
    foodX = Math.floor(Math.random() * 20) * 20;
    foodY = Math.floor(Math.random() * 20) * 20;
    food.style.left = foodX + "px";
    food.style.top = foodY + "px";
  }

  // Update the snake's body
  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i].x = snakeBody[i - 1].x;
    snakeBody[i].y = snakeBody[i - 1].y;
  }

  // Update the snake's body position on the screen
  snake.innerHTML = ""; // clear the previous snake's body elements

  for (let i = 0; i < snakeBody.length; i++) {
    let bodyPart = snakeBody[i];
    let bodyElement = document.createElement("div");
    bodyElement.className = "snake-body";
    bodyElement.style.left = bodyPart.x + "px";
    bodyElement.style.top = bodyPart.y + "px";
    snake.appendChild(bodyElement);
  }

  // Remove the old tail if the snake has a body
  if (snakeBody.length > 0) {
    let tail = snakeBody.shift();
    let tailElement = document.querySelector(".snake-body:last-child");
    snake.removeChild(tailElement);
  }
};

// Handle keyboard input
document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowRight" && direction !== "left") {
    direction = "right";
  } else if (event.key === "ArrowLeft" && direction !== "right") {
    direction = "left";
  } else if (event.key === "ArrowUp" && direction !== "down") {
    direction = "up";
  } else if (event.key === "ArrowDown" && direction !== "up") {
    direction = "down";
  }
});

// Start the game loop
setInterval(moveSnake, 200);