import { createContext } from 'react';

import type { PaletteMode } from "@mui/material";

type ModeContextType = {
	toggleColorMode: () => void;
	mode: PaletteMode;
};

export const ModeContext = createContext<ModeContextType | undefined>(
	undefined
);