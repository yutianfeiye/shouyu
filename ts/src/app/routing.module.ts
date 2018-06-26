import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren: 'app/dictionary/item-input.module#ItemInputModule' },
  { path: 'speech', loadChildren: 'app/speech-to-text/index.module#IndexModule' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
