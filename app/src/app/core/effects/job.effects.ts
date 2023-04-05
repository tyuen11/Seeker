import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { select, Store } from "@ngrx/store";
import { catchError, map, merge, mergeMap, of, switchMap, withLatestFrom } from "rxjs";
import { JobService } from "../services/job.service";
import { addJob, getJobs, getJobsSuccess, addJobSuccess, removeJob, removeJobSuccess } from "../store/job";
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
            mergeMap((action) => {
                return this.jobService.getJobs(action.uid).pipe(
                    map(res => {
                        return getJobsSuccess({jobs: res.data})
                    })
                )
            })
        )
    })

    removeJob$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(removeJob),
            mergeMap(action => {
                return this.jobService.removeJob(action.id).pipe(
                    withLatestFrom(this.store.select(selectUserId)),
                    map(([res, uid]) => {
                        console.log(res, uid);
                        return getJobs({uid: uid})
                    })
                )
            })
        )
    })
}