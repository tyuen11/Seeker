import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { catchError, map, mergeMap, } from "rxjs";
import { UserService } from "../services/user.service";
import { getJobs } from "../store/job";
import { SeekerState } from "../store/reducers";
import { getUser, getUserSuccess } from "../store/user";

@Injectable()
export class UserEffects {
    constructor(
        public actions$: Actions,
        public store: Store<SeekerState>,
        private userService: UserService,
    ) { }

    getUser$ = createEffect(() => {
        return this.actions$.pipe(
            ofType(getUser),
            mergeMap(action => {
                return this.userService.getUser(action.id).pipe(
                    map(user => { 
                        return getUserSuccess({user: user}) 
                    }) 
                )
            })
        );
    });
}