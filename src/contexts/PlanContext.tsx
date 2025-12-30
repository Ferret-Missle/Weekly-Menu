import type { Timestamp } from "firebase/firestore";
import { atom } from 'jotai';

export type PlanType = {
	date: string | null;
	breakfast: string | null;
	lunch: string | null;
	dinner: string | null;
	updatedAt: Timestamp | null;
};

export const plans = atom<PlanType[]>([]);
