import { Dispatch } from 'redux';
import { storeUserFollowURI, storeUserProfileURI } from '../../../state/actions';
import { USER_FOLLOW_URI, USER_PROFILE_URI } from '../../../utils/local-storage/keys';
import { setStorageValue } from '../../../utils/local-storage/local-storage';

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
};
