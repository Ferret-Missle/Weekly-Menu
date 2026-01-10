import { signOut } from "firebase/auth";

import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import IconButton from "@mui/material/IconButton";

import { auth } from "../../providers/firebase";

export const SignoutButton = () => {
	return (
		<IconButton onClick={() => signOut(auth)}>
			<LogoutOutlinedIcon />
		</IconButton>
	);
};
