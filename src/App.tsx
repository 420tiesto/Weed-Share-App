import { Provider, useDispatch } from 'react-redux';
import { Web3ReactProvider } from '@web3-react/core';
import { BrowserRouter as Router } from 'react-router-dom';
import { QueryClientProvider } from 'react-query';
import ConnectWalletModal from './app/modules/socialMedia/components/auth/components/connectWallet/ConnectWalletModal';
import store, { persistor } from './app/state';
import AppRoutes from './app/navigation/Routes';
import { getLibrary, init } from './app/services/ethers-service';
import { useEffect } from 'react';
import { useSetState } from 'react-use';
import { getStorageValue } from './app/utils/local-storage/local-storage';
import { LENS_TOKENS } from './app/utils/local-storage/keys';
import queryClient from './app/services/query-client';
import { setUserAuthenticated } from './app/modules/socialMedia/components/auth/state/auth.action';

interface State {
    authenthicated: boolean;
}

function App(): JSX.Element {
    // const dispatch = useDispatch();
    const [state, setState] = useSetState<State>({
        authenthicated: false,
    });

    const { authenthicated } = state;

    useEffect(() => {
        const auth = getStorageValue(LENS_TOKENS);
        console.log(auth, 'auth');
        if (auth) {
            //dispatch authenthicated
            setState({ authenthicated: true });
            // dispatch(setUserAuthenticated(true));
        }
    }, []);
    window.ethereum.on('accountsChanged', (accounts: any) => {
        // If user has locked/logout from MetaMask, this resets the accounts array to empty
        if (!accounts.length) {
            // logic to handle what happens once MetaMask is locked
            setState({ authenthicated: false });
            console.log('locked');
        } else {
            setState({ authenthicated: true });
            console.log('not locked');
        }
    });

    return (
        <QueryClientProvider client={queryClient}>
        <Web3ReactProvider getLibrary={getLibrary}>
            <Provider store={store}>
                {/* <PersistGate loading={<Loader />} persistor={persistor}> */}
                <Router>
                    <AppRoutes authenthicated={authenthicated} />
                    {/* <ConnectWalletModal /> */}
                </Router>
                {/* </PersistGate> */}
            </Provider>
        </Web3ReactProvider></QueryClientProvider>
    );
}

export default App;
