import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PlayComponent } from './play/play.component';
import { CreateComponent } from './create/create.component';
import { GuessDisplayComponent } from './guess-display/guess-display.component';
import { LettersDisplayComponent } from './letters-display/letters-display.component';
import { GuessFormComponent } from './guess-form/guess-form.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayComponent,
    CreateComponent,
    GuessDisplayComponent,
    LettersDisplayComponent,
    GuessFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
