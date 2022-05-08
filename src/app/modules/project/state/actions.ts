import { createAction } from '@reduxjs/toolkit';
import { type AlbumDetails } from '../createProject/types';

const storeAlbumDetails = createAction<AlbumDetails>('STORE_ALBUM_DETAILS');

export { storeAlbumDetails };
