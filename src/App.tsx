import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Auth from './features/Authentication/Auth.tsx';
import { ModeContextProvider } from "./features/Authentication/components/ModeParts/ModeContextProvider.tsx";

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
