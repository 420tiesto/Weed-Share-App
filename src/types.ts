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
