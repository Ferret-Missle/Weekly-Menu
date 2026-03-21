import Paper from "@mui/material/Paper";
import { ContentsTypography } from "../../../styles/ContentsTypo";
import type { mealType } from "../../../types/types";
import { showMealType } from "../composable/showMealType";
import {
	formatLocalYYYYMMDD,
	getMonday,
	showDateString,
} from "../composable/showDateString";
import { useAtomValue } from "jotai";
import { dispDate } from "../../../contexts/date";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import { recipeContext } from "../../../contexts/recipesContext";
import { useEffect, useState } from "react";
import { planContext } from "../../../contexts/plansContext";
import { useFixPlansContext } from "../composable/useFixPlansContext";

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
			<ContentsTypography role="cardtitle" sx={{ mb: 4 }}>
				{showDateString(date)}
			</ContentsTypography>
			<RecipeSelector type="breakfast" date={date} />
			<RecipeSelector type="lunch" date={date} />
			<RecipeSelector type="dinner" date={date} />
			<Divider />
		</Paper>
	);
};

const RecipeSelector = ({ type, date }: { type: mealType; date: Date }) => {
	const recipes = useAtomValue(recipeContext); //レシピ一覧
	const plans = useAtomValue(planContext); //週間プランデータ
	useEffect(() => {
		//plansの変更を監視
		const newRecipe =
			plans?.schedule?.[formatLocalYYYYMMDD(date)]?.[type]?.recipeId;
		const newServings =
			plans?.schedule?.[formatLocalYYYYMMDD(date)]?.[type]?.servings;
		setRecipeId(newRecipe || "");
		setServings(newServings || 1);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [date, plans]);

	//初期表示値の設定‘
	const initRecipe =
		plans?.schedule?.[formatLocalYYYYMMDD(date)]?.[type]?.recipeId;
	const initServings =
		plans?.schedule?.[formatLocalYYYYMMDD(date)]?.[type]?.servings;

	const [recipeId, setRecipeId] = useState<string>(initRecipe || ""); //選択したレシピステート
	const [servings, setServings] = useState<number>(initServings || 1); //選択した人数ステート

	const fixPlans = useFixPlansContext(); //plansコンテキスト更新関数

	return (
		<>
			<ContentsTypography role="cardsection">
				{showMealType(type)}
			</ContentsTypography>
			<Stack spacing={1} direction="row" sx={{ mb: 3 }}>
				<FormControl size="small" sx={{ flexGrow: 1 }}>
					<Select
						value={recipeId}
						onChange={(e) => {
							setRecipeId(e.target.value);
							fixPlans(date, type, e.target.value, servings);
						}}
						sx={{
							borderRadius: 2,
							color: "text.primary",
							backgroundColor: "background.default",
							"&:after": { borderBottomColor: "#FF7043" },
						}}
					>
						<MenuItem value={""}>未選択</MenuItem>
						{recipes.map((recipe) => (
							<MenuItem value={recipe.id}>{recipe.title}</MenuItem>
						))}
					</Select>
				</FormControl>
				<FormControl size="small" sx={{ minWidth: "70px", width: "auto" }}>
					<Select
						value={servings}
						onChange={(e) => {
							setServings(e.target.value);
							fixPlans(date, type, recipeId, e.target.value);
						}}
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
