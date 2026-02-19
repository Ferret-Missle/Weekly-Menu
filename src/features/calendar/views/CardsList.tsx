import Paper from "@mui/material/Paper";
import { CalendarTypography } from "../../../styles/CalendarTypo";
import type { mealType } from "../../../types/types";
import { showMealType } from "../composable/showMealType";
import { getMonday, showDateString } from "../composable/showDateString";
import { useAtomValue } from "jotai";
import { dispDate } from "../../../contexts/date";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
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
			<Divider />
		</Paper>
	);
};
const RecipeSelector = ({ type }: { type: mealType }) => {
	return (
		<>
			<CalendarTypography role="cardsection">
				{showMealType(type)}
			</CalendarTypography>
			<Stack spacing={1} direction="row" sx={{ mb: 3 }}>
				<FormControl size="small" sx={{ flexGrow: 1 }}>
					<Select
						sx={{
							borderRadius: 2,
							color: "text.primary",
							backgroundColor: "background.default",
							"&:after": { borderBottomColor: "#FF7043" },
						}}
					>
						<MenuItem>test1</MenuItem>
						<MenuItem>test2</MenuItem>
					</Select>
				</FormControl>
				<FormControl size="small" sx={{ minWidth: "70px", width: "auto" }}>
					<Select
						sx={{
							borderRadius: 2,
							color: "text.primary",
							backgroundColor: "background.default",
							"&:after": { borderBottomColor: "#FF7043" },
						}}
					>
						<MenuItem>1人分</MenuItem>
						<MenuItem>2人分</MenuItem>
						<MenuItem>3人分</MenuItem>
						<MenuItem>4人分</MenuItem>
						<MenuItem>5人分</MenuItem>
					</Select>
				</FormControl>
			</Stack>
		</>
	);
};
