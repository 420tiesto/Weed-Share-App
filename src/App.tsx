import React from 'react'
import { Provider } from "react-redux";
import logo from "./logo.svg";
import store from "./app/state";
import CreateProfile from './app/modules/socialMedia/profile/components/create-profile';
import SignIn from './app/modules/socialMedia/auth/components/signIn/SignIn';

function App() {
	return (
		<Provider store={store}>
			<div className="App">
				<header className="App-header">
					<img src={logo} className="App-logo" alt="logo" />
					<CreateProfile />
					<SignIn />
				</header>
			</div>
		</Provider>
	);
}

export default App;
