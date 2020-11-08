import {Inject, Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient} from '@angular/common/http';
import {Plugins, StoragePlugin} from '@capacitor/core';
import {Observable} from 'rxjs';
import Submission from './model/Submission';
import {APP_CONFIG, AppConfig} from './app-config.module';

@Injectable({
  providedIn: 'root'
})
export class FormStoreService {
  public forms: Array<object>;

  public submissions: Array<object>;

  storage: StoragePlugin;

  constructor(private auth: AuthService, private http: HttpClient, @Inject(APP_CONFIG) private config: AppConfig) {
    this.storage = Plugins.Storage;

    this.getForms()
      .subscribe(forms => this.forms = forms);
  }

  sync() {
    this.auth.authenticate()
      .subscribe(() => {
        this.syncForms();

        // this.http.post(this.config.apiEndpoint + '/regiebericht/submission', {
        //   data: {
        //     reporttext: 'Text from sync',
        //   }
        // }).subscribe(data => {
        //   console.log(data)
        // })
      })
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
        observer.next();
      }).catch(error => {
        observer.error(error);
      });
    });

  }

  storeForms(forms: Array<any>): Observable<any> {
    console.log(forms);
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
    this.http.get<Array<object>>(this.config.apiEndpoint + '/form?tags=prockapp').subscribe(data => {
      this.storeForms(data)
        .subscribe(success => {
          console.log('success');
          this.getForms().subscribe(forms => this.forms = forms);
        }, error => {
          console.error('error')
        });
    });
  }
}
