import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../providers/firebase";
import type { AppUser } from "../../../types/types";

export const canMemberEditPlanUpdate = (user: AppUser, newValue: boolean) => {
	const ref = doc(db, "users", user?.uid);
	const newUser: AppUser = {
		...user,
		canMemberEditPlan: newValue,
	};

	try {
		setDoc(ref, newUser);
	} catch (error) {
		console.error("failed to update canMemberEditPlan: ", error);
	}
};

export const isRecipeSharedUpdate = (user: AppUser, newValue: boolean) => {
	const ref = doc(db, "users", user?.uid);
	const newUser: AppUser = {
		...user,
		isRecipeShared: newValue,
	};

	try {
		setDoc(ref, newUser);
	} catch (error) {
		console.error("failed to update isRecipeShared: ", error);
	}
};
