import { useState } from "react";
import { ContentsWrapper } from "../common/views/ContentsWrapper";
import { AddRecipeFAB } from "./views/AddRecipeFAB";
import { RecipeCardList } from "./views/RecipeCardList";
import { AddRecipeDialog } from "./views/AddRecipeDialog";
import type { Recipe } from "../../types/types";

export const Recipes = () => {
	const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
	const [recipeData, setRecipeData] = useState<Recipe | null>(null);

	return (
		<ContentsWrapper>
			<RecipeCardList setOpen={setIsOpenDialog} setRecipeData={setRecipeData} />
			<AddRecipeFAB setOpen={setIsOpenDialog} setRecipeData={setRecipeData} />
			<AddRecipeDialog
				isOpen={isOpenDialog}
				setOpen={setIsOpenDialog}
				recipeData={recipeData}
				setRecipeData={setRecipeData}
			/>
		</ContentsWrapper>
	);
};
