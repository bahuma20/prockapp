import { Component, OnInit } from '@angular/core';
import {FormStoreService} from '../form-store.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material';
import * as uuid from 'uuid';
import {formatDate} from "@angular/common";

@Component({
  selector: 'app-form-detail',
  templateUrl: './form-detail.component.html',
  styleUrls: ['./form-detail.component.scss']
})
export class FormDetailComponent implements OnInit {
  form: any;
  displayedForm: any;

  constructor(private formStore: FormStoreService, private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.formStore.getForm(params.get('path'))
        .subscribe(form => {
          this.form = form;
          this.updateDisplayedForm();
        });
    })
  }

  onSubmit(submission) {
    console.log(submission);
    submission.data.created = formatDate(new Date(), 'yyyy-MM-ddTHH:mm:ssZ', 'en');

    this.formStore.storeSubmission({
      formId: this.form._id,
      formPath: this.form.path,
      submission,
      uuid: uuid.v4(),
    }).subscribe(value => {
      this.snackBar.open('Formular wurde gespeichert', null, {
        duration: 5000
      });
      this.router.navigateByUrl('/form/' + this.form.path);
    }, error => {
      console.error(error)
      this.snackBar.open('Beim Speichern ist ein Fehler aufgetreten. Starten Sie die App neu.', null, {
        duration: 5000
      });
    })
  }

  private updateDisplayedForm() {
    const displayedForm = this.form;

    displayedForm.components = displayedForm.components.filter(item => {
      if (!item.tags) {
        return true;
      }

      return item.tags.indexOf('signing') === -1;
    });

    this.displayedForm = displayedForm;
  }
}
