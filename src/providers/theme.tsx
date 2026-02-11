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
					primary: {
						main: "#FF7043",
					},
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
									active: "#FF7043",
									inactive: "#202124",
									hoverBgcolor: "#F4511E",
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
									active: "#FF7043",
									inactive: "#E8EAED",
									hoverBgcolor: "#F4511E",
									hoverColor: "#FFFFFF",
								},
							}),
				},
				components: {
					MuiOutlinedInput: {
						styleOverrides: {
							root: {
								backgroundColor: "#FFF5F2", // 通常時の背景
								"& input:-webkit-autofill": {
									// オートコンプリート時の背景色と文字色を強制指定
									WebkitBoxShadow: "0 0 0 100px #FFFFFF inset", // 背景色の上書き
									WebkitTextFillColor: "#000", // 文字色の固定
									borderRadius: "inherit", // 枠の角を合わせる
								},
							},
						},
					},
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
