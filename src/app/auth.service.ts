import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return new Observable<any>(observer => {
      this.http.post('http://localhost:3001/user/login', {
        data: {
          email,
          password
        },
      }).subscribe((data: any) => {
        console.log('finished');
        console.log(data);
        observer.next();
      }, error => {
        console.error(error);
        observer.error(error);
      })
    });
  }
}
