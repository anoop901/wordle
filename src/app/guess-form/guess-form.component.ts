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

  get wordControl() {
    return this.guessFormGroup.get('word')!;
  }

  addLetterToGuess(letter: string) {
    this.wordControl.setValue((this.wordControl.value || '') + letter);
  }

  onSubmit() {
    this.onGuess.emit(this.guessFormGroup.value.word.toLowerCase());
    this.guessFormGroup.reset();
  }

  constructor() {}

  ngOnInit(): void {}
}
