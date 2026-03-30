import { doc, setDoc } from "firebase/firestore";
import { db } from "../../../providers/firebase";
import type { group } from "../../../types/types";

export const groupNameUpdate = async (group: group, newName: string) => {
	const ref = doc(db, "groups", group.id);
	const newGroup: group = {
		...group,
		groupName: newName,
	};

	try {
		await setDoc(ref, newGroup);
	} catch (error) {
		console.error("failed to update groupName: ", error);
	}
};
