import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AddJobModalComponent } from '../modals/add-job-modal/add-job-modal.component';
import { Job } from '../../interfaces';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})

export class JobComponent implements OnInit {
  @Input() job!: Job;

  constructor(private router: Router, private jobModal: MatDialog) { }


  ngOnInit(): void {
    
  }
  
  goToUrl() {
    window.location.href = 'https://' + this.job.url; //Todo: Need to add https to the actual db
  }

  openDialog(): void {
    const dialogRef = this.jobModal.open(AddJobModalComponent, {
      data: {},
    });

  }
}
