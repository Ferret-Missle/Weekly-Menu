import AddIcon from "@mui/icons-material/Add";
import Fab from "@mui/material/Fab";
import { ContentsTypography } from "../../../styles/ContentsTypo";

export const AddRecipeFAB = () => {
	return (
		<>
			<Fab
				color="primary"
				variant="extended"
				sx={{
					position: "fixed",
					bottom: 74,
					right: { xs: 24, md: 32 },
					margin: 0,
					padding: 2,
					boxShadow: 4,
					borderRadius: 3,
					backgroundColor: "icon.active",
					color: "white",
					"&.Mui-disabled": {
						color: "gray",
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
				<AddIcon sx={{ marginRight: 0.5 }} />
				<ContentsTypography role="button">レシピを追加</ContentsTypography>
			</Fab>
		</>
	);
};
