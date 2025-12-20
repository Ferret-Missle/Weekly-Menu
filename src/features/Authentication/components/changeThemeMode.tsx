import DarkModeOutlinedIcon from '@mui/icons-material/DarkModeOutlined';
import IconButton from '@mui/material/IconButton';

export const themeIcon = (themeMode: string) => {
	const switchTheme = (themeMode: string) =>
		(themeMode = themeMode === "light" ? "dark" : "light");

	return (
		<IconButton onClick={() => switchTheme(themeMode)}>
			<DarkModeOutlinedIcon />
		</IconButton>
	);
};
