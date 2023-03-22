import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SeekerState } from 'src/app/core/store/reducers';
import { selectUserContainers, getUser, selectUserId } from 'src/app/core/store/user';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../app.component.css']
})

export class HomeComponent implements OnInit {
  public sectionObs$!: Observable<string[]>;
  public uidObs$!: Observable<number>;
  public sections!: string[];
  public currentUser!: number;

  constructor(private store: Store<SeekerState>) { }

  ngOnInit() {
    this.store.dispatch(getUser({ id: 29 }));

    this.sectionObs$ = this.store.select(selectUserContainers);
    this.sectionObs$.subscribe(currentSections => {
      this.sections = currentSections;
    })

    this.uidObs$ = this.store.select(selectUserId);
    this.uidObs$.subscribe(currentUser => {
      this.currentUser = currentUser;
    })

  }

}
