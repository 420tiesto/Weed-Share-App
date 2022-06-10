import { createSelector } from 'reselect';
import { TReducerState } from '../../../types';

const projectState = (state: TReducerState) => state.projectReducer;

export const getMusicDetails = createSelector(projectState, (state) => state.budDetails);

export const getTracks = createSelector(projectState, (state) => state.tracks);
