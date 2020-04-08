import { useState, useRef, useEffect } from "react";
import { useInterval } from "./useInterval";
import {
  CANVAS_SIZE,
  SNAKE_START,
  FRUIT_START,
  SCALE,
  SPEED,
  DIRECTIONS,
} from "./constants";
const Index = () => {
  const canvasRef = useRef();
  const [snake, setSnake] = useState(SNAKE_START);
  const [fruit, setFruit] = useState(FRUIT_START);
  const [dir, setDir] = useState([0, -1]);
  const [speed, setSpeed] = useState(null);
  const [gameOver, setGameOver] = useState(false);

  const startGame = () => {
    setSnake(SNAKE_START);
    setFruit(FRUIT_START);
    setDir([0, -1]);
    setSpeed(SPEED);
    setGameOver(false);
  };
  const endGame = () => {
    setSpeed(null);
    setGameOver(true);
  };
  const moveSnake = ({ keyCode }) => {
    //take input when only arrow icons ae clicked
    keyCode >= 37 && keyCode <= 40 && setDir(DIRECTIONS[keyCode]);
  };

  const createFruit = () =>
    //place the fruit inside the canvas always
    fruit.map((_a, i) => Math.floor(Math.random() * (CANVAS_SIZE[i] / SCALE)));

  const checkCollision = (piece, snk = snake) => {
    if (
      piece[0] * SCALE >= CANVAS_SIZE[0] ||
      piece[1] * SCALE >= CANVAS_SIZE[1] ||
      piece[0] < 0 ||
      piece[1] < 0
    ) {
      return true;
    } else {
      // a snake cannot eat eats self , it dies when it does so
      for (const segment of snk) {
        if (piece[0] === segment[0] && piece[1] === segment[1]) return true;
      }
      return false;
    }
  };
  const checkFruitCollision = (newSnake) => {
    if (newSnake[0][0] === fruit[0] && newSnake[0][1] === fruit[1]) {
      let newFruit = createFruit();
      console.log("NEW FRUIT : " + newFruit);
      while (checkCollision(newFruit, newSnake)) {
        newFruit = createFruit();
      }
      setFruit(newFruit);
      return true;
    }
    return false;
  };
  const gameLoop = () => {
    //make a copy the original snake
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    //the new snake head is calculated via x and y where [0][0] = x and [0][1] is y and the snakeCopy[0] is the first index value in the array
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]]; // main
    // append or add the new snake head to the snake body
    snakeCopy.unshift(newSnakeHead);
    //check if the new head is collided with a wall or by itself
    if (checkCollision(newSnakeHead)) endGame();
    //check if the snake has eaten the fruit , if the fruit is eaten then the length of the snake is increased , and new fruit is generated
    if (!checkFruitCollision(snakeCopy)) snakeCopy.pop();
    //update the state with the CopySnake values
    setSnake(snakeCopy);
  };
  const contexta = () => {
    // Draw the snake and the fruit on the canvas
    const context = canvasRef.current.getContext("2d");
    context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
    context.clearRect(0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1]);
    context.fillStyle = "#04E98E";
    snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
    context.fillStyle = "#FFE401";
    context.fillRect(fruit[0], fruit[1], 1, 1);
  };
  useEffect(
    () => {
      contexta();
    },
    snake,
    fruit,
    gameOver
  );

  useInterval(() => gameLoop(), speed);

  return (
    <div
      class="noSelect"
      role="button"
      width={`${CANVAS_SIZE[0]}px`}
      height={`${CANVAS_SIZE[1]}px`}
      tabIndex="0"
      onKeyDown={(e) => moveSnake(e)}
    >
      <div class="center noSelect ">
        <div onClick={startGame} class=" noSelect button -green center">
          START GAME
        </div>
        <div class="center"></div>
        <canvas
          style={{
            margin: "0px auto",
            display: "block",
          }}
          ref={canvasRef}
          width={`${CANVAS_SIZE[0]}px`}
          height={`${CANVAS_SIZE[1]}px`}
        />
        {gameOver && (
          <div class="center gamestate">
            <h1>Game Over ! Try Again</h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Index;
