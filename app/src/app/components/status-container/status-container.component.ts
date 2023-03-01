import { Component, Input } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

import { Job } from '../../interfaces';


@Component({
  selector: 'status-container',
  templateUrl: './status-container.component.html',
  styleUrls: ['./status-container.component.css', '../../app.component.css']
})

export class StatusContainerComponent {
  @Input() name!: String;

  public jobs: Job[];

  constructor(){
    this.jobs = [
      {
        company: 'Facebook',
        position: 'DevOps'
      },
      {
        company: 'Google',
        position: 'SWE'
      },
      {
        company: 'Twitter',
        position: 'SASD'
      },
    ];

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

}
