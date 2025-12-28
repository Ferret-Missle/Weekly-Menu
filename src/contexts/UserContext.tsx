import type { User } from "firebase/auth";
import { createContext, useContext } from 'react';

export type AppUser = {
	firebaseUser: User | null;
	displayName: string | null;
	currentGroupId: string | null;
	role: "owner" | "member" | null;
};

const UserContext = createContext<AppUser | null>(null);
export const useAuth = () => useContext(UserContext);
