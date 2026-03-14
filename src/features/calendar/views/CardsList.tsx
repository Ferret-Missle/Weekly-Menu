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
import { recipeContext } from "../../../contexts/recipesContext";
import { useState } from "react";
import { planContext } from "../../../contexts/plansContext";

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
			<RecipeSelector type="breakfast" date={date} />
			<RecipeSelector type="lunch" date={date} />
			<RecipeSelector type="dinner" date={date} />
			<Divider />
		</Paper>
	);
};

const RecipeSelector = ({ type, date }: { type: mealType; date: Date }) => {
	const recipes = useAtomValue(recipeContext);
	const plans = useAtomValue(planContext);
	console.log("plans= ", plans);
	console.log("recipes= ", recipes);

	const initRecipe =
		plans?.schedule?.[date.toISOString().split("T")[0]]?.[type]?.recipeId;
	const initServings =
		plans?.schedule?.[date.toISOString().split("T")[0]]?.[type]?.servings;

	const [recipeId, setRecipeId] = useState<string>(initRecipe || "");
	const [servings, setServings] = useState<number>(initServings || 1);

	console.log("recipeId: ", recipeId);
	console.log("servings: ", servings);

	return (
		<>
			<CalendarTypography role="cardsection">
				{showMealType(type)}
			</CalendarTypography>
			<Stack spacing={1} direction="row" sx={{ mb: 3 }}>
				<FormControl size="small" sx={{ flexGrow: 1 }}>
					<Select
						value={recipeId}
						onChange={(e) => setRecipeId(e.target.value)}
						sx={{
							borderRadius: 2,
							color: "text.primary",
							backgroundColor: "background.default",
							"&:after": { borderBottomColor: "#FF7043" },
						}}
					>
						{recipes.map((recipe) => (
							<MenuItem value={recipe.id}>{recipe.title}</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl size="small" sx={{ minWidth: "70px", width: "auto" }}>
					<Select
						value={servings}
						onChange={(e) => setServings(e.target.value)}
						sx={{
							borderRadius: 2,
							color: "text.primary",
							backgroundColor: "background.default",
							"&:after": { borderBottomColor: "#FF7043" },
						}}
					>
						<MenuItem value={1}>1人分</MenuItem>
						<MenuItem value={2}>2人分</MenuItem>
						<MenuItem value={3}>3人分</MenuItem>
						<MenuItem value={4}>4人分</MenuItem>
						<MenuItem value={5}>5人分</MenuItem>
					</Select>
				</FormControl>
			</Stack>
		</>
	);
};
