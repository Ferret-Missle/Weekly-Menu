import { useAtomValue } from "jotai";
import { useState } from "react";
import { Navigate } from "react-router-dom";

import Divider from "@mui/material/Divider";

import { firebaseUser } from "../../contexts/FirebaseUserContext";
import { AuthTypo } from "../../styles/AuthTypo";
import { AuthWrapper } from "./views/AuthWrapper";
import { AuthModeSwitch } from "./views/Parts/AuthModeSwitch";
import { AuthWithGoogle } from "./views/Parts/AuthWithGoogle";
import { SigninForm } from "./views/SigninForm";
import { SignupForm } from "./views/SignupForm";

import type { AuthMode } from "../../types/types";
export const Auth = () => {
	const user = useAtomValue(firebaseUser);
	const [mode, setMode] = useState<AuthMode>("signin");

	return (
		<AuthWrapper>
			{user ? (
				<Navigate to="/calendar" />
			) : (
				<>
					<AuthTypo role="title">献立スケジュール</AuthTypo>
					<AuthTypo role="subtitle">週間献立プランとレシピを管理</AuthTypo>
					<AuthModeSwitch
						signMode={mode}
						handleMode={() => setMode(mode === "signin" ? "signup" : "signin")}
					/>
					{mode === "signin" ? <SigninForm /> : <SignupForm />}
					<Divider>
						<AuthTypo role="text">or</AuthTypo>
					</Divider>
					<AuthWithGoogle mode={mode} />
				</>
			)}
		</AuthWrapper>
	);
};
