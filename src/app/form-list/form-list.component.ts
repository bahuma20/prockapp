import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-list',
  templateUrl: './form-list.component.html',
  styleUrls: ['./form-list.component.scss']
})
export class FormListComponent implements OnInit {
  public forms = [
    {
      id: 1,
      title: 'Formular 1'
    },
    {
      id: 2,
      title: 'Regiebericht'
    }
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
