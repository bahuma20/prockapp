import {Inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Plugins, StoragePlugin} from '@capacitor/core';
import {APP_CONFIG, AppConfig} from './app-config.module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  storage: StoragePlugin;

  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) {
    this.storage = Plugins.Storage;
  }

  login(email: string, password: string): Observable<any> {
    return new Observable<any>(observer => {
      this.http.post(this.config.apiEndpoint + '/user/login', {
        data: {
          email,
          password
        },
      }).subscribe((data: any) => {
        console.log('LoggedIn');

        Promise.all([
          this.storage.set({
            key: 'auth_email',
            value: email,
          }),
          this.storage.set({
            key: 'auth_password',
            value: password,
          })
        ]).then(() => {
          observer.next();
        })

        }, error => {
        console.error(error);
        observer.error(error);
      })
    });
  }

  authenticate(): Observable<any> {
    return new Observable<any>(observer => {
      Promise.all([
        this.storage.get({
          key: 'auth_email',
        }),
        this.storage.get({
          key: 'auth_password',
        }),
      ]).then(values => {
        console.log(values);
        const email = values[0].value;
        const password = values[1].value;

        this.http.post(this.config.apiEndpoint + '/user/login', {
          data: {
            email,
            password
          },
        }).subscribe((data: any) => {
          observer.next();
        }, error => {
          observer.error(error);
        });
      });
    });
  }
}
