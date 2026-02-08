import Typography from "@mui/material/Typography";

import type { ContentsTypoType } from "../types/types";

export const CalendarTypography = ({
	role,
	children,
	sx,
	...props
}: ContentsTypoType) => {
	const roleStyles = {
		header: { color: "text.primary", fontWeight: "bold", fontSize: 18 },
		main: { color: "text.primary", fontWeight: "thin", fontSize: 14 },
		sub: { color: "text.primary", fontWeight: "thin", fontSize: 12 },
		period: { color: "text.secondary", fontWeight: "thin", fontSize: 14 },
		cardtitle: { color: "text.primary", fontWeight: "bold", fontSize: 18 },
		maincol: { color: "text.primary", fontWeight: "bold", fontSize: 30 },
		subcol: { color: "text.primary", fontWeight: "bold", fontSize: 18 },
		caption: { color: "text.secondary", fontWeight: "thin", fontSize: 14 },
	};
	const style = role ? roleStyles[role] : {};

	return (
		<Typography {...style} {...props} sx={{ ...style, ...sx }}>
			{children}
		</Typography>
	);
};
