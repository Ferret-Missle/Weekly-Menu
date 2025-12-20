import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Auth from './features/Authentication/Auth.tsx';

const App: React.FC = () => {
	return (
		<>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Auth />} />
				</Routes>
			</BrowserRouter>
		</>
	);
};

export default App;
