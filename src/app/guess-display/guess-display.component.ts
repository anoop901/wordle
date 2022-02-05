import { Component, Input, OnInit } from '@angular/core';
import { LetterResult } from 'src/types/LetterResult';
import { Result } from '../../types/Result';
import chain from '@anoop901/js-util/chain';
import map from '@anoop901/js-util/iterables/map';
import toArray from '@anoop901/js-util/iterables/toArray';
import zip from '@anoop901/js-util/iterables/zip';
import { HistoryItem } from 'src/types/HistoryItem';

@Component({
  selector: 'app-guess-display',
  templateUrl: './guess-display.component.html',
  styleUrls: ['./guess-display.component.css'],
})
export class GuessDisplayComponent implements OnInit {
  @Input() history!: HistoryItem[];

  constructor() {}

  ngOnInit(): void {}

  zippedLettersAndResults(
    guess: string,
    result: Result
  ): { letter: string; letterResult: LetterResult }[] {
    return chain(zip(guess, result))
      .then(
        map(({ first, second }) => ({ letter: first, letterResult: second }))
      )
      .then(toArray)
      .end();
  }
}
