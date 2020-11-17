import { Component, OnInit } from '@angular/core';
import {FormStoreService} from '../form-store.service';
import {Observable} from 'rxjs';
import {ConnectionService} from 'ng-connection-service';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss']
})
export class FormListComponent implements OnInit {
  forms$: Observable<Array<object>>;

  constructor(public formStore: FormStoreService, private connectionService: ConnectionService) { }

  ngOnInit(): void {
    this.forms$ = this.formStore.getForms();
  }

  sync() {
    this.formStore.sync();
  }
}
