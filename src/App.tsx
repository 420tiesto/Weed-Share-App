import { Provider } from 'react-redux';
import { Web3ReactProvider } from '@web3-react/core';
import { BrowserRouter as Router } from 'react-router-dom';
import ConnectWalletModal from './app/modules/socialMedia/components/auth/components/connectWallet/ConnectWalletModal';
import store, { persistor } from './app/state';
import AppRoutes from './app/navigation/Routes';
import { getLibrary } from './app/services/ethers-service';
import Loader from './app/components/common-ui/loader';

function App() {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <Provider store={store}>
                {/* <PersistGate loading={<Loader />} persistor={persistor}> */}
                <Router>
                    <AppRoutes />
                    <ConnectWalletModal />
                </Router>
                {/* </PersistGate> */}
            </Provider>
        </Web3ReactProvider>
    );
}

export default App;
