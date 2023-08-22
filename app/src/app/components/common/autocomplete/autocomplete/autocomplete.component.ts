
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NgFor, AsyncPipe, NgStyle, NgIf } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.css'],
  // imports: [
  //   FormsModule,
  //   MatFormFieldModule,
  //   MatInputModule,
  //   MatAutocompleteModule,
  //   ReactiveFormsModule,
  //   NgFor,
  //   AsyncPipe,
  //   NgStyle,
  //   NgIf
  // ],
})
export class AutocompleteComponent implements OnInit {
  @Input() text!: string;
  @Input() control!: FormControl;
  @Input() errorMessage!: string;
  @Input() f!: any;
  @Input() options!: any[];
  @Input() width!: string;

  @Output() setSelectedCompany: EventEmitter<any> = new EventEmitter<any>();

  required: boolean = false;

  constructor(public http: HttpClient) {
    this.http = http;
  }

  ngOnInit(): void {
    const validator = this.control.validator ? this.control.validator({} as AbstractControl) : null;
    this.required = !!validator && validator['required'];

  }

  onSelectOption(option: any): void {
    this.setSelectedCompany.emit(option);
  }


  getErrorMessage(): string {
    return this.control.hasError('required') ? this.errorMessage : '';
  }

}
