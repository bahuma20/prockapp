import {Inject, Injectable} from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Storage } from '@capacitor/storage';
import {APP_CONFIG, AppConfig} from '../app-config.module.js';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) {
  }

  login(email: string, password: string): Observable<any> {
    return new Observable<any>(observer => {
      this.http.post(this.config.apiEndpoint + '/user/login', {
        data: {
          email,
          password
        },
      }).subscribe((data: any) => {
        Promise.all([
          Storage.set({
            key: 'auth_email',
            value: email,
          }),
          Storage.set({
            key: 'auth_password',
            value: password,
          })
        ]).then(() => {
          observer.next();
        });

        }, error => {
        console.error(error);
        observer.error(error);
      });
    });
  }

  getJwt(): Observable<string> {
    return new Observable<string>(observer => {
      Storage.get({
        key: 'auth_jwt'
      }).then(data => {
        if (!data.value) {
          this.fetchJwt()
            .subscribe(jwt => {
              observer.next(jwt);
            }, error => {
              observer.error(error);
            });
        } else {
          const jwt = data.value;
          const helper = new JwtHelperService();

          if (helper.isTokenExpired(jwt)) {
            this.fetchJwt()
              .subscribe(newJwt => {
                observer.next(newJwt);
              }, error => {
                observer.error(error);
              });
          } else {
            observer.next(jwt);
          }
        }
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  private fetchJwt(): Observable<string> {
    return new Observable<string>(observer => {
      this.authenticate().subscribe(response => {
        const jwt = response.headers.get('x-jwt-token');
        this.storeJwt(jwt).subscribe(() => {
          observer.next(jwt);
        }, error => {
          observer.error(error);
        });
      }, error => {
        observer.error(error);
      });
    });
  }

  private storeJwt(jwt: string): Observable<any> {
    return new Observable<any>(observer => {
      Storage.set({
        key: 'auth_jwt',
        value: jwt,
      }).then(() => {
        observer.next();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  private authenticate(): Observable<HttpResponse<any>> {
    return new Observable<HttpResponse<any>>(observer => {
      Promise.all([
        Storage.get({
          key: 'auth_email',
        }),
        Storage.get({
          key: 'auth_password',
        }),
      ]).then(values => {
        const email = values[0].value;
        const password = values[1].value;

        this.http.post(this.config.apiEndpoint + '/user/login', {
          data: {
            email,
            password
          },
        }, {
          observe: 'response'
        }).subscribe(response => {
          observer.next(response);
        }, error => {
          observer.error(error);
        });
      });
    });
  }
}
