import { LetterResult } from "./types/LetterResult";
import { Result } from "./types/Result";

// guess:  ffefe
// target: abcde

// guess:  ffeef
// target: abcde

export const scoreWord = (guess: string, target: string): Result => {
  const result = [] as LetterResult[];
  const mismatchedTargetLetters = [];
  for (let i = 0; i < guess.length; i++) {
    const guessLetter = guess[i];
    const targetLetter = target[i];
    if (guessLetter === targetLetter) {
      result.push("correct");
    } else if (!target.includes(guessLetter)) {
      result.push("absent");
      mismatchedTargetLetters.push(targetLetter);
    } else {
      result.push("misplaced");
      mismatchedTargetLetters.push(targetLetter);
    }
  }
  for (let i = 0; i < guess.length; i++) {
    const guessLetter = guess[i];
    const letterResult = result[i];

    if (letterResult === "misplaced") {
      const mismatchedTargetLettersIndex =
        mismatchedTargetLetters.indexOf(guessLetter);
      if (mismatchedTargetLettersIndex === -1) {
        result[i] = "absent";
      } else {
        mismatchedTargetLetters.splice(mismatchedTargetLettersIndex, 1);
      }
    }
  }
  return result;
};
