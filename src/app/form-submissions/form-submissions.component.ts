import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormStoreService} from "../services/form-store.service.js";
import Submission from "../model/Submission";
import {BehaviorSubject} from "rxjs";
import {FormValueFormatterService} from "../services/form-value-formatter.service.js";

interface Column {
  key: string,
  label: string,
}

@Component({
  selector: 'app-form-submissions',
  templateUrl: './form-submissions.component.html',
  styleUrls: ['./form-submissions.component.scss']
})
export class FormSubmissionsComponent implements OnInit {
  form: any;
  submissions$ = new BehaviorSubject<Submission[]>([]);

  displayedColumns$ = new BehaviorSubject<string[]>([]);

  columns: Column[] = [];

  constructor(private formStore: FormStoreService, private route: ActivatedRoute, public valueFormatter: FormValueFormatterService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.formStore.getForm(params.get('path'))
        .subscribe(form => {
          this.form = form;

          this.updateHeaders();

          this.formStore.getSubmissions(form._id)
            .subscribe(data => {
              this.submissions$.next(data);
            });
        });
    })
  }

  private updateHeaders() {
    const headers = [];

    this.form.components.forEach(component => {
      if (component.tableView) {
        this.columns.push({
          key: component.key,
          label: component.label,
        });
        headers.push(component.key);
      }
    });

    headers.push('actions');

    this.displayedColumns$.next(headers);
  }
}
