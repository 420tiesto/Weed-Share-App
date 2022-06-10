import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { useSetState } from 'react-use';
import decodeJWT from 'jwt-decode';

import { setUserAuthenticated, setUserProfile } from '../../modules/auth/state/auth.action';
import AppRoutes from '../routes/Routes';
import { LENS_TOKENS, PRNTS_PUBLIC_KEY, PRNTS_USER_HANDLE } from '../../utils/local-storage/keys';
import { getStorageValue, setStorageValue } from '../../utils/local-storage/local-storage';
import { getUserAuthenticated } from '../../modules/auth/state/auth.reducer';
import Navbar from '../components/header/navbar/Navbar';
import { getProfiles } from '../../modules/profile/services/get-profiles';
import { copyright } from '../constants';
import { useEnabledCurrencies } from '../../services/enabled-currencies';
import { isValidToken } from '../../utils/auth-helpers';
import { refreshAuth } from '../../modules/auth/services/auth.services';
import { storeLensToken } from '../../state/actions';
import { useAppDispatch } from '../../state/configure-store';

interface Props {}

interface State {
    loading: boolean;
}

const AppContainer: React.FC<Props> = (props: Props) => {
    const dispatch = useAppDispatch();
    // useEnabledCurrencies();

    //localStorage
    const auth = getStorageValue(LENS_TOKENS);
    const address = getStorageValue(PRNTS_PUBLIC_KEY);
    const handle = getStorageValue(PRNTS_USER_HANDLE);

    //reduxState
    const authenticatedState = useSelector(getUserAuthenticated);

    const [state, setState] = useSetState<State>({
        loading: true,
    });

    const { loading } = state;

    useEffect(() => {
        checkIfUserLoggedIn();
    }, []);

    useEffect(() => {
        if (window.ethereum) {
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
        }
    }, []);

    const checkIfUserLoggedIn = () => {
        setState({ loading: true });
        if (!auth) {
            dispatch(setUserAuthenticated(false));
            setState({ loading: false });
            return;
        }
        const { accessToken, refreshToken } = JSON.parse(auth!);
        if (!isValidToken(accessToken)) {
            dispatch(setUserAuthenticated(false));
            setState({ loading: false });
        } else {
            console.log('refreshing auth tokens');
            refreshAuth(refreshToken)
                .then((tokens) => {
                    dispatch(storeLensToken(tokens.data.authenticate));
                    setStorageValue(LENS_TOKENS, JSON.stringify(tokens.data.authenticate));
                    if (address && handle) {
                        getProfiles({
                            handles: [handle],
                            limit: 1,
                        }).then((profile: any) => {
                            dispatch(setUserAuthenticated(true));
                            dispatch(setUserProfile(profile.data.profiles.items[0]));
                            setState({ loading: false });
                        });
                    } else {
                        dispatch(setUserAuthenticated(false));
                        setState({ loading: false });
                    }
                })
                .catch(() => {
                    dispatch(setUserAuthenticated(false));
                    setState({ loading: false });
                });
        }
    };

    return (
        <BrowserRouter>
            <Toaster position="top-right" />
            <Navbar />
            <div className=" mt-16">{loading ? <div>Loading..</div> : <AppRoutes />}</div>
            <div className="flex justify-center">
                <p className="my-4">{copyright}</p>
            </div>
        </BrowserRouter>
    );
};

export default AppContainer;
