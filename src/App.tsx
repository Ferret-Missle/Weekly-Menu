import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useAuthStateListener } from './contexts/FirebaseUserContext';
import { Auth } from './features/auth/Auth';
import { ModeThemeProvider } from './providers/theme';

const App = () => {
	useAuthStateListener();

	return (
		<ModeThemeProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Auth />} />
				</Routes>
			</BrowserRouter>
		</ModeThemeProvider>
	);
};

export default App;