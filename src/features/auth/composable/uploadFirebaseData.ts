import { db } from "../../../providers/firebase";
import { doc, updateDoc } from "firebase/firestore";

export const uploadDisplayPlan = async (value: string, userId: string) => {
	//コレクション、ドキュメント、カラムを指定して指定データで更新

	const userRef = doc(db, "users", userId);

	// console.log("value secondtime: ", value);
	try {
		await updateDoc(userRef, { displayPlan: value });
		// console.log("displayPlan on Firestore updated to: ", value);
	} catch (error) {
		console.error("Failed to update displayPlan: ", error);
	}
};;
