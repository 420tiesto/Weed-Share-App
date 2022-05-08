import { createReducer } from '@reduxjs/toolkit';

import { storeAlbumDetails } from './actions';

export const initialState = {
    albumDetails: {},
    tracks: [],
};

const projectReducer = createReducer(initialState, (builder) => {
    builder.addCase(storeAlbumDetails, (state, action) => {
        state.albumDetails = { ...action.payload || {} };
    })
});

export default projectReducer;