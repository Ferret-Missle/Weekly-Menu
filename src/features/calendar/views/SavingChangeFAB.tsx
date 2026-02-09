import Fab from "@mui/material/Fab";
import SaveIcon from "@mui/icons-material/Save";
export const SavingChangeFAB = () => {
	return (
		<Fab
			color="primary"
			variant="extended"
			sx={{
				position: "fixed",
				bottom: 74,
				right: { xs: 24, md: 32 },
				borderRadius: 3,
				boxShadow: 3,
				backgroundColor: "icon.active",
				color: "white",
				"@media (hover: hover)": {
					"&:hover": {
						backgroundColor: "icon.hoverBgcolor",
						color: "icon.hoverColor",
					},
				},
				"&:active": { transform: "scale(0.95)" }, // フィードバックを強調
			}}
		>
			<SaveIcon sx={{ mr: 1 }} />
			保存
		</Fab>
	);
};
