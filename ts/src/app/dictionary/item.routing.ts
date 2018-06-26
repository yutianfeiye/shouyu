import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ItemInputComponent } from './item-input';

const routes: Routes = [
  {
    path: '' , component : ItemInputComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
// tslint:disable-next-line:eofline
export class RoutingModule {}
