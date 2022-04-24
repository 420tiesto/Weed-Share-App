import { createReducer } from '@reduxjs/toolkit';

import { storeLensToken, storeUserProfile, storeUserFollowURI, storeUserProfileURI } from './actions';

export const initialState = {
    lensTokens: {
        accessToken: '',
        refreshToken: '',
    },
    userProfile: {
        provider: '',
        userData: {},
    },
    userProfilePhotoURI: {
        profileURI: '',
        followURI: '',
    }
};

const globalReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(storeLensToken, (state, action) => {
            state.lensTokens = action.payload;
        })
        .addCase(storeUserProfile, (state, action) => {
            state.userProfile.provider = action?.payload?.provider || '';
            state.userProfile.userData = { ...(action?.payload?.data || {}) };
        })
        .addCase(storeUserFollowURI, (state, action) => {
            state.userProfilePhotoURI.followURI = action?.payload || '';
        })
        .addCase(storeUserProfileURI, (state, action) => {
            state.userProfilePhotoURI.profileURI = action?.payload || '';
        });
});

export default globalReducer;
