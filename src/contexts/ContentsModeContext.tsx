import { atom } from "jotai";

import type { ContentsModeType } from "../types/types";

export const contentsMode = atom<ContentsModeType | null>(null);
