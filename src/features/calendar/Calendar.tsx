import Box from "@mui/material/Box";

import { ContentsWrapper } from "../common/views/ContentsWrapper";
import { WeekPeriodBar } from "./views/weekPeriodBar";
import { SavingChangeFAB } from "./views/SavingChangeFAB";

export const Calendar = () => {
	return (
		<ContentsWrapper>
			{/* <CalendarContentsHeader /> */}
			<WeekPeriodBar />
			<Box>//todo: button of move to this week</Box>
			<Box sx={{ height: "2000px" }}>//todo: card of plans</Box>
			<SavingChangeFAB />
		</ContentsWrapper>
	);
};
