import { useAtomValue } from "jotai";
import { myInfo } from "../../../contexts/AppUserContext";
import { dispDate } from "../../../contexts/date";
import { formatLocalYYYYMMDD, getMonday } from "./showDateString";
import { db } from "../../../providers/firebase";
import { doc, setDoc } from "firebase/firestore";
import { planContext } from "../../../contexts/plansContext";
export const usePlansUpload = () => {
	const uid = useAtomValue(myInfo)?.uid ?? "";
	const date = useAtomValue(dispDate);
	const plans = useAtomValue(planContext);

	const saveAll = async () => {
		if (!uid) throw new Error("not signed in *it's impossible pattern... ");
		if (plans === undefined) return; //plansが空の場合はアップロードしない

		const weekId = formatLocalYYYYMMDD(getMonday(date));
		const planRef = doc(db, "weeklyPlans", `${uid}_${weekId}`);
		const payload = {
			authorId: uid,
			schedule: plans?.schedule,
		};

		await setDoc(planRef, payload); //１週間分を上書き
	};

	return { saveAll };
};
