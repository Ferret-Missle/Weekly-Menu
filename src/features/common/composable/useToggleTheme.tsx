import { useAtom } from 'jotai';

import { themeMode } from '../../../contexts/themeContext';

export const useToggleTheme = () => {
	const [mode, setMode] = useAtom(themeMode);

	return () => {
		setMode(mode === "light" ? "dark" : "light");
	};
};
