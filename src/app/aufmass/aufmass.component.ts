import {AfterContentInit, AfterViewInit, Component, OnInit} from '@angular/core';
import {MaterialComponent, registerComponent} from 'angular-material-formio';
import {Aufmass, AufmassPosition} from './Aufmass.model';
import {throws} from 'assert';

@Component({
  selector: 'app-aufmass',
  templateUrl: './aufmass.component.html',
  styleUrls: ['./aufmass.component.scss'],
})
export class AufmassComponent extends MaterialComponent implements OnInit {

  // value: Aufmass = null;

  value: Aufmass = null


  ngOnInit() {
    super.ngOnInit();
    this.control.valueChanges.subscribe((data: Aufmass | null) => {
      if (this.value === null) {
        if (data === null) {
          data = {
            unit: 'm²',
            positions: [
              {
                rows: [
                  {
                    label: null,
                    type: 'add',
                    dimensions: '',
                  }
                ]
              }
            ]
          }
        }

        this.value = data;
      }
    })
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
    });
    this.valueChanged();
  }

  removePosition(index: number) {
    this.value.positions.splice(index, 1);
    this.valueChanged();
  }

  valueChanged() {
    this.control.setValue(this.value);
    super.onChange();
  }
}

registerComponent('aufmass', AufmassComponent);
