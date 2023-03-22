import { Store, createSelector } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SeekerState } from '../reducers';
import { User } from './user.reducer';

export const selectUser = (state: SeekerState) => state.user;
export const selectUserContainers = createSelector(selectUser, (user: User) => user.containers);
export const selectUserId = createSelector(selectUser, (user: User) => user.id);