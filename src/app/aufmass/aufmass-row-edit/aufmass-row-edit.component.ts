import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AufmassRow} from '../Aufmass.model';
import {MatRadioChange} from '@angular/material/radio';
import {formatDimensions} from '../shared';

@Component({
  selector: 'app-aufmass-row-edit',
  templateUrl: './aufmass-row-edit.component.html',
  styleUrls: ['./aufmass-row-edit.component.scss']
})
export class AufmassRowEditComponent implements OnInit {
  @Input() row: AufmassRow;
  @Output() rowChange = new EventEmitter<AufmassRow>();

  constructor() { }

  ngOnInit() {
  }

  test() {
    this.row.count += 10;
    this.rowChange.emit(this.row);
  }

  onDimensionsChanged($event: Event) {
    const target = ($event.target as HTMLInputElement);
    const cursorPosition = target.selectionStart;

    let value = target.value;
    let characters = value.split('');

    const strLenBefore = characters.length;

    const allowedCharacters = [
      '+',
      '-',
      '*',
      '/',
      '.',
      '(',
      ')',
      ' ',
    ];

    characters = characters.filter(char => {
      return !isNaN(+char) || allowedCharacters.indexOf(char) !== -1;
    });

    value = characters.join('');
    const strLenAfter = value.length;

    this.row.dimensions = value;
    this.rowChange.emit(this.row);
    target.value = value;

    target.selectionStart = cursorPosition - (strLenBefore - strLenAfter);
    target.selectionEnd = cursorPosition - (strLenBefore - strLenAfter);
  }
}
