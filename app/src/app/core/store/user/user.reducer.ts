import { createReducer, on } from '@ngrx/store';
import { getContainers, getUserSuccess } from './user.actions';

export interface User {
    containers: string[];
    name: string;
    email: string;
}

const initialState: User = {
    containers: [],
    name: "",
    email: ""
};

export const userReducer = createReducer(
    initialState,
    on(getContainers, (state) => ({ ...state })),
    on(getUserSuccess, (state, { user }) => ({ ...user })),
);