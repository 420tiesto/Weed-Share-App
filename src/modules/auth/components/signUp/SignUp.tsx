import React, { useEffect } from 'react';
import { useForm, SubmitHandler, Controller } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Connectors from '../connectWallet/Connectors';
import {
    checkUserHasEthereumBrowserWallet,
    getLensProfile,
    signup,
} from '../../services/auth.services';
import { login } from '../../services/lens-login';
import {
    setIsNewUser,
    setUserAdress,
    setUserAuthenticated,
    setUserHandle,
    setUserProfile,
} from '../../state/auth.action';
import CreateAccountModal from './createAccountModal';
import { useSetState } from 'react-use';
import { setWalletModalOpen, storeUserProfile } from '../../../../state/actions';
import { getUserProfile } from '../../state/auth.reducer';
import { init, isUsingWallet } from '../../../../services/ethers-service';
import { PRNTS_USER_HANDLE, USER_PROFILE } from '../../../../utils/local-storage/keys';
import { setStorageValue } from '../../../../utils/local-storage/local-storage';
import { HOME_PAGE } from '../../../../app/routes/Routes';

type Props = {
    // setStep: (step: number) => void;
};

interface FormValues {
    username: string;
    email: string;
}

interface State {
    showModal: boolean;
}

const SignUp: React.FC<Props> = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [state, setState] = useSetState<State>({
        showModal: false,
    });

    const { showModal } = state;

    useEffect(() => {}, []);

    const openModal = () => {
        dispatch(setWalletModalOpen(true));
    };

    const { username, email } = useSelector(getUserProfile);

    const { register, handleSubmit } = useForm<FormValues>({
        defaultValues: {
            username,
            email,
        },
    });

    const onSubmit: SubmitHandler<FormValues> = async (data) => {
        const isUsingMetamaskWallet = await isUsingWallet();
        if (!isUsingMetamaskWallet) {
            openModal();
            return;
        }
        setStorageValue(USER_PROFILE, data);
        dispatch(storeUserProfile({ username: data.username, email: data.email }));
        // setStep(2);
    };

    const handleConnectWallet = async () => {
        if (checkUserHasEthereumBrowserWallet()) {
            signup();
        } else {
            // show modal saying install metamask not supported, Pls install
            console.log('metamask not supported');
        }
    };

    const signup = async () => {
        // if (window.ethereum) {design
        init().then(async (account: string) => {
            if (account) {
                dispatch(setUserAdress(account));
                const profile = await getLensProfile(account);
                if (profile && profile.profiles.items.length > 0) {
                    await dispatch(login());
                    dispatch(setUserProfile(profile.profiles.items[0]));
                    navigate(HOME_PAGE);
                } else {
                    setState({ showModal: true });
                }
            } else {
                console.log('No metmask connected');
            }
        });
        // }
    };

    const signUpSuccess = (handle: string) => {
        setState({ showModal: false });
        setStorageValue(PRNTS_USER_HANDLE, handle);
        dispatch(setUserHandle(handle));
        dispatch(setIsNewUser(true));
        dispatch(setUserAuthenticated(true));
        navigate(`/profile/${handle}`);
    };

    return (
        <>
            <div className="flex flex-col gap-4 items-center mx-auto max-w-screen-lg mt-32 p-8 px-12">
                <div className="relative sunken-element bg-dark-black flex flex-col bg-black-900 rounded-2xl   w-full  p-16">
                
                    <h1 className="text-4xl mb-1 font-bold">Sign Up</h1>
                    <Link to="/signup">
                        <p>
                            Already Have an Account ?
                            <span className="text-primary pl-1">Login</span>
                        </p>
                    </Link>
                    <div className="flex-grow  flex flex-col items-center m-8 ">
                        <p className="mb-8">
                            Connect with one of our available{' '}
                            <span className="text-primary"> wallet </span> providers or create a new
                            one.
                        </p>
                        <Connectors connectWallet={handleConnectWallet} />
                    </div>
                </div>
            </div>
            <CreateAccountModal
                isOpen={showModal}
                closeModal={() => setState({ showModal: false })}
                onSuccess={(handle: string) => signUpSuccess(handle)}
            />
        </>
    );
};

export default SignUp;
