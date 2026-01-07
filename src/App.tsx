import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { useAuthStateListener } from './contexts/FirebaseUserContext.tsx';
import Auth from './features/Authentication/Auth.tsx';
import { AuthGuard } from './features/Authentication/components/ModeParts/AuthGuard.tsx';
import {
    ModeContextProvider
} from './features/Authentication/components/ModeParts/ModeContextProvider.tsx';
import { Calendar } from './features/Calendar/Calendar.tsx';

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
