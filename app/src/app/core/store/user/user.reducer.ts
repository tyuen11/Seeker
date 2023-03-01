import { createReducer, on } from '@ngrx/store';
import { getContainers } from './user.actions';

export interface User {
    containers: string[];
    name: string;
}

const initialState: User = {
    containers: ["Applied", "Interview", "Rejected"],
    name: "User Name"
};

export const userReducer = createReducer(
    initialState,
    on(getContainers, (state) => ({ ...state }))
);