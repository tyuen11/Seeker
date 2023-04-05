import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';

import { Job } from '../../interfaces';
import { AddJobModalComponent } from '../modals/add-job-modal/add-job-modal.component';
import { getJobs } from 'src/app/core/store/job';



@Component({
  selector: 'status-container',
  templateUrl: './status-container.component.html',
  styleUrls: ['./status-container.component.css', '../../app.component.css']
})

export class StatusContainerComponent implements OnChanges {
  @Input() name!: string;
  @Input() currentUser!: number
  @Input() jobs!: Job[]


  constructor(public dialog: MatDialog) {

  }

  ngOnChanges(): void {
    this.jobs = this.jobs?.filter(j => j.status === this.name);
  }

  drop(event: CdkDragDrop<Job[]>) {
    console.log(event.previousContainer.id, event.container.id);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log('transfer', this.jobs)
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(AddJobModalComponent, {
      data: { status: this.name, currentUser: this.currentUser },
    });

    console.log(this.jobs)

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
}
