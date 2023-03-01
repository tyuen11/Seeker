import { Injectable } from '@angular/core';
import { Action, createAction } from '@ngrx/store';

@Injectable()
export class ActionTypes {
    static GET_CONTAINERS = '[USER] GET CONTAINERS'
}

export const getContainers = createAction(
    ActionTypes.GET_CONTAINERS,
)
