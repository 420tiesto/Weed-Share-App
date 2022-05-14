import { authAPI } from '../../../../../services/api';
import apiUrls from '../../../../../services/api-urls';
import { init } from '../../../../../services/ethers-service';
import { pollUntilIndexed } from '../../../../../services/has-transaction-been-indexed';
import { useAppDispatch } from '../../../../../state/configure-store';
import { createProfile } from '../../profile/services/create-profile';
import { getProfiles } from '../../profile/services/get-profiles';
import { setUserProfile } from '../state/auth.action';
import { login } from './lens-login';

// const dispatch = useAppDispatch();

export const checkUserHasEthereumBrowserWallet = () => {
    if (window.ethereum) {
        return true;
    } else {
        return false;
    }
};

export const userLogin = async () => {
    if (window.ethereum) {
        init().then(async (account) => {
            if (account) {
                const profile = await getLensProfile(account);
                if (profile) {
                    // await dispatch(login());
                    // dispatch(setUserProfile(profile.data.profiles.items[0]));
                    // naivigate to previous route
                    console.log('user logged in', profile.data.profiles.items[0]);
                } else {
                    console.log('no lens account');
                }
            }
        });
    }
};

export const signup = async () => {
    if (window.ethereum) {
        init().then(async (account) => {
            if (account) {
                const profile = await getLensProfile(account);
                if (profile.profiles.items.length > 0) {
                    // await dispatch(login());
                    // dispatch(setUserProfile(profile.data.profiles.items[0]));
                    // navigate to previous route
                    console.log('user logged in', profile.profiles.items[0]);
                    return { status: 200, msg: 'User Logged In' };
                } else {
                    // createProfileLens();
                    console.log('user needs to be created');
                    return { staus: 400, msg: 'Need to create user' };
                }
                // get Lens Signature
            }
        });
    }
};

export const createProfileLens = async (handle: string) => {
    return createProfile({
        handle: handle,
        profilePictureUri: null,
        followModule: {
            freeFollowModule: true,
        },
    }).then(async (resp) => {
        console.log(resp);
        return await pollUntilIndexed(resp.data.createProfile.txHash).then((resp) => {
            console.log(resp, 'Profile Created');
            return true;
        });
        // dispatch(setUserProfile(resp.data.profiles.items[0]));
    });
};

export const getLensProfile = (account: string) => {
    return getProfiles({
        ownedBy: [account],
        limit: 10,
    }).then((profile) => {
        console.log(profile.data);
        if (profile.data.profiles.items.length > 0) {
            // dispatch(login());
            // navigate('/profile');
            return profile.data;
        }
        // } else {
        //     // show notification that no profile in lens
        //     // navigate('/signup');
        //     return [];
        // }
    });
};

export const checkForHandle = async (handle: string) => {
    return getProfiles({
        handles: [handle + '.test'],
        limit: 1,
    }).then((profile) => {
        console.log(profile, 'profile');
        if (profile.data.profiles.items.length > 0) {
            console.log(true);
            return true;
        } else {
            console.log(false);
            return false;
        }
    });
};
