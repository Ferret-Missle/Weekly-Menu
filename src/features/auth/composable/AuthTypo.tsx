import Typography from "@mui/material/Typography";

import type { AuthTypoType } from "../../../types/types";

export const AuthTypo = ({ role, children, sx, ...props }: AuthTypoType) => {
	const roleStyles = {
		title: {
			textAlign: "center",
			fontSize: 24,
			fontWeight: "bold",
			color: "text.primary",
		},
		subtitle: {
			textAlign: "center",
			fontSize: 16,
			fontWeight: "medium",
			color: "text.secondary",
		},
		label: {
			textAlign: "center",
			fontSize: 16,
			fontWeight: "medium",
			color: "text.primary",
		},
		hint: {
			textAlign: "left",
			fontSize: 14,
			fontWeight: "medium",
			color: "text.secondary",
		},
		text: {
			textAlign: "center",
			fontSize: 14,
			fontWeight: "medium",
			color: "text.primary",
		},
	};

	const style = role ? roleStyles[role] : {};

	return (
		<Typography {...style} {...props} sx={{ ...style, ...sx }}>
			{children}
		</Typography>
	);
};
