import React, { useCallback, useState } from "react";
import "./App.css";
import { ALL_LETTERS, WORD_LENGTH } from "./constants";
import { GuessDisplay } from "./GuessDisplay";
import { GameState } from "./types/GameState";
import update from "immutability-helper";
import { scoreWord } from "./scoreWord";
import { default as possibleTargetWords } from "./data/possible_target_words.json";
import { default as guessableWords } from "./data/guessable_words.json";
import { chain } from "@anoop901/js-util";
import { allMatch } from "@anoop901/js-util/iterables";

function App() {
  const getTargetWord = useCallback(() => {
    const targetWord =
      possibleTargetWords[
        Math.floor(Math.random() * possibleTargetWords.length)
      ];
    return targetWord;
  }, []);

  const [gameState, setGameState] = useState<GameState>({
    history: [],
    target: getTargetWord(),
    finished: false,
  });
  const [nextGuess, setNextGuess] = useState<string>("");

  const guessedLetters = new Set(
    gameState.history.map((item) => item.guess).flatMap((guess) => [...guess])
  );
  const unguessedLetters = ALL_LETTERS.filter((x) => !guessedLetters.has(x));

  const submitGuess = () => {
    const result = scoreWord(nextGuess, gameState.target);
    if (!guessableWords.includes(nextGuess)) {
      return;
    }
    setGameState(
      update(gameState, {
        history: {
          $push: [
            {
              guess: nextGuess,
              result,
            },
          ],
        },
        finished: {
          $set: chain(result)
            .then(allMatch((x) => x === "correct"))
            .end(),
        },
      })
    );
    setNextGuess("");
  };

  return (
    <div className="App">
      <GuessDisplay gameState={gameState} />
      {gameState.finished ? (
        <div>
          Congrats, you guessed the word in {gameState.history.length} guesses!
        </div>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitGuess();
          }}
        >
          <input
            type="text"
            value={nextGuess}
            required
            minLength={WORD_LENGTH}
            maxLength={WORD_LENGTH}
            style={{ textTransform: "uppercase" }}
            onChange={(e) => {
              setNextGuess(e.currentTarget.value.toLowerCase());
            }}
          />
          <button type="submit">Submit</button>
        </form>
      )}
      <div>unguessed letters: {unguessedLetters}</div>
    </div>
  );
}

export default App;
