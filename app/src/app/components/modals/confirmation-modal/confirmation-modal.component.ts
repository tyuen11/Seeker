import { Component, Input, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.css']
})

export class ConfirmationModalComponent {
  private event!: Function;

  constructor(
    public dialogRef: MatDialogRef<ConfirmationModalComponent>, 
    @Inject(MAT_DIALOG_DATA) 
    public data: {event: Function}
    ) {
      this.event = data.event;
    }

  onNoClick(): void {
    this.dialogRef.close();
  }
  
  onSubmit(): void {
    this.event();
    this.dialogRef.close();
  }

}
