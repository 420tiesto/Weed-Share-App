import { createSelector } from 'reselect';
import { TReducerState } from '../../types';

const globalState = (state: TReducerState) => state.globalReducer;

export const getImageURIs = createSelector(globalState, state => state.userProfilePhotoURI);
