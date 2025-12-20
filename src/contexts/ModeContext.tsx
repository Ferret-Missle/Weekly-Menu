import React, { createContext, useContext, useMemo, useState } from "react";

import { createTheme, ThemeProvider } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";

import type { ReactNode } from "react";

import type { PaletteMode } from "@mui/material";

interface ModeContextType {
	toggleColorMode: () => void;
	mode: PaletteMode;
}
const ModeContext = createContext<ModeContextType | undefined>(undefined);

export const ModeContextProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [mode, setMode] = useState<PaletteMode>("light");
	const colorMode = useMemo(
		() => ({
			mode,
			toggleColorMode: () => {
				setMode((prevMode: PaletteMode) =>
					prevMode === "light" ? "dark" : "light"
				);
			},
		}),
		[mode]
	);
	const theme = useMemo(() => createTheme({ palette: { mode } }), [mode]);

	return (
		<ModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</ModeContext.Provider>
	);
};

export const useModeContext = () => {
	const context = useContext(ModeContext);
	if (!context) {
		throw new Error("useModeContext must be used within a ModeContextProvider");
	}
	return context;
};
