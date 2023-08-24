import { Component, Input, OnChanges } from '@angular/core';
import { CdkDragDrop, CdkDragStart, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';

import { Job } from '../../interfaces';
import { AddJobModalComponent } from '../modals/add-job-modal/add-job-modal.component';
import { updateJob } from 'src/app/core/store/job';

import * as moment from 'moment';
import { SeekerState } from 'src/app/core/store/reducers';
import { Lexorank } from 'src/app/utils/lexorank/lexorank';



@Component({
  selector: 'status-container',
  templateUrl: './status-container.component.html',
  styleUrls: ['./status-container.component.css', '../../app.component.css']
})

export class StatusContainerComponent implements OnChanges {
  @Input() name!: string;
  @Input() currentUser!: number;
  @Input() jobs!: Job[];
  public dragging!: boolean;
  private job: Job | undefined;
  public smallestRank!: string;


  constructor(public dialog: MatDialog, private store: Store<SeekerState>) {
  }

  ngOnChanges(): void {
    this.jobs = this.jobs?.filter(j => j.status === this.name);
    this.sortByRank();
  }

  public sortByRank(): void {
    this.jobs.sort((a: Job, b: Job) => {
      if (a.lexorank > b.lexorank)
        return 1;
      if (a.lexorank < b.lexorank)
        return -1;
      return 0;
    });

  }

  public handleDragStart(event: CdkDragStart): void {
    console.log(event);
    this.dragging = true;
  }

  public jobClick(event: MouseEvent, job: Job): void {
    console.log(event);
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

    const rank = new Lexorank();


    const movedJob: Job = { ...event.container.data[event.currentIndex] };
    movedJob.dateModified = moment.tz(moment.tz.guess()).format('YYYY-MM-DDTHH:mm:ss');
    movedJob.status = event.container.id;
    movedJob.uid = this.currentUser; // Needed to set the job's uid since this Job obj is direct copy from db which has no uid attr.

    const prev: string  = event.container.data[event.currentIndex-1]?.lexorank || '';
    const next: string  = event.container.data[event.currentIndex+1]?.lexorank || '';
    console.log(event);
    const r: (string | boolean)[] = rank.insert(prev, next);
    movedJob.lexorank = "" + r[0];
    
    this.store.dispatch(updateJob({ job: movedJob }));


  }


  public determineJobRank(event: CdkDragDrop<Job[]>): Job {
    const rank = new Lexorank();


    const movedJob: Job = { ...event.container.data[event.currentIndex] };
    movedJob.dateModified = moment.tz(moment.tz.guess()).format('YYYY-MM-DDTHH:mm:ss');
    movedJob.status = event.container.id;
    movedJob.uid = this.currentUser; // Needed to set the job's uid since this Job obj is direct copy from db which has no uid attr.

    const prev: string  = event.container.data[event.currentIndex-1]?.lexorank || '';
    const next: string  = event.container.data[event.currentIndex+1]?.lexorank || '';
    console.log(prev, next);
    const r: (string | boolean)[] = rank.insert(prev, next);
    console.log(rank.insert('0', 'z'));
    console.log(r);
    movedJob.lexorank = "" + r[0];

    console.log(prev, next, r);
    return movedJob;

  }

  public openDialog(): void {
    console.log(this.smallestRank);
    console.log(this.jobs);
    const dialogRef = this.dialog.open(AddJobModalComponent, {
      data: { status: this.name, currentUser: this.currentUser, job: this.job, smallestRank: this.jobs[0]?.lexorank },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      this.job = undefined;
    });
  }

}
