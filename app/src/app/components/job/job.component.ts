import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

// import { JobModalComponent } from '../modals/jobModal/job-modal/job-modal.component';
import { Job } from '../../interfaces';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})

export class JobComponent {
  @Input() job!: Job;

  constructor(private router: Router, private jobModal: MatDialog) { }

  goToUrl() {
    // let route: string[] = ['/' + this.job.url];
    console.log(this.job.url);
    // this.router.navigate(route);
    document.location.href = this.job.url;
  }

  // openDialog(): void {
  //   const dialogRef = this.jobModal.open(JobModalComponent, {
  //     data: {name: this.name, animal: this.animal},
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //   });
}
