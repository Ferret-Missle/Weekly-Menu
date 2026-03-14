import { useAtomValue, useSetAtom } from "jotai";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";

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
import { Recipe } from "./features/recipe/Recipe";
import { PurchaseList } from "./features/purchase_list/PurchaseList";
import { useEffect } from "react";

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
					<Route
						path="/recipe"
						element={
							<AuthGuard mode="recipe">
								<Recipe />
							</AuthGuard>
						}
					/>
					<Route
						path="/list"
						element={
							<AuthGuard mode="list">
								<PurchaseList />
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
	const setContentsMode = useSetAtom(contentsMode);

	useEffect(() => {
		if (user === undefined) {
			setContentsMode(null);
		} else if (user !== null) {
			setContentsMode(mode);
		}
	}, [user, mode, setContentsMode]);

	if (user === undefined) {
		//ログイン状態未確定時
		return (
			<Box
				sx={{
					display: "flex",
					justifyContent: "center",
					alignItems: "center",
					width: "100%",
					height: "100vh",
				}}
			>
				<CircularProgress size="3rem" />
			</Box>
		);
	} else if (user === null) {
		//未ログイン時
		return <Navigate to="/" />;
	} else {
		return children;
	}
};

export default App;
