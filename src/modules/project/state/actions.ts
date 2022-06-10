import { createAction } from '@reduxjs/toolkit';
import { type MusicDetails, type TrackDetails } from '../types';

const storeMusicDetails = createAction<MusicDetails>('STORE_ALBUM_DETAILS');
const addTrackDetails = createAction<TrackDetails>('ADD_TRACK_DETAILS');
const deleteTrackDetails = createAction<TrackDetails>('DELETE_TRACK_DETAILS');
const updateTrackDetails = createAction<TrackDetails>('UPDATE_TRACK_DETAILS');
const resetAllDetails = createAction('RESET_ALL_DETAILS');

export {
    storeMusicDetails,
    addTrackDetails,
    deleteTrackDetails,
    updateTrackDetails,
    resetAllDetails,
};
