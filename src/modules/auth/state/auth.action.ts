import { createAction } from '@reduxjs/toolkit';

export const setUserProfile = createAction<any>('[Auth] Set current user');

export const setUserAdress = createAction<string>('[Auth] Set Current Profile');

export const setUserAuthenticated = createAction<boolean>('[Auth] Set user authication');

export const setUserHandle = createAction<string>('[Auth] Set User Handle');

export const setIsNewUser = createAction<boolean>('[Auth] Set is New User');
