import { useAtomValue } from "jotai";
import { recipeContext } from "../../../contexts/recipesContext";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { ContentsTypography } from "../../../styles/ContentsTypo";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
export const RecipeCardList = () => {
	const recipes = useAtomValue(recipeContext);

	return (
		<>
			{recipes.map((recipe) => {
				const title = recipe.title;
				const calories = recipe.calories
					? `${recipe.calories} kcal (一人分)`
					: "カロリー情報 未登録";
				return <RecipeCard recipeName={title} calories={`${calories} `} />;
			})}
		</>
	);
};

const RecipeCard = ({
	recipeName,
	calories,
}: {
	recipeName: string;
	calories: string;
}) => {
	return (
		<Button sx={{ margin: 0, padding: 0 }}>
			<Paper sx={{ p: 3, borderRadius: 4, width: "100%" }}>
				<Stack direction={"row"} spacing={3}>
					<Skeleton
						variant="rectangular"
						width={100}
						height={100}
						animation={false}
					/>
					<Box>
						<ContentsTypography role="cardsection" textAlign={"left"}>
							{recipeName}
						</ContentsTypography>
						<ContentsTypography role="period" textAlign={"left"}>
							{calories}
						</ContentsTypography>
					</Box>
				</Stack>
			</Paper>
		</Button>
	);
};
