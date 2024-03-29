import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {AufmassPosition, AufmassRow} from '../Aufmass.model';
import * as math from 'mathjs';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { formatDimensions } from '../shared';
import {MatTable} from '@angular/material/table';

@Component({
  selector: 'app-aufmass-position',
  templateUrl: './aufmass-position.component.html',
  styleUrls: ['./aufmass-position.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class AufmassPositionComponent implements OnInit {

  @Input() value!: AufmassPosition;

  @Output() valueChange = new EventEmitter<AufmassPosition>();

  columnsToDisplay = ['label', 'count', 'dimensions', 'messgehalt', 'actions'];

  expandedElement: AufmassRow | null;

  @ViewChild(MatTable, {static: true}) table: MatTable<AufmassPosition>;

  constructor() { }

  ngOnInit() {
  }

  calculateRow(element: AufmassRow): number|null {
    if (element.dimensions) {
      let result: number;
      try {
         result = math.evaluate(element.dimensions);
      } catch (error) {
        return null;
      }

      if (result === Infinity) {
        return null;
      }

      result = element.count * result;

      if (element.type === 'subtract') {
        result = 0 - result;
      }

      return result;
    }

    return null;
  }

  sumRows() {
    let result = 0;
    this.value.rows.forEach(row => {
      const rowValue = this.calculateRow(row);

      if (rowValue == null) {
        return;
      }

      result += rowValue;
    });

    return result;
  }

  formatDimensions(dimensions: string): string {
    return formatDimensions(dimensions);
  }

  hasError(row: AufmassRow) {
    return row.dimensions !== null && row.dimensions !== '' && this.calculateRow(row) === null
  }

  addRow() {
    const newRow: AufmassRow = {
      label: null,
      dimensions: '',
      type: 'add',
    };
    this.value.rows.push(newRow);
    this.expandedElement = newRow;
    this.table.renderRows();
    this.onChange();
  }

  deleteRow(i) {
    this.value.rows.splice(i, 1);
    this.expandedElement = null;
    this.table.renderRows();
    this.onChange();
  }

  onChange() {
    this.valueChange.emit(this.value);
  }
}
