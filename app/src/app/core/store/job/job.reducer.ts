import { createReducer, on } from '@ngrx/store';
import { Job } from 'src/app/interfaces';
import { addJob, addJobSuccess, getJobs, getJobsSuccess, removeJobSuccess } from './job.actions';


const initialState: Job[] = [];

export const jobReducer = createReducer(
    initialState,
    on(addJobSuccess, (state) => (state)),
    on(getJobsSuccess, (state, { jobs }) => (jobs)),
    on(removeJobSuccess, (state) => ({...state}))
);