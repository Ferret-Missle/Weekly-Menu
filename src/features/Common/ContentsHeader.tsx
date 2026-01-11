import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

import { SignoutButton } from './SignoutButton';
import { ThemeModeSwitcher } from './ThemeModeSwitcher';

export const ContetnsHeader = () => {
	return (
		<AppBar
			position="fixed"
			sx={{
				backgroundColor: "background.paper",
				border: "1px solid",
				borderColor: "customBackground.container",
				boxShadow: "none",
			}}
		>
			<Toolbar variant="dense" sx={{ justifyContent: "flex-end" }}>
				<SignoutButton />
				<ThemeModeSwitcher />
			</Toolbar>
		</AppBar>
	);
};
