import { Component, OnInit } from '@angular/core';
import chain from '@anoop901/js-util/chain';
import allMatch from '@anoop901/js-util/iterables/allMatch';
import { scoreWord } from 'src/scoreWord';
import { HistoryItem } from 'src/types/HistoryItem';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],
})
export class PlayComponent implements OnInit {
  target = '';
  history: HistoryItem[] = [];
  finished = false;

  onGuess(guess: string) {
    const result = scoreWord(guess, this.target);
    this.history.push({ guess, result });
    this.finished = chain(result)
      .then(allMatch((x) => x === 'correct'))
      .end();
  }

  constructor() {}

  ngOnInit(): void {
    // TODO: initialize target word from possible_target_words.json
    this.target = 'cloud';
  }
}
