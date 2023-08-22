import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'textfield',
  templateUrl: './textfield.component.html',
  styleUrls: ['./textfield.component.css']
})
export class TextfieldComponent implements OnInit{
  @Input() text!: string;
  @Input() errorMessage!: string;
  @Input() name!: string;
  @Input() control!: FormControl
  @Input() width!: string;

  required: boolean = false;


  constructor() { }

  ngOnInit(): void {
    const validator = this.control.validator ? this.control.validator({} as AbstractControl) : null;
    this.required = !!validator && validator['required'];
  }

  getErrorMessage(): string {
    return this.control.hasError('required') ? this.errorMessage : '';
  }

}
