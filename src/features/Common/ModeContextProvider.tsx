import { useMemo, useState } from 'react';

import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import { ModeContext } from '../../contexts/ModeContext';

import type { ReactNode } from "react";
import type { PaletteMode } from "@mui/material";

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
	const theme = useMemo(
		() =>
			createTheme({
				breakpoints: {
					//画面サイズ
					values: {
						xs: 0,
						sm: 600,
						md: 960,
						lg: 1280,
						xl: 1920,
					},
				},
				palette: {
					mode,
					...(mode === "light"
						? {
								// ライトモード
								background: {
									default: "#F8F9FA", // Google検索などの背景色
									paper: "#FFFFFF", // カードやダイアログの白
								},
								customBackground: {
									container: "#E8EAED",
								},
								text: {
									primary: "#202124", // 非常に濃いグレー（真っ黒ではない）
									secondary: "#5F6368",
								},
						  }
						: {
								// ダークモード
								background: {
									default: "#1F1F1F", // Material 3の標準的な背景色
									paper: "#2D2D2D", // コンテンツが乗る「少し明るい」グレー
								},
								customBackground: {
									container: "#3C4043",
								},
								text: {
									primary: "#E8EAED", // 柔らかい白
									secondary: "#9AA0A6",
								},
						  }),
				},
			}),
		[mode]
	);

	return (
		<ModeContext.Provider value={colorMode}>
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		</ModeContext.Provider>
	);
};
