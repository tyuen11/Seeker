import { Component, Input } from '@angular/core';

import { Job } from '../../interfaces';

@Component({
  selector: 'job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})

export class JobComponent {
  @Input() job!: Job;
}
