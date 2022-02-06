import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import chain from '@anoop901/js-util/chain';
import allMatch from '@anoop901/js-util/iterables/allMatch';
import { scoreWord } from 'src/scoreWord';
import { HistoryItem } from 'src/types/HistoryItem';
import { GuessFormComponent } from '../guess-form/guess-form.component';

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],
})
export class PlayComponent implements OnInit {
  @ViewChild('guessForm') guessForm!: GuessFormComponent;

  target = '';
  history: HistoryItem[] = [];
  finished = false;

  get loaded() {
    return this.target.length > 0;
  }

  onGuess(guess: string) {
    const result = scoreWord(guess, this.target);
    this.history.push({ guess, result });
    this.finished = chain(result)
      .then(allMatch((x) => x === 'correct'))
      .end();
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<string[]>('assets/possible_target_words.json')
      .subscribe((possible_target_words) => {
        this.target =
          possible_target_words[
            Math.floor(Math.random() * possible_target_words.length)
          ];
      });
  }
}
