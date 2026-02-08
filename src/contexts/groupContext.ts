import { atom } from "jotai";
import type { group } from "../types/types";

export const groupInfo = atom<group | null>(null);
