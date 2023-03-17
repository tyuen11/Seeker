import { Injectable } from '@angular/core';
import { Action, createAction, props } from '@ngrx/store';
import { User } from './user.reducer';

@Injectable()
export class ActionTypes {
    static GET_CONTAINERS = '[USER] GET CONTAINERS'
    static GET_USER = '[USER] GET USER'
    static GET_USER_SUCCESS = '[USER] GET USER SUCCESS'
}

export const getContainers = createAction(
    ActionTypes.GET_CONTAINERS,
)

export const getUser = createAction(
    ActionTypes.GET_USER,
    props<{ id: Number }>()
);

export const getUserSuccess = createAction(
    ActionTypes.GET_USER_SUCCESS,
    props<{ user: User }>()
);
