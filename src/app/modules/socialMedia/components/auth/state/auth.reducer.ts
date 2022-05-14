import { createReducer } from '@reduxjs/toolkit';
import { createSelectorHook } from 'react-redux';
import { createSelector, createSelectorCreator } from 'reselect';
import { initialState as globalInitialState } from '../../../../../state/reducer';

import { setUserAdress, setUserAuthenticated, setUserProfile } from './auth.action';

export interface initialState {
    userProfile: any;
    currentuserAdress: string;
    isAuthenticated: boolean;
}

const intitialState: initialState = {
    userProfile: {},
    currentuserAdress: '',
    isAuthenticated: false,
};

export type TReducerState = {
    globalReducer: typeof globalInitialState;
    authReducer: initialState;
};

const userProfileState = (state: TReducerState) => state.authReducer;

export const getUserProfile = createSelector(userProfileState, (state) => state.userProfile);
export const getCurrentUserAdress = createSelector(
    userProfileState,
    (state) => state.currentuserAdress
);
export const getUserAuthenticated = createSelector(
    userProfileState,
    (state) => state.isAuthenticated
);

export const authReducer = createReducer(intitialState, (builder) => {
    builder.addCase(setUserProfile, (state, action) => {
        state.userProfile = action.payload;
    }),
        builder.addCase(setUserAdress, (state, action) => {
            state.currentuserAdress = action.payload;
        }),
        builder.addCase(setUserAuthenticated, (state, action) => {
            state.isAuthenticated = action.payload;
        });
});
