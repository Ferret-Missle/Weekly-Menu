import { atom } from "jotai";
import type { WeeklyPlan } from "../types/types";

export const planContext = atom<WeeklyPlan | undefined>(undefined);
