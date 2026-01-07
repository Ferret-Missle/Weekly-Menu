import { onAuthStateChanged } from 'firebase/auth';
import { atom, useSetAtom } from 'jotai';
import { useEffect } from 'react';

import { auth } from '../providers/firebase';

import type { User } from "firebase/auth";
//未ログインはnull、初期状態がundefined
export const firebaseUser = atom<User | null | undefined>(undefined);
export const useAuthStateListener = () => {
	const setUser = useSetAtom(firebaseUser);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (user) => {
			if (user) {
				setUser(user);
			} else {
				setUser(null);
			}
			console.log("user: ", firebaseUser);
		});
		return unsubscribe;
	}, [setUser]);
};
