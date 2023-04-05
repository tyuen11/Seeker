import { Store, createSelector } from '@ngrx/store';
import { Observable } from 'rxjs';
import { User } from 'src/app/interfaces';

import { SeekerState } from '../reducers';

export const selectUser = (state: SeekerState) => state.user;
export const selectUserContainers = createSelector(selectUser, (user: User) => user.containers);
export const selectUserId = createSelector(selectUser, (user: User) => user.id);