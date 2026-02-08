import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import type { ReactNode } from "react";
import { CalendarTypography } from "../../../styles/CalendarTypo";

export const WeekPeriodBar = () => {
	return (
		<Box display="flex" alignItems="center">
			<ButtonWrapper>
				<ArrowBackIosNewIcon fontSize="small" />
			</ButtonWrapper>
			<Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
				<CalendarTypography role="period">2026/2/2 - 2/8</CalendarTypography>
			</Box>
			<ButtonWrapper>
				<ArrowForwardIosIcon fontSize="small" />
			</ButtonWrapper>
		</Box>
	);
};

const ButtonWrapper = ({ children }: { children: ReactNode }) => {
	return (
		<IconButton
			sx={{
				border: "1px solid",
				borderColor: "darkgray",
				borderRadius: 2,
				"@media (hover: hover)": {
					"&:hover": {
						backgroundColor: "icon.hoverBgcolor",
						color: "icon.hoverColor",
					},
				},
			}}
		>
			{children}
		</IconButton>
	);
};
