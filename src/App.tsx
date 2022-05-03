import { Provider } from 'react-redux';
import SignUp from './app/modules/socialMedia/components/auth/components/signUp/SignUp';
import store from './app/state';

function App() {
    return (
        <Provider store={store}>
                <SignUp/>
        </Provider>
    );
}

export default App;
