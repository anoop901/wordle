import React, { useCallback, useState } from "react";
import "./App.css";
import { ALL_LETTERS } from "./constants";
import { GuessDisplay } from "./GuessDisplay";
import { GameState } from "./types/GameState";
import update from "immutability-helper";
import { scoreWord } from "./scoreWord";
import { default as possibleTargetWords } from "./data/possible_target_words.json";
import { chain } from "@anoop901/js-util";
import { allMatch } from "@anoop901/js-util/iterables";
import { GuessForm } from "./GuessForm";

function App() {
  const target = useCallback(
    () =>
      possibleTargetWords[
        Math.floor(Math.random() * possibleTargetWords.length)
      ],
    []
  )();

  const [gameState, setGameState] = useState<GameState>({
    history: [],
    target,
    finished: false,
  });

  const guessedLetters = new Set(
    gameState.history.map((item) => item.guess).flatMap((guess) => [...guess])
  );
  const unguessedLetters = ALL_LETTERS.filter((x) => !guessedLetters.has(x));

  const handleGuess = (guess: string) => {
    const result = scoreWord(guess, gameState.target);
    setGameState(
      update(gameState, {
        history: { $push: [{ guess, result }] },
        finished: {
          $set: chain(result)
            .then(allMatch((x) => x === "correct"))
            .end(),
        },
      })
    );
  };

  return (
    <div className="App">
      <GuessDisplay gameState={gameState} />
      {!gameState.finished && <GuessForm onGuess={handleGuess} />}
      {gameState.finished && (
        <div>
          Congrats, you guessed the word in {gameState.history.length} guesses!
        </div>
      )}
      <div>unguessed letters: {unguessedLetters}</div>
    </div>
  );
}

export default App;
