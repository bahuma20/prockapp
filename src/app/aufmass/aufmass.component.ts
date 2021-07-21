import { Component, OnInit } from '@angular/core';
import {MaterialComponent, registerComponent} from 'angular-material-formio';
import {Aufmass} from './Aufmass.model';

@Component({
  selector: 'app-aufmass',
  templateUrl: './aufmass.component.html',
  styleUrls: ['./aufmass.component.scss'],
})
export class AufmassComponent extends MaterialComponent {

  value: Aufmass = {
    unit: 'm²',
    positions: [
      {
        rows: [
          {
            count: null,
            label: 'Wohnzimmer',
            dimensions: null,
            type: null,
          },
          {
            count: 4,
            label: 'Wände',
            dimensions: '12*5.8+(5-2.2*2)',
            type: 'add',
          },
          {
            count: 2,
            label: 'Fenster',
            dimensions: '2.4*4',
            type: 'subtract',
          },
        ]
      },
      {
        rows: [
          {
            count: null,
            label: 'Schlafzimmer',
            dimensions: null,
            type: null,
          },
        ]
      }
    ]
  }

  rows = []

  test() {
    console.log('bla');
    this.control.setValue('12345');
    super.onChange();
  }

  addPosition() {
    this.value.positions.push({
      rows: [
        {
          label: null,
          dimensions: '',
          type: 'add',
        }
      ]
    })
  }
}

registerComponent('aufmass', AufmassComponent);
