import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-guess-form',
  templateUrl: './guess-form.component.html',
  styleUrls: ['./guess-form.component.css'],
})
export class GuessFormComponent implements OnInit {
  GUESS_LENGTH = 5;
  guessFormGroup = new FormGroup({
    word: new FormControl(''),
  });
  @Output() onGuess = new EventEmitter<string>();

  constructor() {}

  ngOnInit(): void {}
}
