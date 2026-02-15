import { useAtom, useAtomValue } from "jotai";

import { themeMode } from "../../../contexts/themeContext";
import { firebaseUser } from "../../../contexts/FirebaseUserContext";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../../providers/firebase";

export const useToggleTheme = () => {
	const [mode, setMode] = useAtom(themeMode);
	const user = useAtomValue(firebaseUser);

	return async () => {
		const newMode = mode === "light" ? "dark" : "light";
		setMode(newMode);

		if (user?.uid) {
			const userRef = doc(db, "users", user.uid);
			try {
				await updateDoc(userRef, {
					themeMode: newMode,
				});
				console.log(`Firestore: themeModeを ${newMode} に更新しました`);
			} catch (error) {
				console.error("Firestore更新失敗:", error);
			}
		}
	};
};
