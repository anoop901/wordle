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

  onSubmit() {
    this.onGuess.emit(this.guessFormGroup.value.word.toLowerCase());
    this.guessFormGroup.reset();
  }

  constructor() {}

  ngOnInit(): void {}
}
