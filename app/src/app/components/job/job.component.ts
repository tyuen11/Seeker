import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AddJobModalComponent } from '../modals/add-job-modal/add-job-modal.component';
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

  constructor(private router: Router, private jobModal: MatDialog, private store: Store<SeekerState>) { }


  ngOnInit(): void {
    
  }
  
  goToUrl() {
    window.location.href = 'https://' + this.job?.url; //Todo: Need to add https to the actual db
  }

  removeJob(): void {
    console.log(this.job?.id);
    if (this.job?.id !== undefined) this.store.dispatch(removeJob({id: this.job?.id}));
  }

  openDialog(): void {
    const dialogRef = this.jobModal.open(AddJobModalComponent, {
      data: {},
    });

  }
}
