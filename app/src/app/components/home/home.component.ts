import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SeekerState } from 'src/app/core/store/reducers';
import { selectUserContainers, selectUser, User, getContainers, } from 'src/app/core/store/user';

@Component({
  selector: 'home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css', '../../app.component.css']
})

export class HomeComponent implements OnInit {
  public sectionObs$!: Observable<string[]>;
  public sections!: string[];
  
  constructor(private store: Store<SeekerState>) { }

  ngOnInit() {
    this.store.select(selectUserContainers)
    this.sectionObs$ = this.store.select(selectUserContainers);
      this.sectionObs$.subscribe(currentSections => {
        this.sections = currentSections;
      })

  }

}
