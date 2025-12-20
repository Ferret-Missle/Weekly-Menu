import { BrowserRouter, Route, Routes } from "react-router-dom";

import { ModeContextProvider } from "./contexts/ModeContext";
import Auth from "./features/Authentication/Auth.tsx";

const App: React.FC = () => {
	return (
		<ModeContextProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Auth />} />
				</Routes>
			</BrowserRouter>
		</ModeContextProvider>
	);
};

export default App;
