import { Provider } from 'react-redux';
import ConnectWallet from './app/modules/socialMedia/components/auth/components/connectWallet/ConnectWallet';
import SignUp from './app/modules/socialMedia/components/auth/components/signUp/SignUp';
import UploadNfts from './app/modules/socialMedia/components/auth/components/uploadNfts/UploadNfts';
import store from './app/state';

function App() {
    return (
        <Provider store={store}>
            <SignUp/>
            <ConnectWallet/>
            <UploadNfts />
        </Provider>
    );
}

export default App;
