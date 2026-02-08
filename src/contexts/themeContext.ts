import { atom } from "jotai";

import type { PaletteMode } from "@mui/material";

export const themeMode = atom<PaletteMode>("light");
