import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { catchError, map, mergeMap, of, switchMap } from "rxjs";
import { JobService } from "../services/job.service";
import { addJob, getJobs, getJobsSuccess, addJobSuccess } from "../store/job";
import { SeekerState } from "../store/reducers";
import { selectUserId } from "../store/user";

@Injectable()
export class JobEffects {
    constructor(
        public actions$: Actions,
        public store: Store<SeekerState>,
        private jobService: JobService,
    ) { }

    addJob$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(addJob),
            mergeMap(action => {
                return this.jobService.addJob(action.job).pipe(
                    map(() => {
                        return getJobs({uid: action.job.uid})
                    })
                )
            })
        )
});

getJobs$ = createEffect(() => {
    return this.actions$.pipe(
        ofType(getJobs),
        mergeMap(action => {
            return this.jobService.getJobs(action.uid).pipe(
                map(res => {
                    return getJobsSuccess({ jobs: res })
                }
                )
            )
        })
    )
})
}