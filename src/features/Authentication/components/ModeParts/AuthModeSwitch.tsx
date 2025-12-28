import { useContext } from 'react';

import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';

import { ModeContext } from '../../../../contexts/ModeContext';

export const AuthModeSwitch: React.FC<{
	mode: string;
	handleMode: () => void;
}> = ({ mode, handleMode }) => {
	const context = useContext(ModeContext);
	console.log("context=", context);

	return (
		<Container
			disableGutters
			sx={{
				display: "flex",
				borderRadius: 3,
				bgcolor:
					typeof context?.mode === "string" && context.mode === "light"
						? "customBackground.container"
						: "background.default",
			}}
		>
			<Stack
				direction="row"
				spacing={1}
				sx={{ width: "100%", height: "80%", margin: 0.75, padding: 0 }}
			>
				<AuthModeButton
					caption={"signin"}
					mode={mode}
					handleMode={handleMode}
				/>
				<AuthModeButton
					caption={"signup"}
					mode={mode}
					handleMode={handleMode}
				/>
			</Stack>
		</Container>
	);
};

const AuthModeButton: React.FC<{
	caption: string;
	mode: string;
	handleMode: () => void;
}> = ({ caption, mode, handleMode }) => {
	const context = useContext(ModeContext);

	return (
		<Button
			variant="contained"
			fullWidth
			disableElevation={caption === mode ? false : true}
			sx={{
				PointerEvent: caption === mode ? "none" : "auto",
				borderRadius: 2,
				bgcolor:
					caption === mode
						? typeof context?.mode === "string" && context.mode === "light"
							? "background.default"
							: "customBackground.container"
						: typeof context?.mode === "string" && context.mode === "light"
						? "customBackground.container"
						: "background.default",
				color: "text.primary",
			}}
			onClick={handleMode}
		>
			{caption === "signin" ? "ログイン" : "新規登録"}
		</Button>
	);
};
