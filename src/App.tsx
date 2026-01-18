import { useAtomValue, useSetAtom } from "jotai";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

import { contentsMode } from "./contexts/ContentsModeContext";
import {
	firebaseUser,
	useAuthStateListener,
} from "./contexts/FirebaseUserContext";
import { Auth } from "./features/auth/Auth";
import { Calendar } from "./features/calendar/Calendar";
import { ModeThemeProvider } from "./providers/theme";

import type { ContentsModeType } from "./types/types";
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
							<AuthGuard mode="calendar">
								<Calendar />
							</AuthGuard>
						}
					/>
				</Routes>
			</BrowserRouter>
		</ModeThemeProvider>
	);
};

const AuthGuard = ({
	children,
	mode,
}: {
	children: React.ReactNode;
	mode: ContentsModeType;
}) => {
	const user = useAtomValue(firebaseUser);
	const navi = useNavigate();
	const setContentsMode = useSetAtom(contentsMode);

	if (user === undefined) {
		setContentsMode(null);
		return (
			<Box sx={{ display: "flex", justifyContent: "center" }}>
				<CircularProgress />
			</Box>
		);
	} else if (user === null) {
		setContentsMode(null);
		navi("/");
	} else {
		setContentsMode(mode);
		return children;
	}
};

export default App;
