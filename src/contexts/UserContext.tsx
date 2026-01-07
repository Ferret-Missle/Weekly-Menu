import { onAuthStateChanged } from 'firebase/auth';
import { atom, useSetAtom } from 'jotai';
import { useEffect } from 'react';

import { auth } from '../providers/firebase';

export type AppUser = {
	userId: string | null;
	displayName: string | null;
	currentGroupId: string | null;
	role: "owner" | "member" | null;
};
export const user = atom<AppUser>({
	userId: null,
	displayName: null,
	currentGroupId: null,
	role: null,
});

export const useAuthStateListener = () => {
	const setUser = useSetAtom(user);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
			if (firebaseUser) {
				const newUser = {
					userId: firebaseUser.uid,
					displayName: null,
					currentGroupId: null,
					role: null,
				};
				console.log("setting user: ", newUser);
				setUser(newUser);
			} else {
				const newUser = {
					userId: null,
					displayName: null,
					currentGroupId: null,
					role: null,
				};
				console.log("setting user: ", newUser);
				setUser(newUser);
			}
		});
		return unsubscribe;
	}, [setUser]);
};
