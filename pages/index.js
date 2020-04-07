import Head from "next/head";
import { useState, useRef, useEffect } from "react";
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
  const [speed, setSpeed] = useState();
  const [gameOver, setGameOver] = useState(false);
  const startGame = () => {};
  const endGame = () => {};
  const moveSnake = () => {};
  const createFruit = () => {};
  const checkCollision = () => {};
  const checkFoodCollision = () => {};
  const gameLoop = () => {};

  useEffect(() => {}, snake, fruit, gameOver);

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
