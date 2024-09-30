import Canvas from "@/components/Canvas/Canvas";
import EditingPanel from "@/components/Tab/TabPanel";
import store from "@/redux/store";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";

function App() {
	return (
		<Provider store={store}>
			<div className="flex flex-row flex-wrap">
				<Toaster />

				<aside className="order-2 flex w-full flex-col border-neutral-800 sm:order-1 sm:h-screen sm:w-3/12 sm:border-r sm:bg-neutral-900 md:w-4/12 lg:max-w-md">
					<EditingPanel />
				</aside>

				<main className="order-1 w-full sm:order-2 sm:h-screen sm:w-9/12 md:w-8/12 lg:grow">
					<Canvas />
				</main>
			</div>
		</Provider>
	);
}

export default App;
