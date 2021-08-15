import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormStoreService} from '../services/form-store.service.js';
import Submission from '../model/Submission';
import {FormValueFormatterService} from '../services/form-value-formatter.service.js';
import {formatDate} from '@angular/common';
import {MatSnackBar} from '@angular/material/snack-bar';

interface Field {
  label: string,
  value: string,
  rawComponent: any,
  rawValue: any,
}

@Component({
  selector: 'app-form-signing',
  templateUrl: './form-signing.component.html',
  styleUrls: ['./form-signing.component.scss']
})
export class FormSigningComponent implements OnInit {
  form: any;
  submission: Submission;

  displayedFields: Field[] = [];
  signingForm: any;

  constructor(private formStore: FormStoreService,
              private route: ActivatedRoute,
              private valueFormatter: FormValueFormatterService,
              private snackbar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.formStore.getForm(params.get('path'))
        .subscribe(form => {
          this.form = form;

          const submission = this.formStore.getSubmissionByUuid(params.get('uuid'));

          if (submission) {
            this.submission = submission;

            this.updateDisplayedFields();
            this.generateSigningForm();
          }
        });


    })
  }

  updateDisplayedFields() {
    const components = this.form.components.filter(item => {
      if (!item.tags) {
        return true;
      }

      return item.tags.indexOf('signing') === -1 && item.tags.indexOf('pdfHidden') === -1;
    });

    components.forEach(component => {
      const field: Field = {
        label: this.valueFormatter.formatLabel(this.form, component.key),
        value: this.valueFormatter.formatValue(this.form, component.key, this.submission.submission.data[component.key]),
        rawComponent: component,
        rawValue: this.submission.submission.data[component.key],
      };

      this.displayedFields.push(field);
    });
  }

  onSubmit(submission) {
    console.log(submission);

    const newData = {...this.submission.submission.data, ...submission.data};

    newData.signed = true;
    newData.signingDate = formatDate(new Date(), 'yyyy-MM-ddTHH:mm:ssZ', 'en');

    this.submission.submission.data = newData;

    this.formStore.updateSubmission(this.submission.uuid, this.submission)
      .subscribe(data => {
        this.snackbar.open('Das Formular wurde unterschrieben.')
        this.router.navigateByUrl('/form/' + this.form.path);
      }, error => {
        console.error(error);
        this.snackbar.open('Beim Speichern ist ein Fehler aufgetreten.')
      })

    console.log(newData);
  }

  private generateSigningForm() {
    const signingForm = this.form;
    signingForm.components = signingForm.components.filter(item => {
      if (item.key === 'submit') {
        return true;
      }

      return item.tags.indexOf('signing') !== -1;
    });

    this.signingForm = signingForm;
  }
}
