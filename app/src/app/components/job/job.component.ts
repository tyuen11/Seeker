import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Job } from '../../interfaces';

@Component({
  selector: 'job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})

export class JobComponent {
  @Input() job!: Job;

  constructor(private router: Router) { }

  goToUrl() {
    // let route: string[] = ['/' + this.job.url];
    console.log(this.job.url);
    // this.router.navigate(route);
    document.location.href = this.job.url;
  }
}
