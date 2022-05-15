import { Provider, useDispatch } from 'react-redux';
import { Web3ReactProvider } from '@web3-react/core';
import { QueryClientProvider } from 'react-query';
import queryClient from '../services/query-client';
import { getLibrary } from '../services/ethers-service';
import store from '../state';
import AppContainer from './containers/AppConatiner';

function App(): JSX.Element {
    return (
        <QueryClientProvider client={queryClient}>
            <Web3ReactProvider getLibrary={getLibrary}>
                <Provider store={store}>
                    <AppContainer />
                </Provider>
            </Web3ReactProvider>
        </QueryClientProvider>
    );
}

export default App;
