import { Component, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import {MatDialog} from '@angular/material/dialog';

import { Job } from '../../interfaces';
import { AddJobModalComponent } from '../modals/add-job-modal/add-job-modal.component';



@Component({
  selector: 'status-container',
  templateUrl: './status-container.component.html',
  styleUrls: ['./status-container.component.css', '../../app.component.css']
})

export class StatusContainerComponent {
  @Input() name!: string;
  @Input() currentUser!: number

  public jobs: Job[];

  constructor(public dialog: MatDialog){
    this.jobs = [
      {
        company: 'Facebook',
        position: 'DevOps',
        url: 'https://facebook.com',
        dateApplied: 1,
        status: "Applied",
        uid: 1,
      },
      {
        company: 'Google',
        position: 'SWE',
        url: 'https://google.com',
        dateApplied: 1,
        status: "Applied",
        uid: 1,

      },
      {
        company: 'Twitter',
        position: 'SASD',
        url: 'https://twitter.com',
        dateApplied: 1,
        status: "Applied",
        uid: 1,
      },
    ];

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
      data: {status: this.name, currentUser: this.currentUser},
    });

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed', result);
    // });
  }
}
