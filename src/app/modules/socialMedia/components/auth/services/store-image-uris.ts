import { Dispatch } from 'redux';
import { storeUserProfileURI, storeUserFollowURI } from '../../../../../state/actions';
import { setStorageValue } from '../../../../../utils/local-storage/local-storage';
import { USER_PROFILE_URI, USER_FOLLOW_URI } from '../../../../../utils/local-storage/keys';

export const storeProfileURI = (profileURI: string) => {
    setStorageValue(USER_PROFILE_URI, profileURI);
    return async (dispatch: Dispatch) => {
        dispatch(storeUserProfileURI(profileURI));
    };
};

export const storeFollowURI = (followURI: string) => {
    setStorageValue(USER_FOLLOW_URI, followURI);
    return async (dispatch: Dispatch) => {
        dispatch(storeUserFollowURI(followURI));
    };
}