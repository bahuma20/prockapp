import {Inject, Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Storage } from '@capacitor/storage';
import {Observable} from 'rxjs';
import Submission from './model/Submission';
import {APP_CONFIG, AppConfig} from './app-config.module';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class FormStoreService {
  public forms = [];

  public submissions: Submission[] = [];
  public failedSubmissions: Submission[] = [];
  public unsignedSubmissions: Submission[] = [];
  public uploadRunning = false;

  constructor(private auth: AuthService,
              private http: HttpClient,
              @Inject(APP_CONFIG) private config: AppConfig,
              private snackBar: MatSnackBar) {

    this.getForms()
      .subscribe(forms => this.forms = forms);

    this.getSubmissions()
      .subscribe(submissions => this.submissions = submissions);
  }

  sync() {
    this.snackBar.open('Daten werden übertragen...', null, {
      duration: 2000
    });
    this.syncForms();
    this.syncSubmissions();
  }

  storeSubmission(submission: Submission): Observable<any> {
    return new Observable<any>(observer => {
      Storage.get({
        key: 'submissions',
      }).then(data => {
        let submissions = JSON.parse(data.value);

        if (!submissions) {
          submissions = [];
        }

        submissions.push(submission);

        return Storage.set({
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

      Storage.set({
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
      Storage.get({
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
      Storage.get({
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
        const tags = this.config.formTags.join(',');

        this.http.get<Array<object>>(this.config.apiEndpoint + '/form?tags__in=' + tags, {
          headers: new HttpHeaders({
            'x-jwt-token': jwt,
          })
        }).subscribe(data => {
          this.storeForms(data)
            .subscribe(success => {
              this.getForms().subscribe(forms => this.forms = forms);
            }, error => {
              console.error(error);
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

    const submissionData = submission.submission;

    this.auth.getJwt().subscribe(jwt => {
      let request;

      if (submissionData._id) {
        request = this.http.put(this.config.apiEndpoint + '/' + submission.formPath + '/submission/' + submissionData._id, {
          data: submissionData.data
        }, {
          headers: new HttpHeaders({
            'x-jwt-token': jwt,
          })
        });
      } else {
        request = this.http.post(this.config.apiEndpoint + '/' + submission.formPath + '/submission', submissionData, {
          headers: new HttpHeaders({
            'x-jwt-token': jwt,
          })
        });
      }

      request.subscribe(data => {
        this.getForm(submission.formPath).subscribe(form => {
          if (form.tags.indexOf('signing') !== -1 && submissionData.data.signed === false) {
            submission.submission = data;
            submission.uuid = submission.submission._id;
            this.unsignedSubmissions.push(submission);
          }
          this.submissionUploadFinished();
        });
      }, error => {
        console.error(error);
        this.failedSubmissions.push(submission);
        this.submissionUploadFinished();
      });
    }, error => {
      console.error(error);
    });
  }

  submissionUploadFinished() {
    if (this.submissions.length > 0) {
      this.uploadSubmission();
      return;
    }

    let message = 'Übertragung abgeschlossen.';
    if (this.failedSubmissions.length > 0) {
      message += ' Bei ' + this.failedSubmissions.length + ' ' + (this.failedSubmissions.length === 1 ? 'Eintrag' : 'Einträgen') + ' ist ein Fehler aufgetreten!';
    }

    this.submissions = this.failedSubmissions;
    this.failedSubmissions = [];

    this.submissions.push(...this.unsignedSubmissions);
    this.unsignedSubmissions = [];

    this.uploadRunning = false;

    this.storeSubmissions(this.submissions).subscribe(data => {
      // this.downloadUnsignedSubmissions()
      //   .subscribe(data => {
      this.snackBar.open(message);
      // });
    });

    this.snackBar.open(message);
  }

  getSubmissions(form: string = null): Observable<Submission[]> {
    return new Observable<Submission[]>(observer => {
      Storage.get({
        key: 'submissions',
      }).then(data => {
        if (!data.value) {
          data.value = '[]';
        }

        let submissions: Submission[] = JSON.parse(data.value);

        if (form !== null) {
          submissions = submissions.filter(item => {
            return item.formId === form;
          });
        }

        observer.next(submissions.splice(0));
      }).catch(error => {
        console.error(error);
        observer.error(error);
      });
    });
  }

  private storeSubmissions(submissions: Submission[]) {
    return new Observable(observer => {
      Storage.set({
        key: 'submissions',
        value: JSON.stringify(submissions),
      }).then(() => {
        observer.next();
      }).catch(error => {
        observer.error(error);
      });
    });
  }

  getSubmissionByUuid(uuid: string): Submission|false {
    const results = this.submissions.filter(item => {
      return item.uuid === uuid;
    });

    if (results.length === 0) {
      return false;
    }

    return results[0];
  }

  updateSubmission(uuid: string, submission: Submission) {
    return new Observable(observer => {
      let submissionKey;
      let i = 0;
      this.submissions.forEach(item => {
        if (item.uuid === uuid) {
          submissionKey = i;
        }

        i++;
      });

      if (submissionKey === undefined) {
        observer.error('No submission with this uuid found');
        return;
      }

      this.submissions[submissionKey] = submission;

      this.storeSubmissions(this.submissions)
        .subscribe(data => {
          observer.next();
        }, error => {
          observer.error(error);
        });
    });
  }

  public getUnsignedSubmissions(forms: any[], submissions: Submission[]) {
    return submissions.filter(item => {
      const filteredForms = forms.filter(formItem => {
        return formItem._id === item.formId;
      });

      return filteredForms[0].tags.indexOf('signing') !== -1 && item.submission.data.signed === false;
    });
  }

  // public downloadUnsignedSubmissions() {
  //   return new Observable(observer => {
  //     this.auth.getJwt().subscribe(jwt => {
  //       const promises = [];
  //
  //       this.forms.forEach(form => {
  //         promises.push(this.http.get(this.config.apiEndpoint + '/' + form.path + '/submission?data.signed=false', {
  //           headers: new HttpHeaders({
  //             'x-jwt-token': jwt,
  //           })
  //         }).toPromise());
  //       });
  //
  //       Promise.all(promises)
  //         .then(datas => {
  //           const submissions = [].concat(...datas);
  //
  //           submissions.forEach(submission => {
  //             const storedSubmission = this.getSubmissionByUuid(submission._id);
  //             if (storedSubmission) {
  //               storedSubmission.submission = submission
  //               this.updateSubmission(submission._id, storedSubmission).subscribe();
  //             } else {
  //               const pathName = submission.metadata.pathName;
  //               const parts = pathName.split('/');
  //               const formPath = parts[parts.length - 1];
  //               const newSubmission: Submission = {
  //                 submission,
  //                 uuid: submission._id,
  //                 formId: submission.form,
  //                 formPath,
  //               };
  //
  //               this.storeSubmission(newSubmission).subscribe();
  //             }
  //           });
  //
  //           observer.next();
  //         })
  //     });
  //   });
  // }
}
