import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { setUserAuthenticated } from '../../modules/auth/state/auth.action';
import AppRoutes from '../routes/Routes';
import { LENS_TOKENS, PRNTS_PUBLIC_KEY } from '../../utils/local-storage/keys';
import { getStorageValue } from '../../utils/local-storage/local-storage';
import { getUserAuthenticated } from '../../modules/auth/state/auth.reducer';
import { Toaster } from 'react-hot-toast';
import Navbar from '../components/header/navbar/Navbar';

interface Props {}

interface State {
    authenticated: boolean;
}

const AppContainer: React.FC<Props> = (props: Props) => {
    const dispatch = useDispatch();
    const auth = getStorageValue(LENS_TOKENS);
    const address = getStorageValue(PRNTS_PUBLIC_KEY);
    const authenticatedState = useSelector(getUserAuthenticated);

    useEffect(() => {
        console.log('here');
    }, [authenticatedState]);

    useEffect(() => {
        window?.ethereum?.on('accountsChanged', (accounts: any) => {
            // If user has locked/logout from MetaMask, this resets the accounts array to empty
            if (!accounts.length) {
                // logic to handle what happens once MetaMask is locked
                // setState({ authenthicated: false });
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
        });
    }, []);

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
