import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useAuthStateListener } from './contexts/FirebaseUserContext.tsx';
import Auth from './features/Authentication/Auth.tsx';
import { AuthGuard } from './features/Authentication/components/ModeParts/AuthGuard.tsx';
import { Calendar } from './features/Calendar/Calendar.tsx';
import { ModeContextProvider } from './features/Common/ModeContextProvider.tsx';

const App: React.FC = () => {
	useAuthStateListener();

	return (
		<ModeContextProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Auth />} />
					<Route
						path="/Calendar"
						element={
							<AuthGuard>
								<Calendar />
							</AuthGuard>
						}
					/>
				</Routes>
			</BrowserRouter>
		</ModeContextProvider>
	);
};

export default App;
