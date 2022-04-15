import { Provider } from "react-redux";
import store from "./app/state";
import Layout from './app/modules/layout/Layout';

function App() {
	return (
		<Provider store={store}>
			<Layout>

			</Layout>
		</Provider>
	);
}

export default App;
