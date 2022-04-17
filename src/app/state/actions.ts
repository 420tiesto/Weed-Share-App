import { createAction } from '@reduxjs/toolkit';
import { type UserProfile, type AuthTokens } from '../../types';

const storeLensToken = createAction<AuthTokens>('STORE_LENS_TOKENS');
const storeUserProfile = createAction<UserProfile>('STORE_USER_PROFILE');

export { storeLensToken, storeUserProfile };