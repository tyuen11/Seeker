import { Component, Input, OnChanges } from '@angular/core';
import { CdkDragDrop, CdkDragStart, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { Job } from '../../interfaces';
import { AddJobModalComponent } from '../modals/add-job-modal/add-job-modal.component';
import { updateJob } from 'src/app/core/store/job';

import * as moment from 'moment';
import { SeekerState } from 'src/app/core/store/reducers';
import { compareAsc } from 'src/app/utils';
import { Lexorank } from 'src/app/utils/lexorank/lexorank';



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


  constructor(public dialog: MatDialog, private store: Store<SeekerState>) {

  }

  ngOnChanges(): void {
    this.jobs = this.jobs?.filter(j => j.status === this.name);
    this.sortByRank();
  }

  public sortByRank(): void {
    this.jobs.sort((a: any, b: any) => {
      if (a.lexorank > b.lexorank)
        return 1;
      if (a.lexorank < b.lexorank)
        return -1;
      return 0;
    });
    // console.log(this.jobs);

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

  public drop(event: CdkDragDrop<Job[]>) {
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

    let rank = new Lexorank();


    let movedJob: Job = { ...event.container.data[event.currentIndex] };
    movedJob.dateModified = moment.tz(moment.tz.guess()).format('YYYY-MM-DDTHH:mm:ss');
    movedJob.status = event.container.id;
    movedJob.uid = this.currentUser; // Needed to set the job's uid since this Job obj is direct copy from db which has no uid attr.

    let prev: string  = event.container.data[event.currentIndex-1]?.lexorank || '';
    let next: string  = event.container.data[event.currentIndex+1]?.lexorank || '';
    let r: (string | boolean)[] = rank.insert(prev, next);
    movedJob.lexorank = "" + r[0];
    console.log(prev, next, r);
    
    this.store.dispatch(updateJob({ job: movedJob }));


  }


  public openDialog(): void {
    const dialogRef = this.dialog.open(AddJobModalComponent, {
      data: { status: this.name, currentUser: this.currentUser, job: this.job },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.job = undefined;
    });
  }

  // public setRank(): void {
  //   if 
  // }
}
