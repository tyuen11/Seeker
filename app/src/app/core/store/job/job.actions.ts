import { Injectable } from '@angular/core';
import { createAction, props } from '@ngrx/store';
import { Job } from 'src/app/interfaces';

@Injectable()
export class ActionTypes {
    static ADD_JOB = '[JOB] ADD JOB'
    static ADD_JOB_SUCCESS = '[JOB] ADD JOB SUCCESS'
    static ADD_JOB_FAIL = '[JOB] ADD JOB FAIL'
    static GET_JOBS = '[JOB] GET JOBS'
    static GET_JOBS_SUCCESS = '[JOB] GET JOBS SUCCESS'


}

export const addJob = createAction(
    ActionTypes.ADD_JOB,
    props<{job: Job}>()
)

export const getJobs = createAction(
    ActionTypes.GET_JOBS,
    props<{uid: number}>()
)

export const getJobsSuccess = createAction(
    ActionTypes.GET_JOBS_SUCCESS,
    props<{jobs: any}>()
)

export const addJobSuccess = createAction(
    ActionTypes.ADD_JOB_SUCCESS,
)