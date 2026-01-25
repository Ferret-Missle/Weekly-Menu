import Box from "@mui/material/Box";

import { ContentsWrapper } from "../common/views/ContentsWrapper";
import { WeekPeriodBar } from "./views/weekPeriodBar";

export const Calendar = () => {
	return (
		<ContentsWrapper>
			<WeekPeriodBar />
			<Box>//todo: button of move to this week</Box>
			<Box>//todo: card of plans</Box>
		</ContentsWrapper>
	);
};
