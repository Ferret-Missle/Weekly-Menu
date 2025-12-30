import type { User } from "firebase/auth";
import { atom } from 'jotai';

export type AppUser = {
	firebaseUser: User | null;
	displayName: string | null;
	currentGroupId: string | null;
	role: "owner" | "member" | null;
};

export const user = atom<AppUser | null>(null);