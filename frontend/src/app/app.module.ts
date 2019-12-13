import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {RouterModule} from '@angular/router';
import { FormsModule } from '@angular/forms';

import {AppComponent} from './app.component';
import {QuestionsApiService} from './questions/questions-api.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule,
    FormsModule,
  ],
  providers: [QuestionsApiService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
