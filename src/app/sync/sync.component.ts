import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormStoreService} from '../form-store.service';
import Submission from '../model/Submission';
import {ConnectionService} from '../connection.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-sync',
  templateUrl: './sync.component.html',
  styleUrls: ['./sync.component.scss']
})
export class SyncComponent implements OnInit, OnDestroy {

  status = 'ONLINE';
  isConnected = true;

  forms: any[];

  private connectionServiceSubscription: Subscription;

  constructor(public formStore: FormStoreService, private connectionService: ConnectionService) {
    this.formStore.getForms().subscribe(forms => {
      this.forms = forms;
    });
  }

  ngOnInit() {
    this.connectionServiceSubscription = this.connectionService.monitor().subscribe(connectionState => {
      this.isConnected = connectionState.hasNetworkConnection;
      if (this.isConnected) {
        this.status = 'ONLINE';
      }
      else {
        this.status = 'OFFLINE';
      }
    });

    // this.isConnected = navigator.onLine;
    // if (this.isConnected) {
    //   this.status = 'ONLINE';
    // }
    // else {
    //   this.status = 'OFFLINE';
    // }
  }

  ngOnDestroy() {
    this.connectionServiceSubscription.unsubscribe();
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
