import { BrowserRouter, Route, Routes } from 'react-router-dom';

// import { useAuthStateListener } from "./contexts/firebaseUserContext";
import { Auth } from './features/auth/Auth';

// import { ModeThemeProvider } from "./providers/theme";

export const App = () => {
	// useAuthStateListener();

	return (
		// <ModeThemeProvider>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Auth />} />
			</Routes>
		</BrowserRouter>
		// </ModeThemeProvider>
	);
};