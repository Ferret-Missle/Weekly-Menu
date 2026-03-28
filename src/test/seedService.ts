import { db } from "../providers/firebase";
import { doc, writeBatch } from "firebase/firestore";
// import type { WeeklyPlan } from "../types/types";

/**
 * テスト用シードデータの注入
 * @param userId 注入対象のユーザーID
 */
export const seedTestData = async (userId: string) => {
	const batch = writeBatch(db);

	// // 1. レシピデータ10件の作成
	// const recipeIds: string[] = [];
	// for (let i = 1; i <= 10; i++) {
	// 	const id = `test_recipe_${i.toString().padStart(2, "0")}`;
	// 	recipeIds.push(id);

	// 	const recipeRef = doc(db, "recipes", id);
	// 	batch.set(recipeRef, {
	// 		id: id,
	// 		authorId: userId,
	// 		title: `テスト用レシピ ${i}`,
	// 		thumbnailUrl: `https://picsum.photos/seed/${id}/200`,
	// 		ingredients: ["材料1", "材料2"],
	// 		steps: ["工程1", "工程2"],
	// 		isDeleted: false,
	// 	});
	// }

	// 1. レシピリストの定義
	const recipeTitles = [
		"カレー",
		"カレーラーメン",
		"餃子",
		"アジ",
		"ほっけ",
		"鮭",
		"サバ",
		"ブリ",
		"生姜焼き",
		"ハンバーグ",
		"豆腐ハンバーグ",
		"チャーハン",
		"から揚げ",
		"パスタ",
		"お鍋",
		"パンケーキ",
		"外食",
	];
	const recipeIds: string[] = [];

	// 2. バッチ処理による書き込み
	recipeTitles.forEach((title, index) => {
		// IDを test_recipe_01_curry のような形式で生成（デバッグしやすいため）
		const id = `test_recipes_${(index + 1).toString().padStart(2, "0")}`;
		recipeIds.push(id);

		const recipeRef = doc(db, "recipes", id);

		batch.set(recipeRef, {
			id: id,
			authorId: userId,
			title: title,
			// サムネイルもタイトルに基づいてシードを変更し、重複を避ける
			thumbnailUrl: `https://picsum.photos/seed/${encodeURIComponent(title)}/200`,
			ingredients: [`${title}の材料A`, `${title}の材料B`],
			steps: [`${title}を作る工程1`, `${title}を盛り付ける工程2`],
			isDeleted: false,
			createdAt: new Date(), // ソート用に作成日時を追加
		});
	});

	// // 2. 7週間分（49日間）の献立作成
	// const startDate = new Date("2026-04-05"); // 基準日（月曜日）

	// for (let w = 0; w < 7; w++) {
	// 	const weekStartDate = new Date(startDate);
	// 	weekStartDate.setDate(startDate.getDate() + w * 7);
	// 	const weekId = weekStartDate.toISOString().split("T")[0];

	// 	const planId = `${userId}_${weekId}`;
	// 	const planRef = doc(db, "weeklyPlans", planId);

	// 	const schedule: WeeklyPlan["schedule"] = {};
	// 	for (let d = 0; d < 7; d++) {
	// 		const current = new Date(weekStartDate);
	// 		current.setDate(weekStartDate.getDate() + d);
	// 		const dateStr = current.toISOString().split("T")[0];

	// 		// ランダムにレシピを割り当て
	// 		schedule[dateStr] = {
	// 			breakfast: {
	// 				recipeId: recipeIds[Math.floor(Math.random() * 10)],
	// 				servings: 2,
	// 			},
	// 			lunch: {
	// 				recipeId: recipeIds[Math.floor(Math.random() * 10)],
	// 				servings: 1,
	// 			},
	// 			dinner: {
	// 				recipeId: recipeIds[Math.floor(Math.random() * 10)],
	// 				servings: 2,
	// 			},
	// 		};
	// 	}

	// 	batch.set(planRef, {
	// 		authorId: userId,
	// 		schedule: schedule,
	// 	});
	// }

	try {
		await batch.commit();
		// console.log("7週間分のシードデータ注入に成功しました。");
	} catch (error) {
		console.error("シード注入失敗:", error);
	}
};;
