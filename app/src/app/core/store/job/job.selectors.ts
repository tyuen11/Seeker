import { Store, createSelector } from '@ngrx/store';
import { Observable } from 'rxjs';

import { SeekerState } from '../reducers';
import { Job } from 'src/app/interfaces';

export const selectJobs = (state: SeekerState) => state.jobs;
export const selectAllJobs = createSelector(selectJobs, (jobs: Job[]) => jobs);
