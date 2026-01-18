import { onAuthStateChanged } from 'firebase/auth';
import { atom, useSetAtom } from 'jotai';
import { useEffect } from 'react';

import { auth } from '../providers/firebase';

import type { FirebaseUserType } from "../types/types";

export const firebaseUser = atom<FirebaseUserType>(undefined);
export const useAuthStateListener = () => {
	const setUser = useSetAtom(firebaseUser);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
		});
		return unsubscribe;
	}, [setUser]);
};
