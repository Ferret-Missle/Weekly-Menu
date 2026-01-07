import { useAtomValue } from 'jotai';
import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';

import Divider from '@mui/material/Divider';
import Stack from '@mui/material/Stack';

import { firebaseUser } from '../../contexts/FirebaseUserContext';
import { LoginTypography } from '../../styles/AuthText';
import { AuthWrapper } from './components/AuthWrapper';
import { AuthModeSwitch } from './components/ModeParts/AuthModeSwitch';
import { SigninForm } from './components/SigninForm';
import { SignupForm } from './components/SignupForm';
import { SignWithGoogle } from './components/SignWithGoogle';

export type SignMode = "signup" | "signin";

const Auth: React.FC = () => {
	const usr = useAtomValue(firebaseUser);
	const [mode, setMode] = useState<SignMode>("signin");
	const handleMode = () => {
		setMode(mode === "signin" ? "signup" : "signin");
	};

	return (
		<AuthWrapper>
			{usr ? (
				<Navigate to="/Calendar" />
			) : (
				<>
					<LoginTypography role="title">献立スケジュール</LoginTypography>
					<LoginTypography role="subtitle">
						週間献立プランとレシピを管理
					</LoginTypography>
					<Stack direction={"column"}>
						<AuthModeSwitch mode={mode} handleMode={handleMode} />
					</Stack>
					{mode === "signin" ? <SigninForm /> : <SignupForm />}
					<Divider>
						<LoginTypography role="caption">or</LoginTypography>
					</Divider>
					<SignWithGoogle mode={mode} />
				</>
			)}
		</AuthWrapper>
	);
};

export default Auth;
