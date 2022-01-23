import { chain } from "@anoop901/js-util";
import { map, toArray, zip } from "@anoop901/js-util/iterables";
import { ALL_LETTERS } from "./constants";
import { HistoryItem } from "./types/HistoryItem";
import "./LettersDisplay.css";
import classNames from "classnames";

export const LettersDisplay = ({
  history,
  onLetterClick,
}: {
  history: HistoryItem[];
  onLetterClick: (letter: string) => void;
}) => {
  const guesses = history.flatMap((historyItem) =>
    chain(zip(historyItem.guess, historyItem.result))
      .then(
        map(({ first, second }) => ({ guessedLetter: first, result: second }))
      )
      .then(toArray)
      .end()
  );
  const guessedLetters = new Set(guesses.map((guess) => guess.guessedLetter));
  const guessedLettersCorrect = new Set(
    guesses
      .filter((guess) => guess.result === "correct")
      .map((guess) => guess.guessedLetter)
  );
  const guessedLettersMisplaced = new Set(
    guesses
      .filter((guess) => guess.result === "misplaced")
      .map((guess) => guess.guessedLetter)
  );

  return (
    <div className="LetterDisplay">
      {ALL_LETTERS.map((letter) => (
        <div
          className={classNames("letter", {
            "letter-absent":
              guessedLetters.has(letter) &&
              !guessedLettersCorrect.has(letter) &&
              !guessedLettersMisplaced.has(letter),
            "letter-correct": guessedLettersCorrect.has(letter),
            "letter-misplaced": guessedLettersMisplaced.has(letter),
            "letter-unguessed": !guessedLetters.has(letter),
          })}
          onClick={() => {
            onLetterClick(letter);
          }}
        >
          {letter}
        </div>
      ))}
    </div>
  );
};
