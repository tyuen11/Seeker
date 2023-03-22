import { Injectable } from "@angular/core";
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { catchError, map, of, switchMap } from "rxjs";
import { UserService } from "../services/user.service";
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
            switchMap(action => {
                return this.userService.getUser(action.id).pipe(
                    map(user => { 
                        console.log(user);
                        return getUserSuccess({ user: user }) 
                    }) 
                )
           } )
        )
    });
}