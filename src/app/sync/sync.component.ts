import { Component, OnInit } from '@angular/core';
import {FormStoreService} from '../form-store.service';
import {ConnectionService} from 'ng-connection-service';

@Component({
  selector: 'app-sync',
  templateUrl: './sync.component.html',
  styleUrls: ['./sync.component.scss']
})
export class SyncComponent implements OnInit {

  status = 'ONLINE';
  isConnected = true;

  constructor(public formStore: FormStoreService, private connectionService: ConnectionService) {
    this.connectionService.monitor().subscribe(isConnected => {
      this.isConnected = isConnected;
      if (this.isConnected) {
        this.status = 'ONLINE';
      }
      else {
        this.status = 'OFFLINE';
      }
    })
  }

  ngOnInit() {
    this.isConnected = navigator.onLine;
    if (this.isConnected) {
      this.status = 'ONLINE';
    }
    else {
      this.status = 'OFFLINE';
    }
  }

}
