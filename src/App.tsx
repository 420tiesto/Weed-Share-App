import { Provider } from 'react-redux';
import { Web3ReactProvider } from '@web3-react/core';
import { BrowserRouter as Router } from 'react-router-dom';
import ConnectWalletModal from './app/modules/socialMedia/components/auth/components/connectWallet/ConnectWalletModal';
import store from './app/state';
import AppRoutes from './app/navigation/Routes';
import { getLibrary } from './app/services/ethers-service';

function App() {
    return (
        <Web3ReactProvider getLibrary={getLibrary}>
            <Provider store={store}>
                <Router>
                    <AppRoutes />
                    <ConnectWalletModal />
                </Router>
            </Provider>
        </Web3ReactProvider>
    );
}

export default App;
