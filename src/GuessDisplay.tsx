import { chain } from "@anoop901/js-util";
import { enumerate, map, toArray, zip } from "@anoop901/js-util/iterables";
import { GameState } from "./types/GameState";
import "./GuessDisplay.css";

export const GuessDisplay = ({ gameState }: { gameState: GameState }) => {
  return (
    <div className="GuessDisplay">
      {gameState.history.map(({ guess, result }, guessIndex) => (
        <div className="guess" key={guessIndex}>
          {chain(zip(guess, result))
            .then(enumerate)
            .then(
              map(
                ({
                  index: letterIndex,
                  value: { first: letter, second: letterResult },
                }) => (
                  <div
                    key={letterIndex}
                    className={`letter letter-${letterResult}`}
                  >
                    {letter}
                  </div>
                )
              )
            )
            .then(toArray)
            .end()}
        </div>
      ))}
    </div>
  );
};
