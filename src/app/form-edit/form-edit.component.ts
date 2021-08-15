import { Component, OnInit } from '@angular/core';
import Submission from '../model/Submission';
import {FormStoreService} from '../services/form-store.service.js';
import {ActivatedRoute, Router} from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-form-edit',
  templateUrl: './form-edit.component.html',
  styleUrls: ['./form-edit.component.scss']
})
export class FormEditComponent implements OnInit {
  form: any;
  submission: Submission;
  displayedForm: any;

  constructor(private formStore: FormStoreService, private route: ActivatedRoute, private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.formStore.getForm(params.path)
        .subscribe(form => {
          this.form = form;

          const submission = this.formStore.getSubmissionByUuid(params.uuid);

          if (submission) {
            this.submission = submission;

            this.updateDisplayedForm();
          }
        });
    });
  }

  onSubmit(submission) {
    console.log(submission);
    this.submission.submission = submission;
    this.formStore.updateSubmission(this.submission.uuid, this.submission).subscribe(data => {
      this.snackBar.open('Eintrag wurde gespeichert', null, {
        duration: 5000
      });
      this.router.navigateByUrl('/form/' + this.form.path);
    }, error => {
      this.snackBar.open('Fehler: Eintrag konnte nicht gespeichert werden!');
    });
  }

  private updateDisplayedForm() {
    const displayedForm = this.form;

    displayedForm.components = displayedForm.components.filter(item => {
      return item.tags ? item.tags.indexOf('signing') === -1 : true;
    });

    this.displayedForm = displayedForm;
  }
}
