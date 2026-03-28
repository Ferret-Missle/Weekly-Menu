import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { saveButtonFlg } from "../../../contexts/calendarActiveFlg";
import { planContext } from "../../../contexts/plansContext";
import type { mealType } from "../../../types/types";
import { formatLocalYYYYMMDD, getMonday } from "./showDateString";
import { myInfo, ownerInfo } from "../../../contexts/AppUserContext";

export function useFixPlansContext() {
	const user = useAtomValue(myInfo);
	const owner = useAtomValue(ownerInfo);
	const [, setPlans] = useAtom(planContext);
	const setIsDisabled = useSetAtom(saveButtonFlg);

	let uid;
	if (user?.displayPlan === "user") {
		uid = user?.uid ?? "";
	} else {
		uid = owner?.uid ?? "";
	}

	return (date: Date, mealType: mealType, recipe: string, servings: number) => {
		if (!uid) return; //uidが不正な場合

		//日付と食事タイプ、選択したレシピ、人数を受け取り、plansを更新
		setPlans((prev) => {
			const base = prev ?? {
				//plansレイヤのデータをコピー
				id: uid + "_" + formatLocalYYYYMMDD(getMonday(date)),
				authorId: uid,
				schedule: {},
			};
			const dayKey = formatLocalYYYYMMDD(date); //yyyy-mm-ddの形に成形
			const schedule = { ...(base.schedule ?? {}) };
			const day = { ...(schedule[dayKey] ?? {}) };

			day[mealType] = { recipeId: recipe, servings: servings }; //引数の値をセット
			schedule[dayKey] = day; //日付にデータをセット

			//保存ボタン有効化フラグをONにする
			setIsDisabled(true);
			// console.log("updated Plans: ", { ...base, schedule });
			return { ...base, schedule };
		});
	};
}
