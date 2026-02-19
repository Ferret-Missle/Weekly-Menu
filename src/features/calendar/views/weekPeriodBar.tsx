import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useEffect, type ReactNode } from "react";
import { CalendarTypography } from "../../../styles/CalendarTypo";
import Button from "@mui/material/Button";
import { useAtom, useSetAtom } from "jotai";
import { dispDate } from "../../../contexts/date";
import { getPeriodString, isDisabled } from "../composable/showDateString";
export const WeekPeriodBar = () => {
	const [date, setDate] = useAtom(dispDate);
	useEffect(() => {
		setDate(new Date()); //とりあえず今日の日付を入れる
	}, [setDate]);

	return (
		<>
			<Box display="flex" alignItems="center">
				<ButtonWrapper direction="prev">
					<ArrowBackIosNewIcon fontSize="small" />
				</ButtonWrapper>
				<Box sx={{ flex: 1, display: "flex", justifyContent: "center" }}>
					<CalendarTypography role="period">
						{getPeriodString(date)}
					</CalendarTypography>
				</Box>
				<ButtonWrapper direction="next">
					<ArrowForwardIosIcon fontSize="small" />
				</ButtonWrapper>
			</Box>
			<Box display="flex" alignItems="center">
				<ThisweekButton />
			</Box>
		</>
	);
};

const ThisweekButton = () => {
	const [date, setDate] = useAtom(dispDate);
	const handleClick = () => {
		const today = new Date();
		setDate(today);
	};

	return (
		<>
			<Button
				variant="contained"
				onClick={handleClick}
				disabled={isDisabled(date)}
				sx={{
					mx: "auto",
					px: 3,
					py: 1,
					boxShadow: 4,
					borderRadius: 3,
					backgroundColor: "icon.active",
					"@media (hover: hover)": {
						"&:hover": {
							backgroundColor: "icon.hoverBgcolor",
						},
					},
					"&:active": { transform: "scale(0.95)" },
				}}
			>
				<CalendarTypography role="button">今週へ移動</CalendarTypography>
			</Button>
		</>
	);
};

const ButtonWrapper = ({
	children,
	direction,
}: {
	children: ReactNode;
	direction: "prev" | "next";
}) => {
	const setDate = useSetAtom(dispDate);
	const handleClick = () => {
		setDate((prev) => {
			const nextDate = new Date(prev);
			const diff = direction === "next" ? 7 : -7;
			nextDate.setDate(prev.getDate() + diff);
			return nextDate;
		});
	};

	return (
		<IconButton
			onClick={handleClick}
			sx={{
				border: "1px solid",
				borderColor: "darkgray",
				borderRadius: 2,
				backgroundColor: "background.paper",
				color: "text.primary",
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
