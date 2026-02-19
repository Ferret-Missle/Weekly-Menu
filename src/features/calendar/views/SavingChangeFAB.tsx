import Fab from "@mui/material/Fab";
import SaveIcon from "@mui/icons-material/Save";
import { CalendarTypography } from "../../../styles/CalendarTypo";
export const SavingChangeFAB = () => {
	return (
		<Fab
			color="primary"
			variant="extended"
			sx={{
				position: "fixed",
				bottom: 74,
				right: { xs: 24, md: 32 },
				boxShadow: 4,
				borderRadius: 3,
				backgroundColor: "icon.active",
				color: "white",
				"&.Mui-disabled": {
					color: "red",
				},
				"@media (hover: hover)": {
					"&:hover": {
						backgroundColor: "icon.hoverBgcolor",
						color: "icon.hoverColor",
					},
				},
				"&:active": { transform: "scale(0.95)" },
			}}
		>
			<SaveIcon sx={{ mr: 1 }} />
			<CalendarTypography role="button">保存</CalendarTypography>
		</Fab>
	);
};
