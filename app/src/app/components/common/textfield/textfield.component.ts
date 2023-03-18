import { Component, Input } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'textfield',
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.css']
})
export class TextfieldComponent {
  @Input() text!: string;
  @Input() errorMessage!: string;
  @Input() name!: string;

  constructor() { } 


  field = new FormControl('', [Validators.required]);

  getErrorMessage() {
    return this.field.hasError('required') ? this.errorMessage : '';
  }

}
