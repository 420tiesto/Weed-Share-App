import { createSelector } from 'reselect';
import { TReducerState } from '../../../types';

const projectState = (state: TReducerState) => state.projectReducer;

export const getAlbumDetails = createSelector(projectState, (state) => state.albumDetails);

export const getTracks = createSelector(projectState, (state) => state.tracks);
