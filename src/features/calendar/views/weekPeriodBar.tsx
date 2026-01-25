import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";

export const WeekPeriodBar = () => {
	return (
		<Box>
			<IconButton
				sx={{
					border: "1px solid",
					borderColor: "darkgray",
					borderRadius: 2,
					"&:hover": {
						backgroundColor: "icon.active",
						color: "icon.hoverClr",
					},
				}}
			>
				<ArrowBackIosNewIcon fontSize="small" />
			</IconButton>
		</Box>
	);
};
