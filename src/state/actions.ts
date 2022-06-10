import { createAction } from '@reduxjs/toolkit';
import { AuthTokens, UserProfile } from '../types';

const storeLensToken = createAction<AuthTokens>('STORE_LENS_TOKENS');
const storeUserProfile = createAction<UserProfile>('STORE_USER_PROFILE');
const storeUserProfileURI = createAction<string>('STORE_USER_PROFILE_URI');
const storeUserFollowURI = createAction<string>('STORE_USER_FOLLOW_URI');
const setWalletModalOpen = createAction<boolean>('SET_WALLET_MODAL_OPEN');

export {
    storeLensToken,
    storeUserProfile,
    storeUserProfileURI,
    storeUserFollowURI,
    setWalletModalOpen,
};
