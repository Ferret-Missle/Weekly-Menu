import { atom } from 'jotai';

export type AppUser = {
	userId: string | null;
	displayName: string | null;
	currentGroupId: string | null;
	role: "owner" | "member" | null;
};
export const appUser = atom<AppUser>({
	userId: null,
	displayName: null,
	currentGroupId: null,
	role: null,
});
