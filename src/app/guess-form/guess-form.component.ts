import { HttpClient } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-guess-form',
  templateUrl: './guess-form.component.html',
  styleUrls: ['./guess-form.component.css'],
})
export class GuessFormComponent implements OnInit {
  GUESS_LENGTH = 5;
  guessFormGroup = new FormGroup({
    word: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(5),
    ]),
  });
  @Output() onGuess = new EventEmitter<string>();
  guessableWords = new Set<string>();

  get wordControl() {
    return this.guessFormGroup.get('word')!;
  }

  addLetterToGuess(letter: string) {
    this.wordControl.setValue((this.wordControl.value || '') + letter);
  }

  onSubmit() {
    const guessedWord = this.guessFormGroup.value.word.toLowerCase();
    if (this.guessableWords.has(guessedWord)) {
      this.onGuess.emit(guessedWord);
      this.guessFormGroup.reset();
    }
  }

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http
      .get<string[]>('assets/guessable_words.json')
      .subscribe((guessableWords) => {
        this.guessableWords = new Set(guessableWords);
      });
  }
}
