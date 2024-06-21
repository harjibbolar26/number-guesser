import React, { useState } from "react";
import "./App.css";
// import GuessInput from './GuessInput';
import GuessInput from "./GuessInput";

interface GameState {
  secretNumber: number;
  guess: number | null;
  attempts: number;
  gameOver: boolean;
  win: boolean | null;
}

const initialState: GameState = {
  secretNumber: Math.floor(Math.random() * 100) + 1, // Generate random number (1-100)
  guess: null,
  attempts: 0,
  gameOver: false,
  win: null,
};

function App() {
  const [gameState, setGameState] = useState<GameState>(initialState);

  const handleGuess = (guess: number) => {
    setGameState((prevState) => {
      const isWin = guess === prevState.secretNumber;
      const isLoss = prevState.attempts + 1 >= 10;
      return {
        ...prevState,
        guess,
        attempts: prevState.attempts + 1,
        win: isWin,
        gameOver: isWin || isLoss,
      };
    });
  };

  const renderFeedback = () => {
    if (gameState.guess === null) return null;

    const { guess, secretNumber } = gameState;

    return (
      <p className="text-center">
        Your guess is {guess > secretNumber ? "too high" : "too low"}.
      </p>
    );
  };

  const renderResult = () => {
    if (!gameState.gameOver) return null;

    const message = gameState.win ? "You Win!" : "You Lose!";

    return (
      <div className="text-center mt-4">
        <p className="text-xl font-bold">{message}</p>
        <p>The secret number was: {gameState.secretNumber}</p>
        <button onClick={() => setGameState(initialState)} className="rounded-full bg-black text-white p-2 px-3 mt-2">Play Again</button>
      </div>
    );
  };

  return (
    <div className="container mx-auto flex justify-center items-center flex-col h-[100vh]">
      <h1 className="text-3xl text-center mb-4 font-bold">Number Guesser</h1>
      <p className="text-center text-xl mb-4">
        Please enter a number between 1 to 100 to check if your guess is right.
      </p>
      <p className="text-center text-xl mb-4 font-bold uppercase">
        NOTE: {" "}
        <span className="text-center text-xl mb-4 font-normal lowercase">You have just 10 attempts</span>
      </p>
      <GuessInput onGuess={handleGuess} />
      {renderFeedback()}
      {renderResult()}
    </div>
  );
}

export default App;
