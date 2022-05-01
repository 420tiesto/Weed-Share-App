import React, { useRef } from 'react';
import {
    LoginSocialGoogle,
    LoginSocialFacebook,
    LoginSocialInstagram,
    IResolveParams,
    TypeCrossFunction,
} from 'reactjs-social-login';

import { login } from '../../../components/auth/services/lens-login';
import { REDIRECT_URI } from '../../../../../constants';

// import { AppButton, AppInput } from '../../../../shared/forms/components';
// import { getInitialValues, getValidationSchema, UpdatePasswordModel } from '../../forms/updatePassword/updatePassword';
// import { updatePassword } from '../../../../services/api/userApi';
import { useAppDispatch } from '../../../../../state/configure-store';
import SocialLoginButton from '../socialLoginButton/socialLoginButton';
import { storeUserProfile } from '../../../../../state/actions';

interface UpdatePasswordProps {}

const SignIn: React.FC<UpdatePasswordProps> = () => {
    const instagramRef = useRef<TypeCrossFunction>(null!);
    const googleRef = useRef<TypeCrossFunction>(null!);
    const facebookRef = useRef<TypeCrossFunction>(null!);
    const twitterRef = useRef<TypeCrossFunction>(null!);

    const dispatch = useAppDispatch();

    const handleLensOnLogin = () => {
        dispatch(login());
    };

    const handleSocialLoginSuccess = ({ provider, data }: IResolveParams) => {
        dispatch(storeUserProfile({ provider, data }));
    };

    return (
        <div>
            <LoginSocialFacebook
                ref={facebookRef}
                appId={process.env.REACT_APP_FB_APP_ID || ''}
                onResolve={handleSocialLoginSuccess}
                onReject={() => {
                    console.log('Failed to login');
                }}>
                <SocialLoginButton>Login with Facebook</SocialLoginButton>
            </LoginSocialFacebook>
            <LoginSocialGoogle
                ref={googleRef}
                client_id={process.env.REACT_APP_GG_APP_ID || ''}
                onResolve={handleSocialLoginSuccess}
                onReject={() => {}}>
                <SocialLoginButton>Login with Google</SocialLoginButton>
            </LoginSocialGoogle>
            <LoginSocialInstagram
                ref={instagramRef}
                client_id={process.env.REACT_APP_INSTAGRAM_APP_ID || ''}
                client_secret={process.env.REACT_APP_INSTAGRAM_APP_SECRET || ''}
                redirect_uri={REDIRECT_URI}
                onResolve={handleSocialLoginSuccess}
                onReject={(err: any) => {
                    console.log(err);
                }}>
                <SocialLoginButton>Login with Instagram</SocialLoginButton>
            </LoginSocialInstagram>
            <SocialLoginButton triggerLogin={handleLensOnLogin}>Login to Lens</SocialLoginButton>
        </div>
    );
};

export default SignIn;
