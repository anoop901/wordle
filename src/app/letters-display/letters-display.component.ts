import { Component, Input, OnInit } from '@angular/core';
import chain from '@anoop901/js-util/chain';
import map from '@anoop901/js-util/iterables/map';
import toArray from '@anoop901/js-util/iterables/toArray';
import zip from '@anoop901/js-util/iterables/zip';
import { HistoryItem } from 'src/types/HistoryItem';

@Component({
  selector: 'app-letters-display',
  templateUrl: './letters-display.component.html',
  styleUrls: ['./letters-display.component.css'],
})
export class LettersDisplayComponent implements OnInit {
  @Input() history!: HistoryItem[];
  ALL_LETTERS = [...'abcdefghijklmnopqrstuvwxyz'];

  get lettersWithStatuses() {
    const guesses = this.history.flatMap((historyItem) =>
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
        .filter((guess) => guess.result === 'correct')
        .map((guess) => guess.guessedLetter)
    );
    const guessedLettersMisplaced = new Set(
      guesses
        .filter((guess) => guess.result === 'misplaced')
        .map((guess) => guess.guessedLetter)
    );
    return this.ALL_LETTERS.map((letter) => ({
      letter,
      status: guessedLettersCorrect.has(letter)
        ? 'correct'
        : guessedLettersMisplaced.has(letter)
        ? 'misplaced'
        : !guessedLetters.has(letter)
        ? 'unguessed'
        : 'absent',
    }));
  }

  constructor() {}

  ngOnInit(): void {}
}
