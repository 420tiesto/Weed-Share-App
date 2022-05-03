import { useState } from 'react';
import { Provider } from 'react-redux';
import ConnectWalletModal from './app/modules/socialMedia/components/auth/components/connectWallet/ConnectWalletModal';
import Login from './app/modules/socialMedia/components/auth/components/login/Login';
import SignUp from './app/modules/socialMedia/components/auth/components/signUp/SignUp';
import store from './app/state';

function App() {
    const [isOpen,setIsOpen] = useState(true);
    return (
        <Provider store={store}>
                {/* <SignUp/> */}
                <Login/>
                <ConnectWalletModal isOpen={isOpen} setIsOpen={setIsOpen}/>
        </Provider>
    );
}

export default App;
