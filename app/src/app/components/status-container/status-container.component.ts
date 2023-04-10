import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { CdkDragDrop, CdkDragStart, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
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
  public dragging!: boolean;
  private job: Job | undefined;


  constructor(public dialog: MatDialog) {

  }

  ngOnChanges(): void {
    this.jobs = this.jobs?.filter(j => j.status === this.name);
  }

  public handleDragStart(event: CdkDragStart): void {
    this.dragging = true;
  }

  public jobClick(event: MouseEvent, job: Job): void {
    if (this.dragging) {
      this.dragging = false;
      return
    }
    this.job = job;
    this.openDialog();
  }

  drop(event: CdkDragDrop<Job[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
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
      data: { status: this.name, currentUser: this.currentUser, job: this.job},
    });

    console.log(this.jobs)

    dialogRef.afterClosed().subscribe(result => {
      this.job = undefined;
    });
  }
}
