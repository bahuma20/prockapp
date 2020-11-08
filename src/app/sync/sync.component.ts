import { Component, OnInit } from '@angular/core';
import {FormStoreService} from '../form-store.service';

@Component({
  selector: 'app-sync',
  templateUrl: './sync.component.html',
  styleUrls: ['./sync.component.scss']
})
export class SyncComponent implements OnInit {

  constructor(public formStore: FormStoreService) { }

  ngOnInit() {
  }

}
