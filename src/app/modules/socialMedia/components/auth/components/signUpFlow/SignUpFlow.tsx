import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import {
    getStorageValue,
    removeStorageValue,
} from '../../../../../../utils/local-storage/local-storage';
import { storeProfileURI, storeFollowURI } from '../../services/store-image-uris';
import {
    USER_PROFILE_URI,
    USER_FOLLOW_URI,
    USER_PROFILE,
} from '../../../../../../utils/local-storage/keys';
import { useAppDispatch } from '../../../../../../state/configure-store';
import { getImageURIs, getUserProfile } from '../../../../../../state/selectors';
import { storeUserProfile } from '../../../../../../state/actions';
import SignUp from '../signUp/SignUp';
import UploadNfts from '../uploadNfts/UploadNfts';
import { pollUntilIndexed } from '../../../../../../services/has-transaction-been-indexed';
import { apiErrorCodes } from '../../../../../../constants';
import { login } from '../../services/lens-login';
import { useNavigate } from 'react-router-dom';
import { createProfile, createProfileRequest } from '../../../profile/services/create-profile';

interface SignUpFlowProps {}

const SignUpFlow: React.FC<SignUpFlowProps> = () => {
    const [step, setStep] = useState(1);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { profileURI, followURI } = useSelector(getImageURIs);
    const { username, email } = useSelector(getUserProfile);

    useEffect(() => {
        const userProfileUri = getStorageValue(USER_PROFILE_URI);
        if (!!userProfileUri) {
            dispatch(storeProfileURI(userProfileUri));
        }

        const userFollowUri = getStorageValue(USER_FOLLOW_URI);
        if (!!userFollowUri) {
            dispatch(storeFollowURI(userFollowUri));
        }

        const userProfile = getStorageValue(USER_PROFILE);
        if (!!userProfile) {
            dispatch(storeUserProfile(JSON.parse(userProfile)));
        }
    }, []);

    const submit = async () => {
        if (!profileURI) {
            alert('Please upload your profile image');
            return;
        }
        // Move this to a another page that shows the overall details of the signup process
        try {
            const profileRequest = createProfileRequest(
                username,
                profileURI,
                followURI || profileURI
            );
            const response = await createProfile(profileRequest);
            const {
                data: {
                    createProfile: { txHash = '', reason = '' } = {},
                    errors: [{ message = '' } = {}] = [],
                } = {},
            } = response;

            // TODO: Add loading animation to make the login process more user friendly
            if (txHash) {
                await pollUntilIndexed(response.data.createProfile.txHash);

                alert('Profile created successfully');
                removeStorageValue(USER_PROFILE_URI);
                removeStorageValue(USER_FOLLOW_URI);
                navigate('/');
            } else if (reason === apiErrorCodes.handleTaken) {
                alert('Handle already in use. Please choose another handle');
            } else if (reason === apiErrorCodes.REJECTED) {
                alert('Request was refused. Please choose another handle');
            } else if (reason === apiErrorCodes.WRONG_WALLET_SIGNED) {
                alert('Make sure that Polygon is selected in your wallet');
            } else if (message) {
                alert(message);
            } else {
                alert('Something went wrong. Please check the console response');
                console.error('Create Profile response:: ', response);
            }
        } catch (error) {
            if (error) {
                const e = error as any;
                console.log(e.message, '******* checkthis');
                if (e.message === 'User not authenticated') {
                    console.log('Am I coming here?????');
                    dispatch(login());
                }
            }
        }
    };

    if (step === 1) {
        return <SignUp setStep={setStep} />;
    }

    return <UploadNfts setStep={setStep} submit={submit} />;
};

export default SignUpFlow;
