import {Inject, Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Plugins, StoragePlugin} from '@capacitor/core';
import {Observable} from 'rxjs';
import Submission from './model/Submission';
import {APP_CONFIG, AppConfig} from './app-config.module';

@Injectable({
  providedIn: 'root'
})
export class FormStoreService {
  public forms: object[] = [];

  public submissions: Submission[] = [];
  public failedSubmissions: Submission[] = [];
  public uploadRunning = false;

  storage: StoragePlugin;

  constructor(private auth: AuthService, private http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) {
    this.storage = Plugins.Storage;

    this.getForms()
      .subscribe(forms => this.forms = forms);

    this.getSubmissions()
      .subscribe(submissions => this.submissions = submissions);
  }

  sync() {
    this.syncForms();
    this.syncSubmissions();
  }

  storeSubmission(submission: Submission): Observable<any> {
    return new Observable<any>(observer => {
      this.storage.get({
        key: 'submissions',
      }).then(data => {
        let submissions = JSON.parse(data.value);

        if (!submissions) {
          submissions = [];
        }

        submissions.push(submission);

        return this.storage.set({
          key: 'submissions',
          value: JSON.stringify(submissions),
        });
      }).then(data => {
        this.submissions.push(submission);
        observer.next();
      }).catch(error => {
        observer.error(error);
      });
    });

  }

  storeForms(forms: Array<any>): Observable<any> {
    return new Observable<any>(observer => {
      const data = {};

      forms.forEach(form => {
        data[form.path] = form;
      });

      this.storage.set({
        key: 'forms',
        value: JSON.stringify(data),
      }).then(() => {
        observer.next();
      }).catch(() => {
        observer.error('Could not store forms');
      });
    });
  }

  getForms(): Observable<Array<object>> {
    return new Observable<any>(observer => {
      this.storage.get({
        key: 'forms',
      }).then(data => {
        let forms: object = JSON.parse(data.value);

        if (!forms) {
          forms = {};
        }

        const formsArray: Array<object> = Object.values(forms);

        observer.next(formsArray);
      }).catch(error => {
        console.error(error);
        observer.error('Could not load forms data from storage');
      });
    });
  }

  getForm(path: string): Observable<any> {
    return new Observable<any>(observer => {
      this.storage.get({
        key: 'forms',
      }).then(data => {
        let forms: object = JSON.parse(data.value);

        if (!forms) {
          forms = {};
        }

        if (!forms.hasOwnProperty(path)) {
          observer.error('Form with this path not found');
          return;
        }

        observer.next(forms[path]);
      }).catch(error => {
        console.error(error);
        observer.error('Could not load forms data from storage');
      });
    });
  }

  private syncForms() {
    this.auth.getJwt()
      .subscribe(jwt => {
        this.http.get<Array<object>>(this.config.apiEndpoint + '/form?tags=prockapp', {
          headers: new HttpHeaders({
            'x-jwt-token': jwt,
          })
        }).subscribe(data => {
          this.storeForms(data)
            .subscribe(success => {
              this.getForms().subscribe(forms => this.forms = forms);
            }, error => {
              console.error('error')
            });
        });
      });
  }

  private syncSubmissions() {
    if (this.submissions.length > 0) {
      this.uploadRunning = true;
      this.uploadSubmission();
    }
  }

  private uploadSubmission() {
    const submission = this.submissions.pop();

    this.auth.getJwt().subscribe(jwt => {
      this.http.post(this.config.apiEndpoint + '/' + submission.formPath + '/submission', submission.submission, {
        headers: new HttpHeaders({
          'x-jwt-token': jwt,
        })
      }).subscribe(data => {
        if (this.submissions.length === 0) {
          this.submissions = this.failedSubmissions;
          this.failedSubmissions = [];
          this.uploadRunning = false;
          this.storeSubmissions(this.submissions)
            .subscribe();
        } else {
          this.uploadSubmission()
        }
      }, error => {
        this.failedSubmissions.push(submission);

        if (this.submissions.length === 0) {
          this.submissions = this.failedSubmissions;
          this.failedSubmissions = [];
          this.uploadRunning = false;
          this.storeSubmissions(this.submissions).subscribe();
        } else {
          this.uploadSubmission();
        }
      })
    }, error => {
      console.error(error);
    })
  }

  getSubmissions(): Observable<Submission[]> {
    return new Observable<Submission[]>(observer => {
      this.storage.get({
        key: 'submissions',
      }).then(data => {
        if (!data.value) {
          data.value = '[]';
        }

        const submissions = JSON.parse(data.value);

        observer.next(submissions);
      }).catch(error => {
        console.error(error);
        observer.error(error);
      });
    })
  }

  private storeSubmissions(submissions: Submission[]) {
    return new Observable(observer => {
      this.storage.set({
        key: 'submissions',
        value: JSON.stringify(submissions),
      }).then(() => {
        observer.next();
      }).catch(error => {
        observer.error(error);
      });
    });
  }
}
