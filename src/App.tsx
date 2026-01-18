import { useAtomValue } from "jotai";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import {
	firebaseUser,
	useAuthStateListener,
} from "./contexts/FirebaseUserContext";
import { Auth } from "./features/auth/Auth";
import { Calendar } from "./features/calendar/Calendar";
import { ModeThemeProvider } from "./providers/theme";

const App = () => {
	useAuthStateListener();

	return (
		<ModeThemeProvider>
			<BrowserRouter>
				<Routes>
					<Route path="/" element={<Auth />} />
					<Route
						path="/calendar"
						element={
							<AuthGuard>
								<Calendar />
							</AuthGuard>
						}
					/>
				</Routes>
			</BrowserRouter>
		</ModeThemeProvider>
	);
};

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
	const user = useAtomValue(firebaseUser);
	const navi = useNavigate();

	if (user === undefined) {
		return (
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<CircularProgress />
			</Box>
		);
	} else if (user === null) {
		navi("/");
	} else {
		return children;
	}
};

export default App;
