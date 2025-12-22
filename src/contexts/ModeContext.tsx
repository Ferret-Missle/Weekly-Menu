import { createContext } from 'react';

import type { PaletteMode } from "@mui/material";

interface ModeContextType {
	toggleColorMode: () => void;
	mode: PaletteMode;
}

export const ModeContext = createContext<ModeContextType | undefined>(
	undefined
);
