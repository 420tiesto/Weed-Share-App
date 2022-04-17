import { Provider } from "react-redux";
import ConnectWallet from "./app/modules/socialMedia/components/auth/components/connectWallet/ConnectWallet";
import Home from "./app/modules/socialMedia/components/home/Home";

import store from "./app/state";

function App() {
	return (
		<Provider store={store}>
		<ConnectWallet/>
		
	</Provider>
)
}

export default App;
