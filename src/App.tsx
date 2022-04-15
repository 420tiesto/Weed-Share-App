import { Provider } from "react-redux";
import Home from "./app/modules/socialMedia/components/home/Home";
import store from "./app/state";

function App() {
	return (
		<Provider store={store}>
		<Home />
	</Provider>
);
}

export default App;
