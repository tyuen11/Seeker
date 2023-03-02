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
        position: 'DevOps',
        url: 'https://facebook.com'
      },
      {
        company: 'Google',
        position: 'SWE',
        url: 'https://google.com'

      },
      {
        company: 'Twitter',
        position: 'SASD',
        url: 'https://twitter.com'
      },
    ];

  }

  drop(event: CdkDragDrop<Job[]>) {
    console.log(event.previousContainer.id, event.container.id);
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      console.log('transfer', this.jobs)
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

}
