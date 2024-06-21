import React from "react";

interface GuessInputProps {
  onGuess: (guess: number) => void;
}

interface GuessFormElements extends HTMLFormControlsCollection {
  guess: HTMLInputElement;
}

const GuessInput: React.FC<GuessInputProps> = ({ onGuess }) => {
  const handleGuessSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    const guess = parseInt(
      (e.target as unknown as GuessFormElements).guess.value
    );
    if (!isNaN(guess)) {
      onGuess(guess);
    } else {
      alert("Please enter a valid number");
    }
  };

  return (
    <form onSubmit={handleGuessSubmit} className="flex justify-center">
      <input
        type="number"
        name="guess"
        placeholder="Enter your guess"
        className="border rounded px-2 py-1 mr-2 focus:outline-none focus:ring focus:ring-blue-500"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Guess
      </button>
    </form>
  );
};

export default GuessInput;
