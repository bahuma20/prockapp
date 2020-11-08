import { Component, OnInit } from '@angular/core';
import {FormStoreService} from '../form-store.service';
import {Observable} from 'rxjs';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-form-detail',
  templateUrl: './form-detail.component.html',
  styleUrls: ['./form-detail.component.scss']
})
export class FormDetailComponent implements OnInit {
  form: any;

  constructor(private formStore: FormStoreService, private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.formStore.getForm(params.get('path'))
        .subscribe(form => {
          this.form = form;
        });
    })
  }

  onSubmit(submission) {
    console.log(submission);
    this.formStore.storeSubmission({
      created: new Date(),
      formId: this.form._id,
      formPath: this.form.path,
      submission
    }).subscribe(value => {
      this.snackBar.open('Formular wurde gespeichert', null, {
        duration: 5000
      });
      this.router.navigateByUrl('');
    }, error => {
      console.error(error)
      this.snackBar.open('Beim Speichern ist ein Fehler aufgetreten. Starten Sie die App neu.', null, {
        duration: 5000
      });
    })
  }

}
