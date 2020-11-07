import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormListComponent} from './form-list/form-list.component';
import {FormDetailComponent} from './form-detail/form-detail.component';
import {LoginComponent} from './login/login.component';

const routes: Routes = [
  {
    path: '',
    component: FormListComponent
  },
  {
    path: 'form/:id',
    component: FormDetailComponent
  },
  {
    path: 'login',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
