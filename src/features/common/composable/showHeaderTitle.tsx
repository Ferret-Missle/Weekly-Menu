export const showHeaderTitle = (caption: string|null) => {
	let title: string = "";
	switch (caption) {
		case "calendar":
			title = "献立プラン";
			break;
		case "recipe":
			title = "レシピ一覧";
			break;
		case "list":
			title = "買い物リスト";
			break;
	}

	return title;
};
