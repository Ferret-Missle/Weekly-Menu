import type { Timestamp } from "firebase/firestore";
import { atom } from 'jotai';

export type RecipeType = {
	title: string | null;
	ownerId: string | null;
	groupId: string | null;
	calorie: number | null;
	createdAt: Timestamp | null;
	updatedAt: Timestamp | null;
};

export const recipes = atom<RecipeType[]>([]);
