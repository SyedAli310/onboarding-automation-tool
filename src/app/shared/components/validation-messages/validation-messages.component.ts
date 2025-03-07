import { NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'xhr-validation-messages',
    templateUrl: './validation-messages.component.html',
    standalone: true,
    imports: [NgFor, NgIf]
})
export class ValidationMessagesComponent implements OnInit {

    @Input() validationMessages: any;
    @Input() formController: FormControl;
    @Input() isFormSubmitted: boolean;
    @Input() textStyle: string = "text-danger";

    constructor() {
    }

  ngOnInit() {
  }
}
