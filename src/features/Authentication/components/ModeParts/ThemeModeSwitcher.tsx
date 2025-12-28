import Brightness4Icon from "@mui/icons-material/Brightness4";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import IconButton from "@mui/material/IconButton";

import { useModeContext } from "./useModeContext";

export const ThemeModeSwitcher = () => {
	const { mode, toggleColorMode } = useModeContext();

	return (
		<IconButton onClick={toggleColorMode}>
			{mode === "light" ? <Brightness4Icon /> : <Brightness7Icon />}
		</IconButton>
	);
};
