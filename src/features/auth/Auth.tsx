// import { useAtomValue } from "jotai";
import { useState } from "react";

import Divider from "@mui/material/Divider";

// import { firebaseUser } from "../../contexts/FirebaseUserContext";
import { AuthTypo } from "./composable/AuthTypo";
import { AuthWrapper } from "./views/AuthWrapper";
import { AuthModeSwitch } from "./views/Parts/AuthModeSwitch";
import { AuthWithGoogle } from "./views/Parts/AuthWithGoogle";

import type { AuthMode } from "../../types/types";
export const Auth = () => {
	// const user = useAtomValue(firebaseUser);
	const [mode, setMode] = useState<AuthMode>("signin");

	return (
		<AuthWrapper>
			<>
				<AuthTypo role="title">献立スケジュール</AuthTypo>
				<AuthTypo role="subtitle">週間献立プランとレシピを管理</AuthTypo>
				<AuthModeSwitch
					signMode={mode}
					handleMode={() => setMode(mode === "signin" ? "signup" : "signin")}
				/>
				<Divider>
					<AuthTypo role="text">or</AuthTypo>
				</Divider>
				<AuthWithGoogle mode={mode} />
			</>
		</AuthWrapper>
	);
};
