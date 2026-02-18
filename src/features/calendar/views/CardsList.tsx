import Paper from "@mui/material/Paper";
import { CalendarTypography } from "../../../styles/CalendarTypo";
import type { mealType } from "../../../types/types";
import { showMealType } from "../composable/showMealType";
import { getMonday, showDateString } from "../composable/showDateString";
import { useAtomValue } from "jotai";
import { dispDate } from "../../../contexts/date";

export const CardsList = () => {
	const date = useAtomValue(dispDate);

	return (
		<>
			{[...Array(7)].map((_, index) => {
				// 基準日（月曜日）に index (0〜6) を足していく
				const currentDay = new Date(getMonday(date));
				currentDay.setDate(getMonday(date).getDate() + index);

				return <DayCard key={index} date={currentDay} />;
			})}
		</>
	);
};

const DayCard = ({ date }: { date: Date }) => {
	return (
		<Paper sx={{ p: 3, borderRadius: 4 }}>
			<CalendarTypography role="cardtitle" sx={{ mb: 4 }}>
				{showDateString(date)}
			</CalendarTypography>
			<RecipeSelector type="morning" />
			<RecipeSelector type="lunch" />
			<RecipeSelector type="dinner" />
		</Paper>
	);
};
const RecipeSelector = ({ type }: { type: mealType }) => {
	return (
		<CalendarTypography role="cardsection" sx={{ mb: 4 }}>
			{showMealType(type)}
		</CalendarTypography>
	);
};
