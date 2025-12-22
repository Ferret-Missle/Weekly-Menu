import { useContext } from 'react';

import Button from '@mui/material/Button';

import { ModeContext } from '../../../contexts/ModeContext';

export const AuthModeButton: React.FC<{
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

//
