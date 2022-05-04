import { createSelector } from 'reselect';
import { TReducerState } from '../../types';

const globalState = (state: TReducerState) => state.globalReducer;

export const getImageURIs = createSelector(globalState, state => state.userProfilePhotoURI);

export const getWalletModalState = createSelector(globalState, state => state.walletModal.isOpen);

export const getUserProfile = createSelector(globalState, state => state.userProfile);
