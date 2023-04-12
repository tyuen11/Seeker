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
    static REMOVE_JOB = '[JOB] REMOVE JOB'
    static REMOVE_JOB_SUCCESS = '[JOB] REMOVE JOB SUCCESS'
    static UPDATE_JOB = '[JOB] UPDATE JOB'
    static UPDATE_JOB_SUCCESS = '[JOB] UPDATE JOB SUCCESS'


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
    props<{jobs: Job[]}>()
)

export const addJobSuccess = createAction(
    ActionTypes.ADD_JOB_SUCCESS,
)

export const removeJob = createAction(
    ActionTypes.REMOVE_JOB,
    props<{id: number}>()
)

export const removeJobSuccess = createAction(
    ActionTypes.REMOVE_JOB_SUCCESS
)

export const updateJob = createAction(
    ActionTypes.UPDATE_JOB,
    props<{job: Job}>()
)

export const updateJobSuccess = createAction(
    ActionTypes.UPDATE_JOB_SUCCESS,
)