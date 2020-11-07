import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-detail',
  templateUrl: './form-detail.component.html',
  styleUrls: ['./form-detail.component.scss']
})
export class FormDetailComponent implements OnInit {

  form: any = {
    "_id": "5fa514846b3dd3253ace335f",
    "type": "form",
    "tags": [
      "common",
      "tabletapp"
    ],
    "owner": "5fa5136f6b3dd3ca94ce335c",
    "components": [
      {
        "autofocus": false,
        "input": true,
        "tableView": true,
        "label": "Auftraggeber",
        "key": "customer",
        "placeholder": "",
        "data": {
          "values": [
            {
              "value": "klinikumKosching",
              "label": "Klinikum Kösching"
            },
            {
              "value": "maxBachhuber",
              "label": "Max Bachhuber"
            }
          ],
          "json": "",
          "url": "",
          "resource": "",
          "custom": ""
        },
        "dataSrc": "values",
        "valueProperty": "",
        "defaultValue": "",
        "refreshOn": "",
        "filter": "",
        "authenticate": false,
        "template": "<span>{{ item.label }}</span>",
        "multiple": false,
        "protected": false,
        "unique": false,
        "persistent": true,
        "hidden": false,
        "clearOnHide": true,
        "validate": {
          "required": false
        },
        "type": "select",
        "labelPosition": "top",
        "tags": [],
        "conditional": {
          "show": "",
          "when": null,
          "eq": ""
        },
        "properties": {},
        "lockKey": true
      },
      {
        "autofocus": false,
        "input": true,
        "tableView": true,
        "label": "Arbeitsstätte",
        "key": "arbeitssttte",
        "placeholder": "",
        "data": {
          "values": [
            {
              "value": "klassenzimmer1",
              "label": "Klassenzimmer 1"
            },
            {
              "value": "klassenzimmer2",
              "label": "Klassenzimmer 2"
            }
          ],
          "json": "",
          "url": "",
          "resource": "",
          "custom": ""
        },
        "dataSrc": "values",
        "valueProperty": "",
        "defaultValue": "",
        "refreshOn": "",
        "filter": "",
        "authenticate": false,
        "template": "<span>{{ item.label }}</span>",
        "multiple": false,
        "protected": false,
        "unique": false,
        "persistent": true,
        "hidden": false,
        "clearOnHide": true,
        "validate": {
          "required": false
        },
        "type": "select",
        "labelPosition": "top",
        "tags": [],
        "conditional": {
          "show": "",
          "when": null,
          "eq": ""
        },
        "properties": {}
      },
      {
        "autofocus": false,
        "input": true,
        "tableView": true,
        "label": "Bericht",
        "key": "reporttext",
        "placeholder": "",
        "prefix": "",
        "suffix": "",
        "rows": 15,
        "multiple": false,
        "defaultValue": "",
        "protected": false,
        "persistent": true,
        "hidden": false,
        "wysiwyg": false,
        "clearOnHide": true,
        "spellcheck": true,
        "validate": {
          "required": false,
          "minLength": "",
          "maxLength": "",
          "pattern": "",
          "custom": ""
        },
        "type": "textarea",
        "labelPosition": "top",
        "inputFormat": "plain",
        "tags": [],
        "conditional": {
          "show": "",
          "when": null,
          "eq": ""
        },
        "properties": {},
        "lockKey": true
      },
      {
        "input": true,
        "tableView": true,
        "label": "Signature",
        "key": "signature",
        "placeholder": "",
        "footer": "Unterschrift",
        "width": "100%",
        "height": "150px",
        "penColor": "black",
        "backgroundColor": "rgb(245,245,235)",
        "minWidth": "0.5",
        "maxWidth": "2.5",
        "protected": false,
        "persistent": true,
        "hidden": false,
        "clearOnHide": true,
        "validate": {
          "required": false
        },
        "type": "signature",
        "hideLabel": true,
        "tags": [],
        "conditional": {
          "show": "",
          "when": null,
          "eq": ""
        },
        "properties": {}
      },
      {
        "autofocus": false,
        "input": true,
        "label": "Submit",
        "tableView": false,
        "key": "submit",
        "size": "md",
        "leftIcon": "",
        "rightIcon": "",
        "block": false,
        "action": "submit",
        "disableOnInvalid": false,
        "theme": "primary",
        "type": "button"
      }
    ],
    "display": "form",
    "submissionAccess": [
      {
        "roles": [],
        "type": "create_all"
      },
      {
        "roles": [],
        "type": "read_all"
      },
      {
        "roles": [],
        "type": "update_all"
      },
      {
        "roles": [],
        "type": "delete_all"
      },
      {
        "roles": [
          "5fa5136e6b3dd341bdce334f"
        ],
        "type": "create_own"
      },
      {
        "roles": [
          "5fa5136e6b3dd341bdce334f"
        ],
        "type": "read_own"
      },
      {
        "roles": [],
        "type": "update_own"
      },
      {
        "roles": [],
        "type": "delete_own"
      }
    ],
    "title": "Regiebericht",
    "name": "regiebericht",
    "path": "regiebericht",
    "access": [
      {
        "roles": [
          "5fa5136e6b3dd3c159ce334e",
          "5fa5136e6b3dd341bdce334f",
          "5fa5136f6b3dd3ae58ce3350"
        ],
        "type": "read_all"
      }
    ],
    "created": "2020-11-06T09:16:52.769Z",
    "modified": "2020-11-06T09:40:07.290Z",
    "machineName": "regiebericht"
  };

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit(submission) {
    console.log(submission);
  }

}
