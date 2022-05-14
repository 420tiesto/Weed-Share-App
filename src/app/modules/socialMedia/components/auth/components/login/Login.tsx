import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { copyright } from '../../../../../../constants';
import Connectors from '../connectWallet/Connectors';
import { init } from '../../../../../../services/ethers-service';
import { getProfiles } from '../../../profile/services/get-profiles';
import { login } from '../../services/lens-login';
import { useAppDispatch } from '../../../../../../state/configure-store';
import { setUserProfile } from '../../state/auth.action';

type Props = {};

const Login: React.FC<Props> = (props: Props) => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    useEffect(() => {
        handleMetamaskConnect();
    }, []);

    const handleMetamaskConnect = () => {
        init().then((account) => {
            if (account) checkProfileInLens(account);
        });
    };

    const checkProfileInLens = (account: string) => {
        getProfiles({
            ownedBy: [account],
            limit: 10,
        }).then((profile) => {
            console.log(profile.data);
            if (profile.data.profiles.items.length > 0) {
                dispatch(setUserProfile(profile.data.profiles.items[0]));
                // navigate('/profile');
            } else {
                // show notification that no profile in lens
                navigate('/signup');
            }
            // setState({ profileDetails: profile.data.profiles.items });
            // getProfilePublications(profile.data.profiles.items[0].id);
            // console.log(getIPFSUrlLink(profile.data.profiles.items[0].picture.original.url));
        });
    };

    const handleConnectWallet = async () => {
        console.log('connect');
    };

    return (
        <div className="flex flex-col gap-4 items-center mx-auto max-w-screen-lg mt-8 ">
            <div className="relative sunken-element bg-dark-gray flex flex-col bg-gray-900 rounded-2xl h-[80vh]  w-full  py-8 px-16">
                {/* Prnts Logo */}
                <div className="absolute right-0 top-0 p-8 rounded-bl-2xl sunken-element--dark">
                    <img src="/prnts-logo.svg" alt="logo" />
                </div>
                <h1 className="text-4xl mb-1 font-bold">Login</h1>
                <Link to="/signup">
                    <p>
                        Don't have an account ?
                        <a className="text-primary pl-1" href="#">
                            Sign Up
                        </a>
                    </p>
                </Link>
                <div className="flex-grow flex flex-col items-center m-8 ">
                    <p className="mb-4">
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
