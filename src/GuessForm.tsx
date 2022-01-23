import { useState } from "react";
import { WORD_LENGTH } from "./constants";
import { default as guessableWords } from "./data/guessable_words.json";
import "./GuessForm.css";

export function GuessForm({
  guess,
  setGuess,
  onGuess,
}: {
  guess: string;
  setGuess: (guess: string) => void;
  onGuess: (guess: string) => void;
}) {
  return (
    <form
      className="GuessForm"
      onSubmit={(e) => {
        e.preventDefault();
        if (!guessableWords.includes(guess)) {
          return;
        }
        onGuess(guess);
        setGuess("");
      }}
    >
      <input
        type="text"
        value={guess}
        required
        minLength={WORD_LENGTH}
        maxLength={WORD_LENGTH}
        style={{ textTransform: "uppercase" }}
        onChange={(e) => {
          setGuess(e.currentTarget.value.toLowerCase());
        }}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
