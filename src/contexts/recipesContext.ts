import { atom } from "jotai";
import type { Recipe } from "../types/types";

export const recipeContext = atom<Recipe[]>([]);
