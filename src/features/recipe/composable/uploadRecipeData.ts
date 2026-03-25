import { doc, setDoc } from "firebase/firestore";
import type { Recipe } from "../../../types/types";
import { db } from "../../../providers/firebase";
import { getJSTTimestamp } from "../../calendar/composable/showDateString";
import { v4 as uuidv4 } from "uuid";

export const uploadRecipeData = async (
	uid: string,
	recipe: Recipe,
	title: string,
	calories: number,
) => {
	console.log("updateRecipe start");
	const recipeId = recipe ? recipe.id : uuidv4();
	const ref = doc(db, "recipes", recipeId);

	const newRecipe: Recipe = recipe
		? {
				...recipe,
				title: title,
				calories: calories,
				updatedAt: getJSTTimestamp(),
			}
		: {
				id: recipeId,
				authorId: uid,
				title: title,
				calories: calories,
				thumbnailUrl: "",
				ingredients: [],
				steps: [],
				createdAt: getJSTTimestamp(),
				updatedAt: null,
			};

	try {
		if (recipe) {
			await setDoc(ref, newRecipe);
		}
		console.log("recipe on Firestore updated to: ", newRecipe);
	} catch (error) {
		console.error("failed to update recipeData: ", error);
	}
};
