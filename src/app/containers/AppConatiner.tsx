import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { setUserAuthenticated, setUserProfile } from '../../modules/auth/state/auth.action';
import AppRoutes from '../routes/Routes';
import { LENS_TOKENS, PRNTS_PUBLIC_KEY, PRNTS_USER_HANDLE } from '../../utils/local-storage/keys';
import { getStorageValue } from '../../utils/local-storage/local-storage';
import { getUserAuthenticated } from '../../modules/auth/state/auth.reducer';
import { Toaster } from 'react-hot-toast';
import Navbar from '../components/header/navbar/Navbar';
import { getProfiles } from '../../modules/profile/services/get-profiles';

interface Props {}

interface State {
    authenticated: boolean;
}

const AppContainer: React.FC<Props> = (props: Props) => {
    const dispatch = useDispatch();
    const auth = getStorageValue(LENS_TOKENS);
    const address = getStorageValue(PRNTS_PUBLIC_KEY);
    const handle = getStorageValue(PRNTS_USER_HANDLE);
    const authenticatedState = useSelector(getUserAuthenticated);

    useEffect(() => {
        checkIfUserLoggedIn();
    }, []);
    window.ethereum.on('accountsChanged', (accounts: any) => {
        // If user has locked/logout from MetaMask, this resets the accounts array to empty
        if (!accounts.length) {
            // logic to handle what happens once MetaMask is locked
            // setState({ authenthicated: false });
            dispatch(setUserAuthenticated(false));
        } else {
            // check with localStorage for Adresss, if not same logout
            // if same load the state
            if (accounts[0] !== address) {
                dispatch(setUserAuthenticated(false));
                console.log('locked');
            } else {
                // check with localStorage for Adresss, if not same logout
                // if same load the state
                console.log(accounts[0]);
                if (accounts[0] !== address) {
                    dispatch(setUserAuthenticated(false));
                }
                console.log('not locked');
            }
        }
    });

    const checkIfUserLoggedIn = () => {
        if (auth && address && handle) {
            getProfiles({
                handles: [handle],
                limit: 1,
            }).then((profile: any) => {
                dispatch(setUserAuthenticated(true));
                dispatch(setUserProfile(profile.data.profiles.items[0]));
            });
        } else {
            dispatch(setUserAuthenticated(false));
        }
    };

    return (
        <BrowserRouter>
            <Toaster position="top-right" />
            <Navbar />
            <div className="max-w-screen-xl pt-16 mx-auto  container">
                <AppRoutes />
            </div>
        </BrowserRouter>
    );
};

export default AppContainer;
