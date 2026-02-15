import Paper from "@mui/material/Paper";
import { CalendarTypography } from "../../../styles/CalendarTypo";
import type { mealType } from "../../../types/types";
import { showMealType } from "../composable/showMealType";

export const CardsList = () => {
	return (
		<>
			<DayCard date="2026-02-16" />
		</>
	);
};

const DayCard = ({ date }: { date: string }) => {
	return (
		<Paper sx={{ p: 3, borderRadius: 4 }}>
			<CalendarTypography role="cardtitle" sx={{ mb: 4 }}>
				{date}
			</CalendarTypography>
			<RecipeSelector type="morning" />
			<RecipeSelector type="lunch" />
			<RecipeSelector type="dinner" />
		</Paper>
	);
};
const RecipeSelector = ({ type }: { type: mealType }) => {
	return (
		<CalendarTypography role="main" sx={{ mb: 4 }}>
			{showMealType(type)}
		</CalendarTypography>
	);
};
