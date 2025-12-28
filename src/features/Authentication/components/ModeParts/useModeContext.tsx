import { useContext } from 'react';

import { ModeContext } from '../../../../contexts/ModeContext';

export const useModeContext = () => {
	const context = useContext(ModeContext);
	if (!context) {
		throw new Error("useModeContext must be used within a ModeContextProvider");
	}
	return context;
};