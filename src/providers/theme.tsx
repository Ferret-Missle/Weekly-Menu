import { useAtomValue } from 'jotai';
import { useMemo } from 'react';

import { createTheme, ThemeProvider } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';

import { themeMode } from '../contexts/themeContext';

import type { ReactNode } from "react";

declare module "@mui/material/styles" {
	interface Palette {
		customBackground: {
			container: string;
			button: string;
		};
	}
	interface PaletteOptions {
		customBackground?: {
			container?: string;
			button?: string;
		};
	}
}
export const ModeThemeProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const mode = useAtomValue(themeMode);
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
									button: "#FFFFFF",
								},
								text: {
									primary: "#202124", // 非常に濃いグレー（真っ黒ではない）
									secondary: "#5F6368",
								},
								icon: {
									active: "#f38f60",
									inactive: "#202124",
									hoverBgcolor: "#f38f60",
									hoverColor: "#FFFFFF",
								},
							}
						: {
								// ダークモード
								background: {
									default: "#1F1F1F", // Material 3の標準的な背景色
									paper: "#2D2D2D", // コンテンツが乗る「少し明るい」グレー
								},
								customBackground: {
									container: "#1F1F1F",
									button: "#444444",
								},
								text: {
									primary: "#E8EAED", // 柔らかい白
									secondary: "#9AA0A6",
								},
								icon: {
									active: "#f38f60",
									inactive: "#E8EAED",
									hoverBgcolor: "#f38f60",
									hoverColor: "#FFFFFF",
								},
							}),
				},
			}),
		[mode],
	);

	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
			{children}
		</ThemeProvider>
	);
};
