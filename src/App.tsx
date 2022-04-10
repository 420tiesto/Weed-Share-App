import { Provider } from "react-redux";
import logo from "./logo.svg";
import "./App.css";
import store from "./app/state";
import CreateProfile from './app/modules/socialMedia/profile/components/create-profile';

function App() {
	return (
		<Provider store={store}>
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<CreateProfile />
				</header>
			</div>
		</Provider>
	);
}

export default App;
