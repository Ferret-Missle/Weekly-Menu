import type { ThemeOptions } from "@mui/material/styles";

export const commonSettings: ThemeOptions = {
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
	shape: {
		borderRadius: 8,
	},
	typography: {
		//テキストスタイル
		fontFamily: "Roboto",
		button: { textTransform: "none" },
	},
};
