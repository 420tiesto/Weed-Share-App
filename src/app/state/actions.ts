import { createAction } from '@reduxjs/toolkit';
import { type UserProfile, type AuthTokens } from '../../types';

const storeLensToken = createAction<AuthTokens>('STORE_LENS_TOKENS');
const storeUserProfile = createAction<UserProfile>('STORE_USER_PROFILE');
const storeUserProfileURI = createAction<string>('STORE_USER_PROFILE_URI');
const storeFollowURI = createAction<string>('STORE_FOLLOW_URI');

export { storeLensToken, storeUserProfile, storeUserProfileURI, storeFollowURI };