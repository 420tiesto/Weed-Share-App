import { Provider } from 'react-redux';
import UploadNfts from './app/modules/socialMedia/components/auth/components/signUp/UploadNfts';

import store from './app/state';

function App() {
    return (
        <Provider store={store}>
            <UploadNfts />
        </Provider>
    );
}

export default App;
