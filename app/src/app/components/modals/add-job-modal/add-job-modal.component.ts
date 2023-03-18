import { Component, Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TextfieldComponent } from '../../common/textfield/textfield.component';

@Component({
  selector: 'app-add-job-modal',
  templateUrl: './add-job-modal.component.html',
  styleUrls: ['./add-job-modal.component.css', '../../../app.component.css']
})
export class AddJobModalComponent {

  constructor(
    public dialogRef: MatDialogRef<AddJobModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
