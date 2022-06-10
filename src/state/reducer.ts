import { createReducer } from '@reduxjs/toolkit';

import {
    storeLensToken,
    storeUserProfile,
    storeUserFollowURI,
    storeUserProfileURI,
    setWalletModalOpen,
} from './actions';

export const initialState = {
    lensTokens: {
        accessToken: '',
        refreshToken: '',
    },
    userProfile: {
        username: '',
        email: '',
    },
    userProfilePhotoURI: {
        profileURI: '',
        followURI: '',
    },
    walletModal: {
        isOpen: false,
    },
};

const globalReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(storeLensToken, (state, action) => {
            state.lensTokens = action.payload;
        })
        .addCase(storeUserProfile, (state, action) => {
            state.userProfile.username = action?.payload?.username || '';
            state.userProfile.email = action?.payload?.email;
        })
        .addCase(storeUserFollowURI, (state, action) => {
            state.userProfilePhotoURI.followURI = action?.payload || '';
        })
        .addCase(storeUserProfileURI, (state, action) => {
            state.userProfilePhotoURI.profileURI = action?.payload || '';
        })
        .addCase(setWalletModalOpen, (state, action) => {
            state.walletModal.isOpen = action?.payload || false;
        });
});

export default globalReducer;
