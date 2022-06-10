import { Provider, useDispatch } from 'react-redux';
import { Web3ReactProvider } from '@web3-react/core';
import { QueryClientProvider } from 'react-query';
import queryClient from '../services/query-client';
import { getLibrary } from '../services/ethers-service';
import store from '../state';
import AppContainer from './containers/AppConatiner';
import PersistGate from './components/persist-gate';
import { persistor } from '../state';
import Loader from './components/common-ui/loader/index';

function App(): JSX.Element {
    return (
        <QueryClientProvider client={queryClient}>
            <Web3ReactProvider getLibrary={getLibrary}>
                <Provider store={store}>
                    <PersistGate loading={<Loader />} persistor={persistor}>
                        <AppContainer />
                    </PersistGate>
                </Provider>
            </Web3ReactProvider>
        </QueryClientProvider>
    );
}

export default App;
