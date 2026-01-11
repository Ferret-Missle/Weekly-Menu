import type { TypographyProps } from "@mui/material/Typography";
import Typography from '@mui/material/Typography';

export type ContentsTypographyProps = TypographyProps & {
	role?:
		| "header"
		| "main"
		| "sub"
		| "period"
		| "cardtitle"
		| "maincol"
		| "subcol"
		| "caption";
};

export const ContentsTypography = ({
	role,
	children,
	sx,
	...props
}: ContentsTypographyProps) => {
	const roleStyles = {
		header: { color: "text.primary", fontWeight: "bold", fontSize: "18px" },
		main: { color: "text.primary", fontWeight: "medium", fontSize: "14px" },
		sub: { color: "text.primary", fontWeight: "medium", fontSize: "12px" },
		period: { color: "text.secondary", fontWeight: "medium", fontSize: "14px" },
		cardtitle: { color: "text.primary", fontWeight: "bold", fontSize: "18px" },
		maincol: { color: "text.primary", fontWeight: "bold", fontSize: "30px" },
		subcol: { color: "text.primary", fontWeight: "bold", fontSize: "18px" },
		caption: {
			color: "text.secondary",
			fontWeight: "medium",
			fontSize: "14px",
		},
	};
	const style = role ? roleStyles[role] : {};

	return (
		<Typography {...style} {...props} sx={{ ...style, ...sx }}>
			{children}
		</Typography>
	);
};
