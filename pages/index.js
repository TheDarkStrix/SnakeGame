import Head from "next/head";
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
const SnakeGame = () => {
  const canvasRef = useRef();
  const [snake, setSnake] = useState(SNAKE_START);
  const [fruit, setFruit] = useState(FRUIT_START);
  const [dir, setDir] = useState([0, -1]);
  const [speed, setSpeed] = useState(500);
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
    console.log(keyCode);
    keyCode >= 37 && keyCode <= 40 && setDir(DIRECTIONS[keyCode]);
  };
  const createFruit = () => {};
  const checkCollision = (piece, snk = snake) => {
    if (
      piece[0] * SCALE >= CANVAS_SIZE[0] ||
      piece[1] * SCALE >= CANVAS_SIZE[1] ||
      piece[0] < 0 ||
      piece[1] < 0
    ) {
      return true;
    } else {
      for (const segment of snk) {
        if (piece[0] === segment[0] && piece[1] === segment[1]) return true;
      }
      return false;
    }
  };
  const checkFoodCollision = () => {};
  const gameLoop = () => {
    //make a copy the original snake
    const snakeCopy = JSON.parse(JSON.stringify(snake));
    //the new snake head is calculated via x and y where [0][0] = x and [0][1] is y and the snakeCopy[0] is the first index value in the array
    const newSnakeHead = [snakeCopy[0][0] + dir[0], snakeCopy[0][1] + dir[1]]; // main
    // append or add the new snake head to the snake body
    snakeCopy.unshift(newSnakeHead);
    if (checkCollision(newSnakeHead)) endGame();
    //remove the last element in the array
    snakeCopy.pop();
    //update the state with the CopySnake values
    setSnake(snakeCopy);
  };

  useEffect(
    () => {
      const context = canvasRef.current.getContext("2d");
      context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
      context.clearRect(0, 0, CANVAS_SIZE[0], CANVAS_SIZE[1]);
      context.fillStyle = "pink";
      snake.forEach(([x, y]) => context.fillRect(x, y, 1, 1));
      context.fillStyle = "lightblue";
      context.fillRect(fruit[0], fruit[1], 1, 1);
    },
    snake,
    fruit,
    gameOver
  );

  useInterval(() => gameLoop(), speed);

  return (
    <div role="button" tabIndex="0" onKeyDown={(e) => moveSnake(e)}>
      <canvas
        style={{ border: "1px solid black" }}
        ref={canvasRef}
        width={`${CANVAS_SIZE[0]}px`}
        height={`${CANVAS_SIZE[1]}px`}
      />
      {gameOver && <div>Game Over !</div>}
      <button onClick={startGame}>Start Game</button>
    </div>
  );
};

export default SnakeGame;
