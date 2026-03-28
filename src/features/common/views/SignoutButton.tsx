import { signOut } from "firebase/auth";

import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";
import IconButton from "@mui/material/IconButton";

import { auth } from "../../../providers/firebase";

export const SignoutButton = () => {
	return (
		<IconButton onClick={() => signOut(auth)}>
			<LogoutOutlinedIcon
				sx={(theme) => ({
					[theme.breakpoints.up("xs")]: { fontSize: "24px" },
					[theme.breakpoints.up("sm")]: { fontSize: "20px" },
					[theme.breakpoints.up("lg")]: { fontSize: "16px" },
				})}
			/>
		</IconButton>
	);
};
