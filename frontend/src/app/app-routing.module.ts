import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

//const routes: Routes = [];
const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
