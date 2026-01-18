import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";

export const AuthModeSwitch = ({
	signMode,
	handleMode,
}: {
	signMode: string;
	handleMode: () => void;
}) => {
	return (
		<Container
			disableGutters
			sx={{
				display: "flex",
				borderRadius: 3,
				bgcolor: "customBackground.container",
			}}
		>
			<Stack
				direction="row"
				spacing={1}
				sx={{ width: "100%", height: "80%", margin: 0.75, padding: 0 }}
			>
				<AuthModeButton
					caption="signin"
					mode={signMode}
					handleMode={handleMode}
				/>
				<AuthModeButton
					caption="signup"
					mode={signMode}
					handleMode={handleMode}
				/>
			</Stack>
		</Container>
	);
};

const AuthModeButton = ({
	caption,
	mode,
	handleMode,
}: {
	caption: string;
	mode: string;
	handleMode: () => void;
}) => (
	<Button
		variant="contained"
		fullWidth
		disableElevation={caption === mode ? false : true}
		sx={{
			pointerEvents: caption === mode ? "none" : "auto",
			borderRadius: 2,
			bgcolor:
				caption === mode
					? "customBackground.button"
					: "customBackground.container",
			color: "text.primary",
		}}
		onClick={handleMode}
	>
		{caption === "signin" ? "ログイン" : "新規登録"}
	</Button>
);
