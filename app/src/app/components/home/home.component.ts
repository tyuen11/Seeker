import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { getJobs } from 'src/app/core/store/job';

import { SeekerState } from 'src/app/core/store/reducers';
import { selectUserContainers, getUser, selectUserId } from 'src/app/core/store/user';
import { Job } from 'src/app/interfaces';

import { selectJobs } from 'src/app/core/store/job/job.selectors';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../app.component.css']
})

export class HomeComponent implements OnInit {
  public sectionObs$!: Observable<string[]>;
  public uidObs$!: Observable<number>;
  public jobsObs$!: Observable<Job[]>;
  public sections!: string[];
  public currentUser!: number;
  public jobs!: Job[];

  constructor(private store: Store<SeekerState>) { }

  ngOnInit() {
    this.store.dispatch(getUser({ id: 29 }));
    this.store.dispatch(getJobs({ uid: 29}));

    this.sectionObs$ = this.store.select(selectUserContainers);
    this.sectionObs$.subscribe(currentSections => {
      this.sections = currentSections;
    })

    this.uidObs$ = this.store.select(selectUserId);
    this.uidObs$.subscribe(currentUser => {
      // console.log('observing', currentUser);
      this.currentUser = currentUser;
    })

    this.jobsObs$ = this.store.select(selectJobs);
    this.jobsObs$.subscribe(jobs => {
        // console.log('observing jobs', jobs);
        this.jobs = jobs
      });

  }


}
