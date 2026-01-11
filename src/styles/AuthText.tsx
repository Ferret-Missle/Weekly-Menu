import Typography from '@mui/material/Typography';

import type { TypographyProps } from "@mui/material/Typography";

export type LoginTypographyProps = TypographyProps & {
	role?: "title" | "subtitle" | "link" | "error" | "caption";
};

export const LoginTypography = ({
	role,
	children,
	sx,
	...props
}: LoginTypographyProps) => {
	const roleStyles = {
		title: {
			variant: "h5" as const,
			component: "h1" as const,
			fontWeight: "bold",
			textAlign: "center" as const,
		},
		subtitle: {
			variant: "body1" as const,
			color: "text.secondary",
			textAlign: "center" as const,
		},
		link: {
			variant: "body2" as const,
			color: "primary.main",
			fontWeight: "medium",
			sx: { cursor: "pointer", textDecoration: "hover" },
		},
		error: {
			variant: "caption" as const,
			color: "error.main",
			mt: 0.5,
		},
		caption: {
			variant: "caption" as const,
			color: "text.secondary",
		},
	};

	const style = role ? roleStyles[role] : {};

	return (
		<Typography
			{...style} //デフォルト設定
			{...props} //手動で上書き可能
			sx={{ ...style, ...sx }} //sxプロパティ
		>
			{children}
		</Typography>
	);
};
