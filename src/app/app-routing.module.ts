import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {FormListComponent} from './form-list/form-list.component';
import {FormDetailComponent} from './form-detail/form-detail.component';

const routes: Routes = [
  {
    path: '',
    component: FormListComponent
  },
  {
    path: 'form/:id',
    component: FormDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
