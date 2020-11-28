import { Injectable } from '@angular/core';
import {formatDate} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class FormValueFormatterService {

  constructor() { }

  formatLabel(form: any, key: string) {
    const [component] = form.components.filter(item => {return item.key === key});

    if (component.type === 'signature') {
      return component.footer;
    }

    return component.label;
  }

  formatValue(form: any, key: string, value: any) {
    const [component] = form.components.filter(item => {return item.key === key});

    if (component.type === 'datetime' && value) {
      return formatDate(value, component.format, 'en-US');
    }

    if (component.type === 'checkbox') {
      return value ? 'ja' : 'nein';
    }

    if (component.type === 'signature') {
      return '<img src="'+ value +'" width="350px">'
    }

    if (component.type === 'textarea') {
      return value.replaceAll('\n', '<br>')
    }

    return value;
  }
}
