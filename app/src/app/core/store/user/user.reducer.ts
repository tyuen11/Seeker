import { createReducer, on } from '@ngrx/store';
import { User } from 'src/app/interfaces';
import { getUserSuccess } from './user.actions';


const initialState: User = {
    id: -1,
    containers: [],
    name: "",
    email: ""
};

export const userReducer = createReducer(
    initialState,
    on(getUserSuccess, (state, { user }) => (user)),
);