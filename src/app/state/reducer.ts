import { createReducer } from '@reduxjs/toolkit';

import { storeLensToken, storeUserProfile } from './actions';

const initialState = {
    lensTokens: {
        accessToken: '',
        refreshToken: '',
    },
    userProfile: {
        provider: '',
        userData: {},
    },
};

const globalReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(storeLensToken, (state, action) => {
            state.lensTokens = action.payload;
        })
        .addCase(storeUserProfile, (state, action) => {
            state.userProfile.provider = action?.payload?.provider || '';
            state.userProfile.userData = { ...(action?.payload?.data || {}) };
        });
});

export default globalReducer;
