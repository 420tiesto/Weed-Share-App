import { initialState as projectInitialState } from './modules/project/state/reducer';
import { initialState } from './state/reducer';

declare global {
    interface Window {
        ethereum: any;
    }
    var __DEV__: boolean;
}

declare module '*.module.css';

export type AuthTokens = {
    accessToken: string;
    refreshToken: string;
};

export declare type objectType = {
    [key: string]: any;
};

export type UserProfile = {
    username: string;
    email: string;
};

export type TReducerState = {
    globalReducer: typeof initialState;
    projectReducer: typeof projectInitialState;
};

export type MimeType =
    | 'image/gif'
    | 'image/jpeg'
    | 'image/png'
    | 'image/tiff'
    | 'image/x-ms-bmp'
    | 'image/svg+xml'
    | 'image/webp'
    | 'video/webm'
    | 'video/mp4'
    | 'video/x-m4v'
    | 'video/ogv'
    | 'video/ogg'
    | 'audio/wav'
    | 'audio/mpeg'
    | 'audio/ogg';

export interface MetadataMedia {
    item: string;
    /**
     * This is the mime type of media
     */
    type: MimeType;
}
