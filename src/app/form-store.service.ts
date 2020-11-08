import { Injectable } from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FormStoreService {

  constructor(private auth: AuthService, private http: HttpClient) { }

  sync() {
    this.auth.authenticate()
      .subscribe(() => {
        this.http.post('http://localhost:3001/regiebericht/submission', {
          data: {
            reporttext: 'Text from sync',
          }
        }).subscribe(data => {
          console.log(data)
        })
      })
  }
}
