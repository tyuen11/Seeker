import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AddJobModalComponent } from '../modals/add-job-modal/add-job-modal.component';
import { ConfirmationModalComponent } from '../modals/confirmation-modal/confirmation-modal.component';
import { Job } from '../../interfaces';
import { MatDialog } from '@angular/material/dialog';
import { removeJob } from 'src/app/core/store/job';
import { SeekerState } from 'src/app/core/store/reducers';

@Component({
  selector: 'job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})

export class JobComponent implements OnInit {
  @Input() job!: Job;
  @Input() dragging!: boolean;

  constructor(
    private router: Router,
    private jobModal: MatDialog,
    private store: Store<SeekerState>,
    private deleteModal: MatDialog
  ) { }


  ngOnInit(): void {
    console.log(this.dragging);
  }
  
  goToUrl($event: MouseEvent) {
    $event.stopPropagation();
    if (!!this.job.url)
      window.location.href = this.job?.url;
  }

  removeJob(id: number): void {
    if (this.job?.id !== undefined)
      this.store.dispatch(removeJob({ id: this.job?.id }));
  }

  openDialog(): void {
    const dialogRef = this.jobModal.open(AddJobModalComponent, {
      data: {},
    });

  }

  openDeleteConfimationDialog($event: MouseEvent): void {
    $event.stopPropagation();
    const dialogRef = this.deleteModal.open(ConfirmationModalComponent, {
      data: {event: this.removeJob.bind(this)}
    });
  }
}
