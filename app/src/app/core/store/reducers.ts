import { Observable } from 'rxjs';
import { ActionReducerMap, Store } from '@ngrx/store';

import { User, userReducer } from './user';



export interface SeekerState {
    user: User;
}

export let SeekerReducers: ActionReducerMap<SeekerState> = {
    user: userReducer
}