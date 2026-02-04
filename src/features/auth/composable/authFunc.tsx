import { doc, setDoc } from "firebase/firestore";

import { db } from "../../../providers/firebase";

import type { AppUser } from "../../../types/types";
export const createUserData = async (userData: AppUser) => {
	await setDoc(doc(db, "users", userData.uid), userData);
};
