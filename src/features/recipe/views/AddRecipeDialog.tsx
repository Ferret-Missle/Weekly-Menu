import DialogContent from "@mui/material/DialogContent";
import Box from "@mui/material/Box";
import Dialog from "@mui/material/Dialog";
import type { Recipe } from "../../../types/types";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { ContentsTypography } from "../../../styles/ContentsTypo";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import { uploadRecipeData } from "../composable/uploadRecipeData";
import { useAtomValue } from "jotai";
import { myInfo } from "../../../contexts/AppUserContext";

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
	const user = useAtomValue(myInfo);

	const [title, setTitle] = useState<string>(
		recipeData === null ? "" : recipeData.title,
	); //レシピタイトル
	const [calories, setCalories] = useState<number | null>(
		recipeData === null ? null : recipeData.calories,
	); //カロリー

	useEffect(() => {
		//レシピデータ取得に応じて更新
		if (recipeData) {
			setTitle(recipeData.title);
			setCalories(recipeData.calories);
		}
	}, [recipeData]);

	const handleClose = () => {
		//ダイアログクローズ時の初期化
		setRecipeData(null);
		setTitle("");
		setCalories(null);
		setOpen(false);
	};

	const handleSubmit = () => {
		//レシピ更新時の処理
		//自分のレシピだけ更新できるように制限付き
		uploadRecipeData(user!.uid, recipeData!, title, calories!);
		handleClose(); //初期化処理
	};

	const isAuthor = () => {
		//著者の場合はtrue
		let isauthor = false;

		if (recipeData === null) {
			isauthor = true;
		} else if (recipeData.authorId === user?.uid) {
			//レシピオーナーと一致の場合は不許可
			isauthor = true;
		}
		return isauthor;
	};
	const isDisabled = () => {
		let isdisabled = true;

		if (!title.trim() && !calories) {
			//入力欄が空欄でなければ許可
			isdisabled = false;
		}

		return isdisabled && !isAuthor();
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
							value={calories !== null ? String(calories) : ""}
							onChange={(e) =>
								setCalories(
									e.target.value === "" ? null : Number(e.target.value),
								)
							}
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
							<Button
								variant="outlined"
								disabled={isDisabled()}
								onClick={handleSubmit}
								sx={{ px: 2 }}
							>
								登録
							</Button>
							<Button onClick={handleClose} sx={{ px: 2 }}>
								<ContentsTypography role="cardcaption">
									やめる
								</ContentsTypography>
							</Button>
						</Stack>
						{}
					</Stack>
				</Box>
			</DialogContent>
		</Dialog>
	);
};;
