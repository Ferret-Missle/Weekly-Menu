import { useAtomValue } from "jotai";
import { recipeContext } from "../../../contexts/recipesContext";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { ContentsTypography } from "../../../styles/ContentsTypo";
import Stack from "@mui/material/Stack";
import Skeleton from "@mui/material/Skeleton";
import Button from "@mui/material/Button";
import type { Recipe } from "../../../types/types";

export const RecipeCardList = ({
	setOpen,
	setRecipeData,
}: {
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setRecipeData: React.Dispatch<React.SetStateAction<Recipe | null>>;
}) => {
	const recipes = useAtomValue(recipeContext);

	return (
		<>
			{recipes.map((recipe) => {
				return (
					<RecipeCard
						key={recipe.id}
						recipe={recipe}
						setOpen={setOpen}
						setRecipeData={setRecipeData}
					/>
				);
			})}
		</>
	);
};

const RecipeCard = ({
	recipe,
	setOpen,
	setRecipeData,
}: {
	recipe: Recipe;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setRecipeData: React.Dispatch<React.SetStateAction<Recipe | null>>;
}) => {
	return (
		<Button
			onClick={() => {
				setRecipeData(recipe);
				setOpen(true);
			}}
			sx={{ margin: 0, padding: 0 }}
		>
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
							{recipe.title}
						</ContentsTypography>
						<ContentsTypography role="period" textAlign={"left"}>
							{recipe.calories
								? `${recipe.calories} kcal (1人分)`
								: "カロリー情報 未登録"}
						</ContentsTypography>
					</Box>
				</Stack>
			</Paper>
		</Button>
	);
};
