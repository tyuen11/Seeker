import { Observable } from 'rxjs';
import { ActionReducerMap, Store } from '@ngrx/store';

import { userReducer } from './user';
import { jobReducer } from './job';
import { Job, User } from 'src/app/interfaces';



export interface SeekerState {
    user: User;
    jobs: Job[];
}

export let SeekerReducers: ActionReducerMap<SeekerState> = {
    user: userReducer,
    jobs: jobReducer,
}