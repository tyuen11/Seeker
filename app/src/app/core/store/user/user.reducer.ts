import { createReducer, on } from '@ngrx/store';
import { getUserSuccess } from './user.actions';

export interface User {
    id: number;
    containers: string[];
    name: string;
    email: string;
}

const initialState: User = {
    id: -1,
    containers: [],
    name: "",
    email: ""
};

export const userReducer = createReducer(
    initialState,
    on(getUserSuccess, (state, { user }) => ({ ...user })),
);