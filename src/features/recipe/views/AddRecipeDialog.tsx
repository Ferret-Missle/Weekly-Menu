import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import type { Recipe } from "../../../types/types";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { ContentsTypography } from "../../../styles/ContentsTypo";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";

export const AddRecipeDialog = ({
	isOpen,
	setOpen,
	recipeData,
	setRecipeData,
}: {
	isOpen: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	recipeData: Recipe | null;
	setRecipeData: React.Dispatch<React.SetStateAction<Recipe | null>>;
}) => {
	console.log("diag get recipe", recipeData);
	console.log("recipe.title= ", recipeData?.title);
	const [title, setTitle] = useState<string>(
		recipeData === null ? "" : recipeData.title,
	); //レシピタイトル
	const [calories, setCalories] = useState<number | null>(
		recipeData === null ? null : recipeData.calories,
	); //カロリー

	useEffect(() => {
		if (recipeData) {
			setTitle(recipeData.title);
			setCalories(recipeData.calories);
		}
	}, [recipeData]);

	const handleClose = () => {
		setRecipeData(null);
		setTitle("");
		setCalories(null);
		setOpen(false);
	};

	return (
		<Dialog open={isOpen} onClose={handleClose}>
			<DialogContent>
				<Box component="form" onSubmit={() => null}>
					<Stack spacing={4} bgcolor={"customBackground.paper"}>
						<ContentsTypography role="header">
							レシピ簡易変更画面
						</ContentsTypography>
						<TextField
							required
							fullWidth
							size="small"
							label="レシピ名"
							type="text"
							autoFocus
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							sx={{
								color: "black",
								"& .MuiInputLabel-root": {
									//label文字色
									color: "text.primary",
								},
								"& .MuiInputBase-input": {
									//入力文字列
									color: "text.primary",
								},
								"& .MuiOutlinedInput-root": {
									borderRadius: 2,
									backgroundColor: "customBackground.button",
								},
							}}
						/>
						<TextField
							required
							fullWidth
							size="small"
							label="カロリー (kcal 1人分)"
							type="number"
							autoFocus
							value={calories}
							onChange={(e) => setCalories(Number(e.target.value))}
							sx={{
								color: "black",
								"& .MuiInputLabel-root": {
									//label文字色
									color: "text.primary",
								},
								"& .MuiInputBase-input": {
									//入力文字列
									color: "text.primary",
								},
								"& .MuiOutlinedInput-root": {
									borderRadius: 2,
									backgroundColor: "customBackground.button",
								},
							}}
						/>
						<Stack direction={"row"} spacing={1} justifyContent={"right"}>
							<Button variant="outlined" onClick={handleClose} sx={{ px: 2 }}>
								登録
							</Button>
							<Button onClick={handleClose} sx={{ px: 2 }}>
								<ContentsTypography role="cardcaption">
									やめる
								</ContentsTypography>
							</Button>
						</Stack>
					</Stack>
				</Box>
			</DialogContent>
		</Dialog>
	);
};
