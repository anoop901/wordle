import { useState } from "react";
import { WORD_LENGTH } from "./constants";

export function GuessForm({ onGuess }: { onGuess: (guess: string) => void }) {
  const [guess, setGuess] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
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
