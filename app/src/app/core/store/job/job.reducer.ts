import { createReducer, on } from '@ngrx/store';
import { Job } from 'src/app/interfaces';
import { addJob, getJobs, getJobSuccess } from './job.actions';


const initialState: Job = {
    company: "",
    position: "",
    url: "",
    dateApplied:  Date.now(),
    status: "",
};

export const jobReducer = createReducer(
    initialState,
    // on(getJobs, (state, { jobs }) => ({...state, jobs})),
    on(getJobSuccess, (state, {payload}) => ({...state, payload})),
);