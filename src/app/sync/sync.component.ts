import { Component, OnInit } from '@angular/core';
import {FormStoreService} from '../form-store.service';
import {ConnectionService} from 'ng-connection-service';
import Submission from "../model/Submission";

@Component({
  selector: 'app-sync',
  templateUrl: './sync.component.html',
  styleUrls: ['./sync.component.scss']
})
export class SyncComponent implements OnInit {

  status = 'ONLINE';
  isConnected = true;

  forms: any[];

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

    this.formStore.getForms().subscribe(forms => {
      this.forms = forms;
    });
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

  signedCount(forms: any[], submissions: Submission[]) {
    if (!submissions || !forms) {
      return 0;
    }
    return this.formStore.submissions.length - this.unsignedCount(forms, submissions);
  }

  unsignedCount(forms: any[], submissions: Submission[]) {
    if (!submissions || !forms) {
      return 0;
    }
    return this.formStore.getUnsignedSubmissions(forms, this.formStore.submissions).length;
  }
}
