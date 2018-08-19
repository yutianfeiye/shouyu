import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthenticatedGuard } from './login/authenticated.guard';

const routes: Routes = [
  {
    path: 'home',
     loadChildren: './layout/layout.module#LayoutModule',
     // canActivate: [AuthenticatedGuard],
     data: {
       i18n: {
         isRoot: true
       }
     }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      meta: {
        title: '智能手语翻译系统'
      }
    }
  },
  {
    path: '',
    component: LoginComponent,
    data: {
      meta: {
        title: '智能手语翻译系统'
      }
    }
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
