import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";

import googleIcon from "../../../../assets/google.svg";
import { AuthTypo } from "../../composable/AuthTypo";

export const AuthWithGoogle = ({ mode }: { mode: string }) => {
	return (
		<Stack spacing={1} sx={{ alignItems: "center", width: "auto" }}>
			<IconButton sx={{ bgcolor: "white", border: "0.5px solid" }}>
				<img src={googleIcon} alt="Google Icon" />
			</IconButton>
			<AuthTypo role="text">
				{mode === "signin" ? "Googleでログイン" : "Googleで新規登録"}
			</AuthTypo>
		</Stack>
	);
};
