import { createReducer } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

import {
    storeMusicDetails,
    addTrackDetails,
    deleteTrackDetails,
    updateTrackDetails,
    resetAllDetails,
} from './actions';
import { type TrackDetails, type MusicDetails } from '../types';

export const initialState: {
    budDetails: MusicDetails;
    tracks: TrackDetails[];
} = {
    budDetails: {
        artistName: '',
        releaseDate: new Date(),
        recordLabel: '',
        language: {
            name: '',
            id: 0,
            value: '',
        },
        primaryGenre: {
            name: '',
            id: 0,
            value: '',
        },
        secondaryGenre: '',
        budCover: '',
        budCoverType: '',
        budPrice: 0,
    },
    tracks: [
        {
            id: uuidv4(),
            songTitle: '',
            hasFeaturedArtist: false,
            isRadioEdit: false,
            audioFile: '',
            audioFileType: 'audio/wav',
            songType: 'original',
            songWriterFirstName: '',
            songWriterLastName: '',
            hasExplicitLyrics: false,
            isInstrumental: false,
            specifyPreview: false,
            trackPrice: 0,
            maticTrackPrice: 0,
            ipfsHash: '',
        },
    ],
};

const projectReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(storeMusicDetails, (state, action) => {
            state.budDetails = { ...(action.payload || {}) };
        })
        .addCase(addTrackDetails, (state, action) => {
            state.tracks.push(action.payload);
        })
        .addCase(deleteTrackDetails, (state, action) => {
            state.tracks = state.tracks.filter((track) => track.id !== action.payload.id);
        })
        .addCase(updateTrackDetails, (state, action) => {
            state.tracks = state.tracks.map((track) => {
                if (track.id === action.payload.id) {
                    return { ...track, ...action.payload };
                }
                return track;
            });
        })
        .addCase(resetAllDetails, (state) => {
            state.budDetails = { ...initialState.budDetails };
            state.tracks = [
                {
                    id: uuidv4(),
                    songTitle: '',
                    hasFeaturedArtist: false,
                    isRadioEdit: false,
                    audioFile: '',
                    audioFileType: 'audio/wav',
                    songType: 'original',
                    songWriterFirstName: '',
                    songWriterLastName: '',
                    hasExplicitLyrics: false,
                    isInstrumental: false,
                    specifyPreview: false,
                    trackPrice: 0,
                    maticTrackPrice: 0,
                    ipfsHash: '',
                },
            ];
        });
});

export default projectReducer;
