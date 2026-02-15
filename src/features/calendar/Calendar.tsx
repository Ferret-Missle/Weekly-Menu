import Box from "@mui/material/Box";

import { ContentsWrapper } from "../common/views/ContentsWrapper";
import { WeekPeriodBar } from "./views/weekPeriodBar";
import { SavingChangeFAB } from "./views/SavingChangeFAB";
import { CalendarContentsHeader } from "./views/CalendarContentsHeader";
import { CardsList } from "./views/CardsList";

export const Calendar = () => {
	return (
		<ContentsWrapper>
			<CalendarContentsHeader />
			<WeekPeriodBar />
			<Box>//todo: button of move to this week</Box>
			<CardsList />
			<SavingChangeFAB />
		</ContentsWrapper>
	);
};
