import { ContentsWrapper } from "../common/views/ContentsWrapper";
import { AddRecipeFAB } from "./views/AddRecipeFAB";
import { RecipeCardList } from "./views/RecipeCardList";

export const Recipe = () => {
	return (
		<ContentsWrapper>
			<RecipeCardList />
			<AddRecipeFAB />
		</ContentsWrapper>
	);
};
