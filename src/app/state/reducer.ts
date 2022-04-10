import { createReducer } from '@reduxjs/toolkit';

import { storeLensToken } from './actions';

const initialState = {
    lensTokens: {
        accessToken: '',
        refreshToken: '',
    },
};

const globalReducer = createReducer(initialState, (builder) => {
    builder.addCase(storeLensToken, (state, action) => {
        state.lensTokens = action.payload;
    });
});

export default globalReducer;
