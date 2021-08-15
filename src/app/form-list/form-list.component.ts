import { Component, OnInit } from '@angular/core';
import {FormStoreService} from '../services/form-store.service.js';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss']
})
export class FormListComponent implements OnInit {
  forms$: Observable<Array<object>>;

  constructor(public formStore: FormStoreService) { }

  ngOnInit(): void {
    this.forms$ = this.formStore.getForms();
  }

  sync() {
    this.formStore.sync();
  }
}
