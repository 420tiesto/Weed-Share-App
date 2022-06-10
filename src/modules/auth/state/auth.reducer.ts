import { createReducer } from '@reduxjs/toolkit';
import { createSelectorHook } from 'react-redux';
import { createSelector, createSelectorCreator } from 'reselect';
import { initialState as globalInitialState } from '../../../state/reducer';

import {
    setIsNewUser,
    setUserAdress,
    setUserAuthenticated,
    setUserHandle,
    setUserProfile,
} from './auth.action';

export interface initialState {
    userProfile: any;
    currentuserAdress: string;
    isAuthenticated: boolean;
    handle: string;
    isNewUser: boolean;
}

const intitialState: initialState = {
    userProfile: {},
    currentuserAdress: '',
    isAuthenticated: false,
    handle: '',
    isNewUser: false,
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
export const getIsNewUser = createSelector(userProfileState, (state) => state.isNewUser);

export const getUserHandle = createSelector(userProfileState, (state) => state.handle);

export const authReducer = createReducer(intitialState, (builder) => {
    builder.addCase(setUserProfile, (state, action) => {
        state.userProfile = action.payload;
    }),
        builder.addCase(setUserAdress, (state, action) => {
            state.currentuserAdress = action.payload;
        }),
        builder.addCase(setUserAuthenticated, (state, action) => {
            state.isAuthenticated = action.payload;
        }),
        builder.addCase(setUserHandle, (state, action) => {
            state.handle = action.payload;
        }),
        builder.addCase(setIsNewUser, (state, action) => {
            state.isNewUser = action.payload;
        });
});
