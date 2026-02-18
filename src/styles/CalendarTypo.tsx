import Typography from "@mui/material/Typography";

import type { ContentsTypoType } from "../types/types";

export const CalendarTypography = ({
	role,
	children,
	sx,
	...props
}: ContentsTypoType) => {
	const roleStyles = {
		header: { color: "text.primary", fontWeight: "600", fontSize: 20 },
		footer: { color: "text.primary", fontWeight: "400", fontSize: 12 },
		plantab: { color: "text.primary", fontWeight: "400", fontSize: 14 },
		period: { color: "text.secondary", fontWeight: "400", fontSize: 16 },
		button: { color: "white", fontWeight: "400", fontSize: 16 },
		cardtitle: { color: "text.primary", fontWeight: "600", fontSize: 20 },
		cardsection: { color: "text.primary", fontWeight: "500", fontSize: 14 },
		recipetab: { color: "text.primary", fontWeight: "600", fontSize: 14 },
		servingtab: { color: "text.primary", fontWeight: "600", fontSize: 14 },
		cardcaption: { color: "text.primary", fontWeight: "400", fontSize: 14 },
		cardcallory: { color: "text.primary", fontWeight: "700", fontSize: 18 },
	};
	const style = role ? roleStyles[role] : {};

	return (
		<Typography {...style} {...props} sx={{ ...style, ...sx }}>
			{children}
		</Typography>
	);
};
