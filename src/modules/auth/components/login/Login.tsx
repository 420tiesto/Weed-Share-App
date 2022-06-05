import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Connectors from '../connectWallet/Connectors';
import { getProfiles } from '../../../profile/services/get-profiles';
import { login } from '../../services/lens-login';
import { setUserAuthenticated, setUserHandle, setUserProfile } from '../../state/auth.action';
import { useAppDispatch } from '../../../../state/configure-store';
import { init } from '../../../../services/ethers-service';
import { HOME_PAGE, SIGNUP } from '../../../../app/routes/Routes';
import { setStorageValue } from '../../../../utils/local-storage/local-storage';
import { PRNTS_USER_HANDLE } from '../../../../utils/local-storage/keys';

type Props = {};

const Login: React.FC<Props> = (props: Props) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    useEffect(() => {}, []);

    const handleMetamaskConnect = () => {
        init().then((account: any) => {
            if (account) checkProfileInLens(account);
        });
    };

    const checkProfileInLens = (account: string) => {
        getProfiles({
            ownedBy: [account],
            limit: 10,
        }).then(async (profile: any) => {
            console.log(profile.data);
            if (profile.data.profiles.items.length > 0) {
                await dispatch(login());
                dispatch(setUserHandle(profile.data.profiles.items[0].handle));
                dispatch(setUserProfile(profile.data.profiles.items[0]));
                setStorageValue(PRNTS_USER_HANDLE, profile.data.profiles.items[0].handle);
                dispatch(setUserAuthenticated(true));
                navigate(HOME_PAGE);
            } else {
                // To Do
                // show notification that no profile in lens
                // show pop saying no accoutn in PRNTS, Signup?
                navigate(SIGNUP);
            }
        });
    };

    const handleConnectWallet = async () => {
        console.log('connect');
        handleMetamaskConnect();
    };

    return (
    <div className="flex flex-col gap-4 items-center mx-auto max-w-screen-lg mt-32 p-8 px-12 ">
            <div className="relative sunken-element bg-dark-gray flex flex-col bg-gray-900 rounded-2xl  w-full  p-16">
                <h1 className="text-4xl mb-1 font-bold">Login</h1>
                <Link to="/signup">
                    <p>
                        Don't have an account ?<span className="text-primary pl-1">Sign Up</span>
                    </p>
                </Link>
                <div className="flex-grow flex justify-center flex-col items-center m-8 ">
                    <p className="mb-8">
                        Connect with one of our available{' '}
                        <span className="text-primary"> wallet </span> providers or create a new
                        one.
                    </p>
                    <Connectors connectWallet={handleConnectWallet} />
                </div>
            </div>
        </div>
    );
};

export default Login;
