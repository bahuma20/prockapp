import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormListComponent} from './form-list/form-list.component';
import {FormDetailComponent} from './form-detail/form-detail.component';
import {LoginComponent} from './login/login.component';
import {FormSubmissionsComponent} from './form-submissions/form-submissions.component';
import {FormSigningComponent} from './form-signing/form-signing.component';
import {FormEditComponent} from './form-edit/form-edit.component';

const routes: Routes = [
  {
    path: '',
    component: FormListComponent
  },
  {
    path: 'form/:path',
    component: FormSubmissionsComponent
  },
  {
    path: 'form/:path/create',
    component: FormDetailComponent
  },
  {
    path: 'form/:path/sign/:uuid',
    component: FormSigningComponent
  },
  {
    path: 'form/:path/edit/:uuid',
    component: FormEditComponent
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
