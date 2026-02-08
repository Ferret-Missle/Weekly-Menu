import { atom } from "jotai";

import type { AppUser } from "../types/types";

export const myInfo = atom<AppUser | null>(null);
export const ownerInfo = atom<AppUser | null>(null);
