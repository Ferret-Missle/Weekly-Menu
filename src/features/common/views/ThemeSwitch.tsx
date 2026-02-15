import { useAtomValue } from 'jotai';

import Brightness4OutlinedIcon from '@mui/icons-material/Brightness4Outlined';
import Brightness7OutlinedIcon from '@mui/icons-material/Brightness7Outlined';
import IconButton from '@mui/material/IconButton';

import { themeMode } from '../../../contexts/themeContext';
import { useToggleTheme } from '../composable/useToggleTheme';

export const ThemeSwitch = () => {
	const mode = useAtomValue(themeMode);
	const toggleTheme = useToggleTheme();

	return (
		<IconButton onClick={toggleTheme}>
			{mode === "light" ? (
				<Brightness4OutlinedIcon sx={{ fontSize: "32px" }} />
			) : (
				<Brightness7OutlinedIcon sx={{ fontSize: "32px" }} />
			)}
		</IconButton>
	);
};
