import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { catchError, map, mergeMap, of, switchMap } from "rxjs";
import { JobService } from "../services/job.service";
import { addJob, getJobSuccess } from "../store/job";
import { SeekerState } from "../store/reducers";

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
            switchMap(action => {
                console.log(action);
                return this.jobService.addJob(action.job).pipe(
                    map(res => {
                        console.log(res);
                        return getJobSuccess({payload: res})
                    })
                )
            })
        )
    });
}